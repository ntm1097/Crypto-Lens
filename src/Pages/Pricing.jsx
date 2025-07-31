import React, { useState, useEffect } from "react";
import PricingNav from "../Componenets/PricingNav";
import Search from "../Componenets/Search";
import Coins from "../Componenets/Coins";
import SearchBar from "../Componenets/SearchBar";
import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Pricing = () => {
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTop10, setShowTop10] = useState(false);

  const query = useQuery();


  useEffect(() => {
    const initialSearch = query.get("search") || "";
    setSearchTerm(initialSearch);
  }, [window.location.search]);

  useEffect(() => {
    // Try to load coins from sessionStorage first
    const cached = sessionStorage.getItem("coins");
    if (cached) {
      setCoins(JSON.parse(cached));
      setLoading(false);
      setError(false);
      return;
    }

    async function fetchCoins() {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://corsproxy.io/?https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
        );
        setCoins(response.data || []);
        sessionStorage.setItem("coins", JSON.stringify(response.data || []));
        setError(false);
        setLoading(false);
      } catch (err) {
        setError(true);
        setCoins([]);
        setTimeout(() => setLoading(false), 800);
      }
    }
    fetchCoins();
  }, []);

  // Handler for the Top 10 button
  const handleShowTop10 = () => {
    setShowTop10(true);
  };

  const handleShowAll = () => {
    setShowTop10(false);
  };

  // Filter coins for top 10 if needed
  let coinsToShow = coins;
  if (showTop10) {
    coinsToShow = [...coins]
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(0, 10);
  }

  return (
    <>
      <PricingNav onShowTop10={handleShowTop10} />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Search priceRange={priceRange} setPriceRange={setPriceRange} error={error} />
      {showTop10 && (
        <div style={{ textAlign: "center", margin: "1rem" }}>
          <button className="btn" onClick={handleShowAll}>Show All Coins</button>
        </div>
      )}
      <Coins
        priceRange={priceRange}
        searchTerm={searchTerm}
        setError={setError}
        error={error}
        coins={coinsToShow}
        loading={loading}
      />
    </>
  );
};

export default Pricing;