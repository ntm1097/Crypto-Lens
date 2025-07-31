import React, { useState } from "react";
import MainNav from "../Componenets/MainNav";
import Main from "../Componenets/Main";
import logo from "../Assets/icons8-coin-64.png";
import Bitcoin from "../Assets/bitcoin.png";

const NUM_COINS = 20;

const LandingPage = () => {
  const [showLogoAnim, setShowLogoAnim] = useState(false);

  const handleLogoClick = () => {
    setShowLogoAnim(true);
    setTimeout(() => setShowLogoAnim(false), 2500); // Animation lasts 1.8s
  };

  return (
    <div className="landing-page">
      <MainNav onLogoClick={handleLogoClick} />
      {showLogoAnim && (
        <div className="falling-coins-overlay">
          {[...Array(NUM_COINS)].map((_, i) => {
            // Random left position (5% to 95%) and random delay (0 to 1s)
            const left = Math.random() * 90 + 5;
            const delay = Math.random();
            const size = Math.random() * 40 + 40; // 40px to 80px
            return (
              <img
                key={i}
                src={Bitcoin}
                alt="coin"
                className="falling-coin"
                style={{
                  left: `${left}%`,
                  animationDelay: `${delay}s`,
                  width: `${size}px`,
                  height: `${size}px`,
                }}
              />
            );
          })}
        </div>
      )}
      <Main />
    </div>
  );
};

export default LandingPage;