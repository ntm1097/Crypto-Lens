import React, { useState } from "react";
import { Link } from "react-router-dom";

const Coins = ({ priceRange, searchTerm, error, coins, loading }) => {
  const [sortOrder, setSortOrder] = useState("low-to-high");

  if (loading) {
    return (
      <div className="coin__projects">
        {[...Array(6)].map((_, idx) => (
          <div className="coin skeleton" key={idx}>
            <figure className="img__wrapper">
              <div className="coin__img skeleton-img" />
            </figure>
            <div className="coin__info-skeleton">
              <div className="coin__row-sl">
                <span className="coin__label skeleton-text"></span>
                <span className="coin__id skeleton-text"></span>
              </div>
              <div className="coin__row-sl">
                <span className="coin__label skeleton-text"></span>
                <span className="coin__id skeleton-text"></span>
              </div>
              <div className="coin__row-sl">
                <span className="coin__label skeleton-text"></span>
                <span className="coin__id skeleton-text"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="coin__projects">
        <div className="error-message">
          Failed to load coins. Please try again later.
        </div>
      </div>
    );
  }

  // Filter coins by price range
  let filteredCoins = coins.filter(
    (coin) =>
      coin.current_price >= priceRange[0] && coin.current_price <= priceRange[1]
  );

  // Filter by search term (name or symbol)
  if (searchTerm && searchTerm.trim() !== "") {
    const lower = searchTerm.toLowerCase();
    filteredCoins = filteredCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(lower) ||
        coin.symbol.toLowerCase().includes(lower)
    );
  }

  // Sort coins by price
  filteredCoins = filteredCoins.sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.current_price - b.current_price;
    } else {
      return b.current_price - a.current_price;
    }
  });

  return (
    <div>
      <div className="sort__wrapper">
        <label htmlFor="sortOrder">Sort by price: </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>
      <div className="coin__projects">
        {filteredCoins.length === 0 ? (
          <div className="error-message">No coins match your filters.</div>
        ) : (
          filteredCoins.map((coin) => (
            <Link
              to={`/CoinInfo/${coin.id}`}
              className="coin"
              key={coin.id}
              state={{ coin }}
            >
              <figure className="img__wrapper">
                <img
                  className="coin__img"
                  src={coin.image || "/placeholder.png"}
                  alt={coin.name}
                />
              </figure>
              <div className="coin__info">
                <div className="coin__row">
                  <span className="coin__label">Name:</span>
                  <span className="coin__id">{coin.name}</span>
                </div>
                <div className="coin__row">
                  <span className="coin__label">Symbol:</span>
                  <span className="coin__id">{coin.symbol?.toUpperCase()}</span>
                </div>
                <div className="coin__row">
                  <span className="coin__label">Current Price:</span>
                  <span className="coin__id">
                    $
                    {coin.current_price < 0.01
                      ? coin.current_price.toLocaleString("en-US", {
                          minimumFractionDigits: 6,
                          maximumFractionDigits: 8,
                        })
                      : coin.current_price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Coins;
