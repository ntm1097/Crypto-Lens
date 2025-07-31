import React from "react";
import { useLocation, useParams } from "react-router-dom";
import PricingNav from "../../Componenets/PricingNav";
import "./CoinInfo.css";

const CoinInfo = () => {
  const { state } = useLocation();
  const { coin } = state || {};
  const { id } = useParams();

  if (!coin) {
    return (
      <>
        <PricingNav />
        <div className="coin__info-container">
          <div className="coin__info-row">No coin data found for "{id}".</div>
        </div>
      </>
    );
  }

  return (
    <>
      <PricingNav />
      <div className="coin__info-container">
        <div className="coin__info-row">
          <figure>
            <img src={coin.image} className="coins" alt={coin.name} />
          </figure>
          <div className="info__coin">
            <h2 className="coin__title">{coin.name}</h2>
            <div className="coin__data">
              <p>
                <span className="coin__label">Symbol:</span>{" "}
                {coin.symbol?.toUpperCase()}
              </p>
              <p>
                <span className="coin__label">Current Price:</span> $
                {coin.current_price < 0.01
                  ? coin.current_price.toLocaleString("en-US", {
                      minimumFractionDigits: 6,
                      maximumFractionDigits: 8,
                    })
                  : coin.current_price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </p>
              <p>
                <span className="coin__label">Market Cap:</span> $
                {coin.market_cap?.toLocaleString()}
              </p>
              <p>
                <span className="coin__label">24h Change:</span>{" "}
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </p>
              <p>
                <span className="coin__label">All Time High:</span> $
                {coin.ath < 0.01
                  ? coin.ath.toLocaleString("en-US", {
                      minimumFractionDigits: 6,
                      maximumFractionDigits: 8,
                    })
                  : coin.ath.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </p>
              <p>
                <span className="coin__label">All Time Low:</span> $
                {coin.atl < 0.01
                  ? coin.atl.toLocaleString("en-US", {
                      minimumFractionDigits: 6,
                      maximumFractionDigits: 8,
                    })
                  : coin.atl.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </p>
              <p>
                <span className="coin__label">Rank:</span>{" "}
                {coin.market_cap_rank}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinInfo;
