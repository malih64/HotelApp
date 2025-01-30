import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function useGeoLocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);
    function getPosition() {
        if(!navigator.geolocation) return setError("notsupport GeoLoction")
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition((pos) => {
            setPosition(
               { lat:pos.coords.latitude,
                lng:pos.coords.longitude,}
            )
            setIsLoading(false)
        }
            , (err) => {
            setError(err.message);
            setIsLoading(false)
        })

    }
    return {isLoading,position,error,getPosition}
}