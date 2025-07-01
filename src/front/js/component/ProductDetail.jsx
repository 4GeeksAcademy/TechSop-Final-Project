import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Spinner, Alert, Form } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleCart = {
    addItem: (product, quantity) => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({ ...product, quantity });
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
      alert(`${quantity} ${product.name} añadido(s) al carrito!`);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://ubiquitous-tribble-5p4pp7qgrr7c4wvj-3001.app.github.dev/api/products/${id}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al cargar el producto');
        }
        
        const data = await response.json();
        const productData = data.results || data;
        
        if (!productData) {
          throw new Error('Producto no encontrado');
        }
        
        setProduct(productData);
        
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">
          {error}
          <Button 
            variant="outline-danger" 
            className="ms-3"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        &larr; Volver a productos
      </Button>
      
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image_url || "https://via.placeholder.com/500x300?text=Tech+Shop"}
            className="img-fluid rounded shadow"
            alt={product.name}
            style={{ maxHeight: '500px', objectFit: 'contain' }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/500x300?text=Imagen+No+Disponible";
            }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>
          <h3 className="text-success mb-4">${product.price?.toFixed(2)}</h3>
          
          <div className="mb-4">
            <h5>Descripción</h5>
            <p className="text-muted">{product.description || "No hay descripción disponible"}</p>
          </div>

          <div className="mb-3">
            <Form.Label>Cantidad:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              style={{ width: '80px' }}
            />
          </div>
          
          <div className="d-flex gap-3">
            <Button 
              variant="dark" 
              size="lg"
              onClick={() => handleCart.addItem(product, quantity)}
            >
              Añadir al carrito
            </Button>
            <Button 
              variant="outline-primary" 
              size="lg"
              onClick={() => {
                handleCart.addItem(product, quantity);
                navigate('/cart');
              }}
            >
              Comprar ahora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;