import './App.css';
import Map from "./components/Map";
import React, {useEffect, useState} from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:3030";

function App() {

   const [response, setResponse] = useState([]);
   const [count, setCount] = useState(true);

   useEffect(() => {
      const socket = socketIOClient(ENDPOINT);
      socket.on("FromAPI", data => {
         setResponse(data);
         setCount(true)

         setTimeout(() => {
            setCount(false)
         }, 3000);

      });
   }, []);

   // console.log(response);

   useEffect(() => {
      const timer = setTimeout(() => {
         console.log('Time');
         setCount(false)
      }, 3000);
      return () => clearTimeout(timer);
   }, []);


   return (
      <div className="App">
            <Map
               markers={response}
               time={count}
               googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCGQY_TyzooTG_l292QUs3Yq94reutU4JE"
               isMarkerShown
            />
      </div>
   );
}

export default App;
