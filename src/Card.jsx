import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CoffeeCatalog = () => {
  const [coffees, setCoffees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.sampleapis.com/coffee/hot")
      .then((response) => response.json())
      .then((data) => setCoffees(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCoffees = coffees.filter((coffee) =>
    coffee.title.toLowerCase().includes(search.toLowerCase())
  );

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
        {filteredCoffees.map((coffee) => (
          <motion.div
            key={coffee.id}
            whileHover={{ scale: 1.05 }}
            className="p-2"
          >
            <div className="rounded-xl overflow-hidden shadow-lg bg-white h-full">
              <img
                src={coffee.image}
                alt={coffee.title}
                className="h-48 mx-auto"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{coffee.title}</h2>
                <p className="text-sm text-gray-600">{coffee.style}</p>
                <p className="text-sm text-gray-600">{coffee.ingredients}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CoffeeCatalog;
