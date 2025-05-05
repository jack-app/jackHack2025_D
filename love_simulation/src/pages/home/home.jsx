import StartButton from "./components/start_button";
import CreditButton from "./components/credit_button";
import "./home.css";

const Home = () => {
    return (
        <div className="home">
            <p id="title1">恋愛cancelシミュレーション</p>
            <p id="title2">恋Can</p>
            <StartButton />
        </div>
    );
    }

export default Home;