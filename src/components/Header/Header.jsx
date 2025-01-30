import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutSideClick from "../../hooks/useOutSideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(searchParams.get("destination" || ""));
  const [openDropDown, setOpenDropDown] = useState(false);
  const [options, setOptions] = useState({ Adult: 1, Children: 0, Room: 1 });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const navigate = useNavigate();
  const handleSearch = () => {
    const encodedParams= createSearchParams({
      date:JSON.stringify(date),
      options:JSON.stringify(options),
      destination,
    })
    
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };
  return (
    <div className="header">
      <h3>Home</h3>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="headerIcon locationIcon" />
          <input
            value={destination || ""}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            name="destination"
            id="destination"
            className="headerSearchInput"
            placeholder="Where to go?"
          />
        </div>
        <div className="containerseperator">
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div className="dateDropDown" onClick={() => setOpenDate(!openDate)}>
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              className="date"
              ranges={date}
              onChange={(item) => setDate([item.selection])}
            />
          )}
        </div>
        <div className="containerseperator">
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            id="OptionDropDown"
            onClick={() => setOpenDropDown(!openDropDown)}>
            {options.Adult} Adult &nbsp;&bull; &nbsp; {options.Children}{" "}
            Children &nbsp; &bull; &nbsp;{options.Room} Room
          </div>
          {openDropDown && (
            <GuestOptionList
              options={options}
              setOpenDropDown={setOpenDropDown}
              handleOptions={handleOptions}
            />
          )}
        </div>
        <div className="containerseperator">
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionList({ options, handleOptions, setOpenDropDown }) {
  const optionRef = useRef();
  useOutSideClick(optionRef, "OptionDropDown", () => setOpenDropDown(false));
  return (
    <div className="guestOptions" ref={optionRef}>
      <OptionItem
        type="Adult"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="Children"
        options={options}
        minLimit={0}
        handleOptions={handleOptions}
      />
      <OptionItem
        type="Room"
        options={options}
        minLimit={1}
        handleOptions={handleOptions}
      />
    </div>
  );
}

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="dropdownbtn"
          onClick={() => handleOptions(type, "dec")}
          disabled={options[type] < minLimit}>
          <HiMinus className="icon" />
        </button>
        <span className="optionText">{options[type]}</span>
        <button
          className="dropdownbtn"
          onClick={() => handleOptions(type, "inc")}
          disabled={options[type] < minLimit}>
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
