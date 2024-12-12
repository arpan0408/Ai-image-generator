import React, { useState } from "react";
import "./ImageGenerator.css";
import { FcDownload } from "react-icons/fc";

const ImageGenerator = () => {
    const [images, setImages] = useState([]);
    const [query, setQuery] = useState("");
    const [imageCount, setImageCount] = useState(4);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const UNSPLASH_ACCESS_KEY = "mtHHBSzDgs-Pmw3Z2Ae-ohKIDK_1Iks9j2tfwKD-uWw";

    const fetchImages = async () => {
        setLoading(true);
        setError(null);
        const searchQuery = query.trim() || "beautiful nature"; // Default to "nature"
        try {
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=${imageCount}`,
                {
                    headers: {
                        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                    },
                }
            );
            if (!response.ok) throw new Error("Failed to fetch images.");
            const data = await response.json();
            setImages(data.results);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const downloadImage = async (url, filename) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            URL.revokeObjectURL(link.href); // Clean up
        } catch (error) {
            alert("Error downloading the image: " + error.message);
        }
    };

    return (
        <div className="app">
            <header className="header">
                <h1>AI Image Generator</h1>
                <p>Generate and Download High-Quality Images Instantly</p>
                <div className="form-container">
                    <input
                        type="text"
                        placeholder="Type a description for your image..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <select value={imageCount} onChange={(e) => setImageCount(e.target.value)}>
                        <option value="1">1 Image</option>
                        <option value="2">2 Images</option>
                        <option value="3">3 Images</option>
                        <option value="4">4 Images</option>
                    </select>
                    <button onClick={fetchImages}>Generate</button>
                </div>
            </header>

            {error && <div className="error">{error}</div>}

            {loading ? (
                <div className="loading">Loading images...</div>
            ) : (
                <div className="image-gallery">
                    {images.map((img) => (
                        <div className="image-card" key={img.id}>
                            <img src={img.urls.regular} alt={img.alt_description} />
                            <div className="overlay" onClick={() => downloadImage(img.urls.full, `${img.id}.jpg`)}>
                                <FcDownload className="icon" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGenerator;
