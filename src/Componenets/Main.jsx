import React, { useState, useRef, useEffect } from "react";
import search_icon from "../Assets/undraw_crypto-portfolio_cat6.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFire } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Array of coin names to cycle through
  const coinNames = [
    "Bitcoin...",
    "Ethereum...",
    "Dogecoin...",
    "Solana...",
    "any coin...",
  ];

  useEffect(() => {
    let currentCoinIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeout;
    const baseText = "Search for ";

    const typeWriter = () => {
      const currentCoin = coinNames[currentCoinIndex];

      if (isDeleting) {
        // Remove characters from the coin name only
        const coinPart = currentCoin.substring(0, currentCharIndex - 1);
        setPlaceholder(baseText + coinPart);
        currentCharIndex--;

        if (currentCharIndex === 0) {
          isDeleting = false;
          currentCoinIndex = (currentCoinIndex + 1) % coinNames.length;
          timeout = setTimeout(typeWriter, 500); // Pause before typing next coin
        } else {
          timeout = setTimeout(typeWriter, 50); // Deleting speed
        }
      } else {
        // Add characters to the coin name
        const coinPart = currentCoin.substring(0, currentCharIndex + 1);
        setPlaceholder(baseText + coinPart);
        currentCharIndex++;

        if (currentCharIndex === currentCoin.length) {
          timeout = setTimeout(() => {
            isDeleting = true;
            typeWriter();
          }, 2000); // Pause at end of coin name
        } else {
          timeout = setTimeout(typeWriter, 100); // Typing speed
        }
      }
    };

    // Start the typewriter effect
    typeWriter();

    // Cleanup function
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/pricing?search=${encodeURIComponent(searchTerm.trim())}`);
      if (inputRef.current) inputRef.current.blur();
    }
  };

  return (
    <div className="landing-page">
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
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search__icon"
              />
              <input
                ref={inputRef}
                className="search__bar--text"
                type="text"
                placeholder={placeholder} // Use the dynamic placeholder
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <figure>
              <img className="currency__img" src={search_icon} alt="" />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
