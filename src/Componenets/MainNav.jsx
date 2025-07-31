import React, { useState } from 'react'
import logo from "../Assets/icons8-coin-64.png";
import { Link } from 'react-router-dom';

const MainNav = ({ onLogoClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleLogoClick = () => {
    setIsClicked(true);
    if (onLogoClick) {
      onLogoClick();
    }
    // Reset the scale after a short delay
    setTimeout(() => {
      setIsClicked(false);
    }, 300);
  };

  return (
   <div className="nav__container">
     <nav>
      <a onClick={handleLogoClick}>
        <figure className={`logo ${isClicked ? 'clicked' : ''}`}>
          <span className="website__name">CryptoLen</span>
          <img src={logo} className="logo__img" alt="" />
        <div className="logo__border">
        </div>
        </figure>
      </a>
      <ul className="nav__links">
        <li className="nav__link ">
          <a  className="hover-effect" href="mailto:natemiller1097@gmail.com">Contact</a>
        </li>
        <li className="nav__link  link__primary">
          <Link to="/Pricing">
          <button className="btn">
            Discover
          </button>
          </Link>
        </li>
       </ul>
     </nav>
    </div>
  )
}

export default MainNav