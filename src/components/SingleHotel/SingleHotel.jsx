import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../context/HotelsProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { getSingleHotel, isLoadingCurHotel, currentHotel } = useHotels();
  useEffect(() => {
    getSingleHotel(id);
  }, [id]);

  if (isLoadingCurHotel || !currentHotel) <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>

        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
          <span className="name">&nbsp;night</span>
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
