import useFetch from "../../hooks/useFetch";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  if (isLoading) <p>Loading....</p>;
  return (
    <div className="nearbyLocation">
      <h2>Nearby Location</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
          
              <div className="locationItem" key={item.id}>
                <img src={item.xl_picture_url} alt={item.name} />
                <div className="locationItemDesc">
                  <p className="location">{item.smart_location}</p>
                  <p className="name">{item.name} </p>
                  <div className="price">
                  €&nbsp;{item.price}&nbsp;
                    <span className="name">&nbsp;night</span>
                  </div>
                </div>
              </div>
            
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
