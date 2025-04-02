import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "../App.css"

const Hero = () => {
    // State variables
    const [loading, setLoading] = useState(true);
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch banners from API
    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            setLoading(true);
            const response = await axios.get(backendUrl + "/api/banner/all");

            if (response.data.success && response.data.banners.length > 0) {
                setBanners(response.data.banners);
            } else {
                toast.error("Failed to fetch banners or no banners available");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    // Auto-transition effect
    useEffect(() => {
        if (banners.length === 0) return;
        
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners.length]);

    // Manual navigation
    const goToNext = () => {
        if (banners.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    const goToPrev = () => {
        if (banners.length === 0) return;
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    // Show loading state or fallback when no banners
    if (loading) {
        return <div className="h-96 w-full bg-gray-800 animate-pulse rounded-lg"></div>;
    }

    if (banners.length === 0) {
        return <div className="h-96 w-full bg-gray-800 rounded-lg flex items-center justify-center text-white">No banners available</div>;
    }

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg shadow-xl"  style={{zIndex:"-1"}}>
            {/* Banner container */}
            <div className="relative h-96 w-full  phone">
                {/* Images with transition */}
                {banners.map((banner, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out ${
                            index === currentIndex ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                        }`}
                    >
                        <img 
                            src={banner.imageUrl} 
                            alt={banner.title || `Banner ${index + 1}`} 
                            className="w-full h-full object-cover" 
                        />

                        {/* Overlay text */}
                        {/* <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 bg-black bg-opacity-40 text-white">
                            {banner.title && <h2 className="text-3xl font-bold mb-2">{banner.title}</h2>}
                            {banner.description && <p className="mb-4">{banner.description}</p>}
                            {banner.buttonText && (
                                <a 
                                    href={banner.buttonLink || "#"} 
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-fit transition-colors duration-300"
                                >
                                    {banner.buttonText}
                                </a>
                            )}
                        </div> */}
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 p-2 rounded-full text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Indicator dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {banners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;