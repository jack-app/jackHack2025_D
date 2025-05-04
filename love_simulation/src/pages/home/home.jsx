import StartButton from "./components/start_button";
import CreditButton from "./components/credit_button";

const Home = () => {
    return (
        <div className="home">
            <h1 className="home-title">Love Simulation</h1>
            <p className="home-description">A love simulation game.</p>
            <StartButton />
            <CreditButton />
        </div>
    );
    }

export default Home;