import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import slogan from '../img/slogan.png';
import api from '../services/api';

function Homepage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                setLoading(true);
                const data = await api.getFeaturedProducts();
                setFeaturedProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <>
            <div className='hero-section'>
                <img className='slogan' src={slogan} alt="" />
            </div>

            <section className="latest-products">
                <h2>Ultimi Arrivi</h2>

                {loading && <p>Caricamento...</p>}
                {error && <p>Errore: {error}</p>}

                <div className="products-grid">
                    {featuredProducts.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image_url} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p>{product.short_description}</p>
                            <p className="price">€{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Homepage;