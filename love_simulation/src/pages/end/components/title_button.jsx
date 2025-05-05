import React from "react";
import { useNavigate } from "react-router-dom";
import "./title_button.css";

const TitleButton = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/', { replace: true });
    };

    return (
        <button
            className="titlebutton"
            onMouseOver={(e) => {
                e.target.style.backgroundColor = "rgb(245, 220, 241)";
                e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
                e.target.style.backgroundColor = "rgb(236, 141, 222)";
                e.target.style.transform = "scale(1)";
            }}
            onClick={handleClick}
        >
            タイトルに戻る
        </button>
    );
};

export default TitleButton;