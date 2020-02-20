import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, ImageBackground, Modal, Image, TouchableOpacity } from 'react-native'
import { px } from '../utils';
import { ASSET_IMAGES } from '../config';


export default class SignSuccessModal extends Component {
    render() {
        const {
            isShow = true
        } = this.props;
        return (
            <Fragment>
                <Modal
                    visible={isShow}
                    transparent={true}
                >
                    <TouchableOpacity onPress={this.hideModal.bind(this)} style={styles.showTouchableOpacity}>
                        <ImageBackground style={styles.showImageBg} source={ASSET_IMAGES.IMAGE_SHOW_BG}>
                            <View style={styles.modalContent}>
                                <Image style={styles.modalSuccessIcon} source={ASSET_IMAGES.ICON_SIGN_SUCCESS} />
                                <Text style={styles.modalSuccess}>签到成功！</Text>
                                <View style={styles.modalSuccessDay}>
                                    <Text style={styles.signText}>您已经连续签到</Text>
                                    <Text style={styles.signTextDay}>1</Text>
                                    <Text style={styles.signText}>天</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.modalButton}>
                                <Text style={styles.modalButtonTitle}>知道了</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </TouchableOpacity>
                </Modal>
            </Fragment>
        )
    }

    hideModal() {
        const { dismiss } = this.props;
        if (dismiss) {
            dismiss();
        }
    }

}


const styles = StyleSheet.create({
    content: {

    },
    showView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
        width: '100%'
    },
    showImageBg: {
        width: px(586),
        height: px(565),
    },
    modalContent: {
        flex: 1,
        alignItems: 'center'
    },
    modalSuccessIcon: {
        marginTop: px(24)
    },
    modalSuccess: {
        marginTop: px(100),
        color: '#101010',
        fontSize: px(36)
    },
    modalSuccessDay: {
        marginTop: px(42),
        flexDirection: 'row',
        alignItems: 'center'
    },
    modalButton: {
        height: px(102),
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalButtonTitle: {
        fontSize: px(36),
        color: '#FBA345'
    },
    signText: {
        color: '#909090'
    },
    signTextDay: {
        color: '#ED7539',
        marginRight: px(6),
        marginLeft: px(6)
    }
})