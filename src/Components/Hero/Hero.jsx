import React, { useRef, useState, useEffect } from 'react';
import './Hero.css';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

export const Hero = () => {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === "") {
            return;
        }
        setLoading(true);
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer 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"
                },
                body: JSON.stringify({ inputs: inputRef.current.value }),
            }
        );
        const blob = await response.blob();
        const objectURL = URL.createObjectURL(blob);
        setImage_url(objectURL);
        setLoading(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            imageGenerator();
        }
    };

    useEffect(() => {
        const inputElement = inputRef.current;
        inputElement.addEventListener('keypress', handleKeyPress);
        return () => {
            inputElement.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>new</p>
                        <img src={hand_icon} alt='' />
                    </div>
                    <p>collections</p>
                    <p>for everyone</p>
                </div>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
            </div>
            <div className="hero-right">
                <h1><i>Design <span>Yourself ;)</span></i></h1>
                <img src={image_url === "/" ? hero_image : image_url} alt="" />
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}>
                        <div className={loading ? "loading-text" : "display-none"}>Loading...</div>
                    </div>
                </div>
                <div className="search-box">
                    <input type="text" ref={inputRef} placeholder='Search your type...' />
                    <div className="generate-btn" onClick={imageGenerator}>Generate</div>
                </div>
            </div>
        </div>
    );
};
