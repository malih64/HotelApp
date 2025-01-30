import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const HotelsContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";
function HotelsProvider({ children }) {
  const [isLoadingCurHotel, setIsLoadingCurHotel] = useState(false);
  const [currentHotel, setCurrentHotel] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.Room;
  const { data: hotels, isLoading } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  async function getSingleHotel(id) {
    try {
      setIsLoadingCurHotel(true);
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      console.log(data);
      
      setCurrentHotel(data);
    } catch (error) {
      toast.error(error?.message);
      setIsLoadingCurHotel(false);
    } finally {
      setIsLoadingCurHotel(false);
    }
  }

  return (
    <HotelsContext.Provider
      value={{
        hotels,
        isLoading,
        getSingleHotel,
        isLoadingCurHotel,
        currentHotel,
      }}>
      {children}
    </HotelsContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelsContext);
}
