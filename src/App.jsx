import React, { useState, useEffect } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  const results = items.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  const styles = {
    app: { fontFamily: "Arial, sans-serif", padding: "20px" },
    searchBox: {
      padding: "8px",
      width: "100%",
      maxWidth: "300px",
      marginBottom: "20px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    list: { display: "flex", flexWrap: "wrap", gap: "20px" },
    card: {
      border: "1px solid #ccc",
      padding: "10px",
      width: "200px",
      textAlign: "center",
      borderRadius: "6px",
      background: "#fff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    },
    image: {
      maxWidth: "100%",
      height: "150px",
      objectFit: "contain",
      marginBottom: "10px",
    },
    name: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "6px",
      color: "black",
    },
    category: { fontSize: "12px", color: "#777", marginBottom: "6px" },
    price: { fontWeight: "bold", color: "#2a9d8f", fontSize: "15px" },
  };

  return (
    <div style={styles.app}>
      <h1>Product Catalog</h1>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchBox}
      />

      {isLoading && <p>Loading...</p>}
      {hasError && <p>Failed to load products.</p>}

      {!isLoading && !hasError && (
        <div style={styles.list}>
          {results.length ? (
            results.map((item) => (
              <div style={styles.card} key={item.id}>
                <img src={item.image} alt={item.title} style={styles.image} />
                <p style={styles.name}>
                  {item.title ? item.title : "NO NAME FOUND"}
                </p>
                <p style={styles.category}>{item.category}</p>
                <p style={styles.price}>${item.price}</p>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      )}
    </div>
  );
}

