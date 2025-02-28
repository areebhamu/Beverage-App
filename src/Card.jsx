import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BeerCatalog = () => {
  const [beers, setBeers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.sampleapis.com/beers/ale")
      .then((response) => response.json())
      .then((data) => setBeers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  const StarRating = ({ rating }) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    return (
      <div className="flex text-yellow-500">
        {[...Array(totalStars)].map((_, index) => (
          <span key={index}>{index < filledStars ? "★" : "☆"}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <input
        type="text"
        placeholder="What can we help you find today?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-4 border border-black rounded w-full"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBeers.map((beer) => (
          <motion.div
            key={beer.id}
            whileHover={{ scale: 1.05 }}
            className="p-2"
          >
            <div className="rounded-xl overflow-hidden shadow-lg bg-white h-full">
              <img
                src={beer.image}
                alt={beer.name}
                className="h-48 mx-auto"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{beer.name}</h2>
                <p className="text-sm text-gray-600">{beer.style}</p>
                <p className="text-sm text-gray-600">{beer.price}</p>
                <p className="text-sm text-gray-600">{beer.rating.reviews} reviews</p>
                <StarRating rating={beer.rating.average || 0} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BeerCatalog;
