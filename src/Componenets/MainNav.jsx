import React from 'react'
import logo from "../Assets/icons8-coin-64.png";
import { Link } from 'react-router-dom';

const MainNav = ({ onLogoClick }) => {
  return (
   <div className="nav__container">
     <nav>
      <a onClick={onLogoClick} style={{ cursor: "pointer" }}>
        <figure className="logo">
          <span className="website__name">CryptoLen</span>
          <img src={logo} className="logo__img" alt="" />
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