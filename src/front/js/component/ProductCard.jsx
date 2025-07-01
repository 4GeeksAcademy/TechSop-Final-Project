import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Verifica que el producto tenga los datos necesarios
  if (!product) return null;

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={product.image_url || "https://via.placeholder.com/300x200?text=Tech+Shop"}
          className="card-img-top p-3 bg-light"
          alt={product.name || "Producto sin nombre"}
          style={{ 
            height: "100%", 
            objectFit: "contain",
            width: "100%"
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.name || "Producto"}</h5>
          <p className="card-text text-success fw-bold">
            ${product.price ? product.price.toFixed(2) : "0.00"}
          </p>
          <Link
            to={`/products/${product.id}`} 
            className="btn btn-dark mt-auto"
            state={{ product }} 
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;