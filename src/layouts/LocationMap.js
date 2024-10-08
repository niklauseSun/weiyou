import React, { Component } from 'react'
import { StyleSheet, View, Text, SafeAreaView, PermissionsAndroid, Platform, TouchableOpacity, FlatList, Image, DeviceEventEmitter, TextInput } from 'react-native'
import { MapView } from "react-native-amap3d";
import { commonStyles } from '../commonStyles';
import { Header } from '../components';
import { px } from '../utils';
import { E, ASSET_IMAGES } from '../config'
import { Geolocation, setLocatingWithReGeocode } from "react-native-amap-geolocation";
import { Modal } from '@ant-design/react-native'

// import { QMap, HeatMap, Marker, MarkerList, Info } from 'react-tmap'


export default class LocationMap extends Component {
    constructor(props) {
        super(props);
        const { addType = 'add', city, longitude = null, latitude = null, position} = props.navigation.state.params || {}
        this.state = {
            addType: addType,
            latitude: latitude,
            longitude: longitude,
            locations: [],
            isShow: false,
            selectIndex: 0,
            position: position,
            city: city,
            name:'',
            addressComponent: null,
            keyword: '',
            showSelect: false
        }
    }

    componentDidMount() {
        setLocatingWithReGeocode(true);
        if (Platform.OS == 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        }

        if (this.state.addType == 'add') {
            Geolocation.getCurrentPosition(({ coords, location }) => {
                const { latitude, longitude } = coords;
                this.setState({
                    latitude: latitude,
                    longitude: longitude
                }, () => {
                    this.requestLocation();
                })
            });
        } else {
            this.requestLocation();
        }
    }

