import React from "react";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";

const Search = ({ priceRange, setPriceRange, error }) => {
  const handleMinChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > priceRange[1]) value = priceRange[1];
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxChange = (e) => {
    let value = Number(e.target.value);
    if (isNaN(value)) value = 0;
    if (value > 150000) value = 150000;
    if (value < priceRange[0]) value = priceRange[0];
    setPriceRange([priceRange[0], value]);
  };

  return (
    <>
      {!error && (
        <div className="price__filter">
          <label>
            Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
          </label>
          <Slider
            className="rc-slider"
            range
            min={0}
            max={150000}
            step={1}
            value={priceRange}
            onChange={setPriceRange}
            allowCross={false}
          />
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <div>
              <label htmlFor="minPrice">Min Price:</label>
              <input
                id="minPrice"
                type="number"
                min={0}
                max={priceRange[1]}
                value={priceRange[0]}
                onChange={handleMinChange}
                style={{ width: "100px", marginLeft: "0.5rem" }}
              />
            </div>
            <div>
              <label htmlFor="maxPrice">Max Price:</label>
              <input
                id="maxPrice"
                type="number"
                min={priceRange[0]}
                max={150000}
                value={priceRange[1]}
                onChange={handleMaxChange}
                style={{ width: "100px", marginLeft: "0.5rem" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;