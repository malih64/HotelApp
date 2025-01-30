import { Outlet } from "react-router-dom"
import Map from "../Map/HotelMap"
import HotelMap from "../Map/HotelMap"

function HotelsLayout() {
  return (
      <div className="appLayout">
          <div className="sidebar"><Outlet/></div>
          <HotelMap/>
    </div>
  )
}

export default HotelsLayout