    render() {
        return (
            <SafeAreaView style={commonStyles.content}>
                <Header rightComponent={this.rightComponent()} titleStyle={styles.titleStyle} navigation={this.props.navigation} title={this.state.name} />
                <MapView style={{
                    flex: 1
                }}
                    coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude
                    }}
                    showsLocationButton={true}
                    showsZoomControls={true}
                    zoomLevel={16}
                    onPress={({ nativeEvent }) => {
                        this.setState({
                            latitude: nativeEvent.latitude,
                            longitude: nativeEvent.longitude,
                            isShow: true,
                            selectIndex: 0
                        }, () => {
                            this.requestLocation();
                        })
                    }}
                    >
                        <MapView.Marker
                            draggable={true}
                            title={this.state.name}
                            onDragEnd={({ nativeEvent }) => {
                                this.setState({
                                    latitude: nativeEvent.latitude,
                                    longitude: nativeEvent.longitude
                                })
                            }}
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }}
                        />
                        <Modal
                            popup
                            animationType="slide-up"
                            maskClosable={true}
                            // transparent={true}
                            onClose={() => {
                                this.setState({
                                    isShow: false
                                })
                            }}
                            // closable={true}
                            visible={this.state.isShow}>
                            <View style={styles.modalContent}>
                            <SafeAreaView style={styles.contractView}>
                                    <View style={styles.searchView}>
                                        <TextInput value={this.state.keyword} onChangeText={(text) => {
                                            this.setState({
                                                keyword: text
                                            })
                                        }} style={styles.searchInput} placeholder="请输入名称" />
                                        <TouchableOpacity onPress={this.searchLocation.bind(this)} style={styles.searchButton}>
                                            <Text style={styles.searchButtonText}>搜索</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <FlatList
                                        data={this.state.locations}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({item, index}) => {
                                            return <TouchableOpacity style={styles.nameItem} onPress={this.selectLocation.bind(this, item, index)}>
                                                <Text style={styles.name}>{item.name}</Text>
                                                {this.state.selectIndex == index ? <Image style={styles.selectIcon} source={ASSET_IMAGES.ICON_SELECT_CORRECT} />: null}
                                            </TouchableOpacity>
                                        }}
                                        // ListEmptyComponent={() => <NoneData title="暂无数据" />}
                                    />
                                    </SafeAreaView>
                            </View>
                        </Modal>
                    </MapView>
            </SafeAreaView>
        )
    }

    rightComponent() {
        if (this.state.showSelect) {
            return <TouchableOpacity style={styles.selectButton} onPress={this.selectAddress.bind(this)}>
                <Text style={styles.selectButtonText}>选择</Text>
            </TouchableOpacity>
        }
        return null;
    }

    selectAddress() {
        const {
            addressComponent,
            locations,
            selectIndex
        } = this.state;
        const { province, district, township, adcode } = addressComponent;
        const { cityname = null, address, location, name } = locations[selectIndex];
        let retAddress = ''
        if (cityname) {
            retAddress = cityname + locations[selectIndex].adname + address + name
        } else {
            retAddress = `${province}${district}${township}${address}${name}`; 
        }
        // const retAddress = `${province}${district}${township}${address}${name}`;
        const retCityCode = `${adcode}`;
        const retLatitude = location.split(',')[1];
        const retLongitude = location.split(',')[0]
        DeviceEventEmitter.emit('selectAddress', {
            position: retAddress,
            longitude: retLongitude,
            latitude: retLatitude,
            city: retCityCode
        })
        this.props.navigation.goBack();
    }

    showModal() {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    selectLocation(item, index) {
        const { location, name } = item;

        this.setState({
            selectIndex: index,
            latitude: Number(location.split(',')[1]),
            longitude: Number(location.split(',')[0]),
            name: name
        })
    }

    searchLocation() {
        const { province = '上海'} = this.state.addressComponent;
        const url = `https://restapi.amap.com/v3/place/text?keywords=${this.state.keyword}$type=&city=${province}&offset=20&page=1&key=${E.WEB_KEY}&extensions=all`
        let opts = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json;charset=utf-8',
                "Connection": "keep-alive"
            },
            timeout: 60 * 1000,
        }

        fetch(url, opts).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((res) => {
            const { pois, formatted_address, addressComponent } = res;
            this.setState({
                locations: pois,
            })
        }).catch(err => {
        })
    }

    requestLocation() {
        const url = `https://restapi.amap.com/v3/geocode/regeo?location=${this.state.longitude},${this.state.latitude}&key=${E.WEB_KEY}&radius=1000&extensions=all&poitype=`
        let opts = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json;charset=utf-8',
                "Connection": "keep-alive"
            },
            timeout: 60 * 1000,
        }

        fetch(url, opts).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((res) => {
            const { regeocode } = res;
            const { pois, formatted_address, addressComponent } = regeocode;
            this.setState({
                locations: pois,
                name: formatted_address,
                addressComponent: addressComponent,
                showSelect: true
            })
        }).catch(err => {
        })
    }
}

const styles = StyleSheet.create({
    titleStyle:{
        fontSize: px(24)
    },
    modal: {
        // height: '90%',
        backgroundColor: 'red',
        height: px(500)
    },
    showView: {
        // justifyContent: 'center',
        justifyContent: 'flex-end',
        marginBottom: px(0),
        // marginTop: px(200),
        // backgroundColor: 'rgba(0,0,0,1)',
        // height: px(400),
        backgroundColor: 'red',
        width: '100%',
        alignItems: 'center'
    },
    modalContent: {
        height: px(500),
        width: '100%',
        marginBottom: px(0)
    },
    closeBgView: {
        height: px(60),
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: px(30),
    },
    closeButton: {
        height: '100%',
        justifyContent: 'center'
    },
    nameItem: {
        height: px(120),
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        flex: 1,
        marginLeft: px(30)
    },
    selectIcon: {
        height: px(40),
        width: px(40),
        marginRight: px(30)
    },
    selectButton: {
        width: px(120),
        height: px(90),
        alignItems:'center',
        justifyContent: 'center'
    },
    selectButtonText: {
        color: '#ED7539'
    },
    searchView: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        paddingHorizontal: px(30),
        paddingVertical: px(10)
    },
    searchInput: {
        flex: 1
    },
    searchButton: {
        width: px(90),
        height: px(60),
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchButtonText: {
        width: '100%',
        color: '#ed7539',
        textAlign: 'right'
    }
})