import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop.jsx";
import { BackendURL } from "./component/backendURL.jsx";

import Home  from "./pages/home.jsx";
import { ProductCard } from "./component/ProductCard.jsx";
import { Demo } from "./pages/demo.jsx";
import { Single } from "./pages/single.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/footer.jsx";
import  ProductDetail  from "./component/ProductDetail.jsx";
import {CartPage} from "./component/cart/CartPage.jsx";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                       <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
