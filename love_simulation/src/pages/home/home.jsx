import { useState, useEffect } from "react";
import StartButton from "./components/start_button";
import CreditButton from "./components/credit_button";
import "./home.css";

const Home = () => {
    const backgrounds = [
        '/images/school_bench_noon.jpg',
        '/images/school_bench_night.jpg',
        '/images/restaurant_evening.jpg',
        '/images/restaurant_night.jpg',
        '/images/park_noon.jpg',
        '/images/park_night.jpg',
        '/images/beach_noon.jpg',
        '/images/beach_night.jpg',

    ];
    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % backgrounds.length);
        }, 6000); // 8秒ごとに切り替え

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="home" style={{ backgroundImage: `url(${backgrounds[currentBg]})` }}>
            <p id="title1">恋愛cancelシミュレーション</p>
            <p id="title2">恋Can</p>
            <StartButton />
            <CreditButton />
        </div>
    );
}

export default Home;