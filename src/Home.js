import React, { useState } from 'react';
import Navbar from './Navbar'; // Ensure this path is correct
import fastFoodItems from './data';
import './Home.css';

function Home({ setCartItems }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const bestSellingItem = fastFoodItems[1];

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        if (searchSubmitted) {
            setSearchSubmitted(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && searchTerm) {
            setSearchSubmitted(true);
        }
    };

    const addToCart = (item) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(i => i.id === item.id);
            if (itemExists) {
                return prevItems.map(i => 
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const filteredItems = searchTerm
        ? fastFoodItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : fastFoodItems;

    return (
        <div className="home">
            <Navbar 
                searchTerm={searchTerm} 
                handleSearchChange={handleSearchChange} 
                handleKeyDown={handleKeyDown} 
            />

            <div className='logo'>
                <div className='logotext'>Best Shawarma In Town</div>
            </div>

            {!searchSubmitted ? (
                <React.Fragment>
                    <div className="best-seller-section">
                        <div className="best-seller-background"></div>
                        <div className="best-seller-description">
                            <h2>BEST SELLING ITEM</h2>
                            <p>Check out our most popular dish: {bestSellingItem.name}!</p>
                            <p>{bestSellingItem.description}</p>
                        </div>
                        <img src={bestSellingItem.imageUrl} alt={bestSellingItem.name} className="best-seller-image" />
                    </div>
                    <h1>Our Fast Food Selection</h1>
                    <div className="food-items">
                        {fastFoodItems.map(item => (
                            <div key={item.id} className="food-item">
                                <img src={item.imageUrl} alt={item.name} className="food-image" />
                                <div className="food-item-info">
                                    <h3 className="food-item-name">{item.name}</h3>
                                    <p className="food-item-description">{item.description}</p>
                                    <p className="food-item-price">${item.price}</p>
                                    <button onClick={() => addToCart(item)} className="add-to-cart-button">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
            ) : (
                <div className="food-items">
                    {filteredItems.map(item => (
                        <div key={item.id} className="food-item">
                            <img src={item.imageUrl} alt={item.name} className="food-image" />
                            <div className="food-item-info">
                                <h3 className="food-item-name">{item.name}</h3>
                                <p className="food-item-description">{item.description}</p>
                                <p className="food-item-price">${item.price}</p>
                                <button onClick={() => addToCart(item)} className="add-to-cart-button">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
