/*************
 @file        MapView.jsx
 @description Componente de React que muestra mapa en leaflet.
 @author      Hugo Cadena 
 @email       hugo.cadena@cvs.gov.co
 @date        Noviembre 2025
 @version     1.0.0
 @notes       Codigo generado, parcialmente asistido por IA
 *************/

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef, useState } from "react";
import { GeoJSON, LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
//import municipios from "../capas/municipios.json";


export default function MapView({ coordinates }) {
// const MapView = ({ coordinates }) => {

    ////////ICONO PARA MOSTRAR EL MARCADOR///////////
    const icono = new Icon ({
        iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
        iconSize: [25, 41]
    });
    const position = [8.1, -75.8]
    const mapRef = useRef(null);
    const [latitud, setLatitud]= useState('');
    const [longitud, setLongitud]= useState('');

    useEffect(() => {
        setLatitud(coordinates.lat);
        setLongitud(coordinates.lng);
        const zoom = 15;
        const map = mapRef.current;
        
        if (map) {
            map.flyTo([latitud, longitud], zoom);
        }
    }, [latitud, longitud]);  

    const latitude = 7.9;
    const longitude = -75.809;
  
    console.log(coordinates)
    return ( 
      // Make sure you set the height and width of the map container otherwise the map won't show
        <> 
        <div style={{ height: '400px', width: '100%' }}>
            <MapContainer center={[latitude, longitude]} zoom={11} ref={mapRef} style={{ height: '100%', width: '100%' }}>
                <LayersControl>
                    <LayersControl.BaseLayer checked name="OpenStreetMap">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Google Satellite">
                        <TileLayer
                            url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                        />
                    </LayersControl.BaseLayer>  
             {/* aca se adicionan los layers al mapa */}
                    {/* <LayersControl.Overlay checked name="Municipios">
                        <GeoJSON data={municipios} />
                    </LayersControl.Overlay> */}
                   
                    {coordinates.lat && coordinates.lng && (
                        <Marker 
                            position={[coordinates.lat, coordinates.lng]} 
                            icon={icono}>
                        </Marker>
                    )}
                </LayersControl>
            </MapContainer>
         </div>
        </>
    );
  };
  