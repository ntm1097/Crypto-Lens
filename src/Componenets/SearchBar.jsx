import React, { useRef } from "react";
import lens from "../Assets/lens-darkblue.svg";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputRef.current) inputRef.current.blur();
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="search__wrapper">
          <h1 className="search__title">
            Look Through The Projects{" "}
            <img className="lens" src={lens} alt="Lens" />
          </h1>
          <div className="search__bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              ref={inputRef}
              className="search__bar--text"
              type="text"
              placeholder="Search for any coin"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;