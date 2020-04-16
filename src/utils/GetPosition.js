import { Geolocation, setLocatingWithReGeocode } from "react-native-amap-geolocation";
import { E } from "../config";
function getPosition({callback}) {
    setLocatingWithReGeocode(false);
    Geolocation.getCurrentPosition(({ coords, location }) => {
        const { latitude, longitude } = coords;

        const url = `https://restapi.amap.com/v3/geocode/regeo?location=${longitude},${latitude}&key=${E.WEB_KEY}&radius=1000&extensions=all&poitype=`
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
            const { adcode } = addressComponent;
            const { location } = pois[0];
            // const retAddress = `${province}${district}${township}${address}${name}`;
            const retCityCode = `${adcode}`;
            const retLatitude = location.split(',')[1];
            const retLongitude = location.split(',')[0]

            let data = {
                position: formatted_address,
                longitude: retLongitude,
                latitude: retLatitude,
                city: retCityCode
            }
            callback({
                success: true,
                data: data });
        }).catch(err => {
            callback(err)
        })
    });
}

export default getPosition;