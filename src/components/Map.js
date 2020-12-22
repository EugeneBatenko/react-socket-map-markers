import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';

const containerStyle = {
   width: '100vw',
   height: '100vh'
};

const center = {
   lat: 49,
   lng: 24
};

const onLoad = marker => {
   console.log('marker: ', marker)
}


const Map = (props) => {
   const position = props.markers;


   return (
      <LoadScript
         googleMapsApiKey="AIzaSyBXFAxSgXP7b5D25WEtjxkYqoWM2PjxaLg"
      >
         <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={6}
         >
            {position.map((data, key) => {
               return (
                  <Marker
                     key={key}
                     onLoad={onLoad}
                     position={data}
                     visible={props.time}
                  />
               )
            })}
               </GoogleMap>
               </LoadScript>
               )
            }

            export default Map;
