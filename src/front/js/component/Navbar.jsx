import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            
            <a className="navbar-brand fw-bold" href="#">Tech Shop</a>

           
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>

            
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Inicio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Productos</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Contacto</a>
                    </li>
                </ul>

                
                <div className="d-flex">
                    <Link to="/cart" className="btn btn-outline-light me-2">
                        <i className="fas fa-shopping-cart"></i>
                        <span className="ms-1">Carrito</span>
                    </Link>
                    
                </div>
            </div>
        </div>
    </nav>
	);
};
