import React, { useState } from 'react'
import logo from "../Assets/icons8-coin-64.png";
import { Link } from 'react-router-dom';

const PricingNav = ({ onShowTop10 }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleLogoClick = () => {
    setIsClicked(true);
    // Reset the scale after a short delay
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
    <div className="nav__container">
      <nav>
        <Link to="/">
          <figure className='logo' >
            <span className="website__name">CryptoLen</span>
            <img src={logo} className="logo__img" alt="" />
          </figure>
        </Link>
        <ul className="nav__links">
          <li className="nav__link ">
            <Link to="/" className="hover-effect accent" href="index.html">Home</Link>
          </li>
          <li className="nav__link link__primary">
            <button className="btn" onClick={onShowTop10}>Top 10 Marketcaps</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default PricingNav