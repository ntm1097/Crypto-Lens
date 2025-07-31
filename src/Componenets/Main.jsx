import React, { useState, useRef } from 'react'
import search_icon from "../Assets/undraw_crypto-portfolio_cat6.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFire } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/pricing?search=${encodeURIComponent(searchTerm.trim())}`);
      if (inputRef.current) inputRef.current.blur();
    }
  };

  return (
    <div className='landing-page'>
      <div className="container">
        <div className="row">
          <div className="search__wrapper">
            <h1 className="search__title">
              Find The <span className="highlight"> Hottest</span> Coins On The
              Market <FontAwesomeIcon icon={faFire} className="highlight" />
            </h1>
            <h3 className="search__description">
              Clarity Through <span className="highlight">CryptoLens</span>
            </h3>
            <div className="search__bar">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search__icon" />
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
            <figure>
              <img
                className="currency__img"
                src={search_icon}
                alt=""
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main