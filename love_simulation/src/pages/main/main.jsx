import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoveMeter from "./components/love_meter";

const Main = () => {
    const [scenario, setScenario] = useState({});
    const [error, setError] = useState(null);
  
    const { 
        title: scenarioTitle, 
        id: scenarioId,
        Likeability:likeability 
    } = useLocation().state || {};
  
    useEffect(() => {
      fetch("/scenario.json")
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch scenario.json");
          return res.json();
        })
        .then(setScenario)
        .catch(err => setError(err.message));
    }, []);
  
    return (
      <div style={{ width: window.innerWidth, height: window.innerHeight }}>
        <h1>Main Page</h1>
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {scenarioId != null && <p>Scenario ID: {scenarioId}</p>}
        {scenario.scenarios?.length > 0 && (
          <>
            <h2>Scenario Details</h2>
            <p>{scenario.scenarios[parseInt(scenarioId)]?.title}</p>
          </>
        )}
        <LoveMeter love={50} />
      </div>
    );
  };

  export default Main;