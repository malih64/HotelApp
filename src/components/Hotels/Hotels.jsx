
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../context/HotelsProvider";

function Hotels() {
 const {hotels,isLoading,currentHotel}= useHotels()

  if (isLoading) <Loader/>;
  return (
    <div className="searchList">
          <p className="textSearchResult">Search Result({hotels.length })</p>
      
        {hotels.map((item) => {
          return (
            <Link key={item.id} to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}>
              <div className={`searchItem ${item.id===currentHotel.id ? "current-hotel":""}`} key={item.id}>
              <img src={item.xl_picture_url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name} </p>
                <div className="price">
                  €&nbsp;{item.price}&nbsp;
                  <span className="name">&nbsp;night</span>
                </div>
              </div>
            </div>
            </Link>
          );
        })}
 
    </div>
  );
}

export default Hotels;
