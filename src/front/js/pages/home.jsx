import React, { useState, useEffect } from "react";
import ProductCard from "../component/ProductCard.jsx"; // Asegúrate de que la ruta sea correcta

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://ubiquitous-tribble-5p4pp7qgrr7c4wvj-3001.app.github.dev/api/products");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Datos recibidos:", data); // Para debug
        
        // Asegúrate de acceder a data.results si tu API lo usa
        const productsData = data.results || data;
        setProducts(Array.isArray(productsData) ? productsData : []);
        
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Error: {error}
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-sm btn-danger ms-2"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Productos Disponibles</h2>
      
      {products.length === 0 ? (
        <div className="alert alert-warning">
          No hay productos disponibles en este momento.
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;