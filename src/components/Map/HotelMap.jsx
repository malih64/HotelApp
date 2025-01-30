import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useHotels } from "../../context/HotelsProvider";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";

function HotelMap() {
  const { hotels, isLoading } = useHotels();
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const {isLoading:isLocationLoading,position:geoPosition,getPosition }=useGeoLocation()
  useEffect(() => {
    if (lat && lng) setMapCenter([lat,lng])
  }, [lat, lng])
  
  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.lng) setMapCenter([geoPosition.lat,geoPosition.lng])
  }, [geoPosition])
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={false}>
        <button onClick={getPosition} className="getLocation">{
        isLocationLoading ? "Loading...":"Use Your Location"
        }</button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter}/>
        {hotels.map((item) => (
          <Marker
            key={item.id}
            className="headerIcon locationIcon"
            position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default HotelMap;

function ChangeCenter({position}) {
  const map = useMap();
  map.setView(position);
  return null;
}