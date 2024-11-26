import { React, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SideCart from './components/SideCart';
import ProductPage from './components/ProductPage';
import Categories from './components/Categories';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import Slider from './components/Slider';
import Electronics from './components/Electronics';
import styles from './Home.module.scss'

export default function Home(props) {


    return (
        <div className={styles.Home}>
            <Slider />
            <Categories />

            <Routes>
                <Route
                    path="/"
                    element={<ProductList addToCart={props.addToCart} />}
                />
                <Route
                    path="/product/:id"
                    element={<ProductPage addToCart={props.addToCart} />}
                />
                <Route path="/electronics" element={<Electronics />} />

            </Routes>

        </div>
    );
}
