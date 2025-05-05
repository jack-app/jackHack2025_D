import TitleButton from "./components/title_button";
import ResultProp from "../../types/result_prop";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const End = (result) => {

  const location = useLocation();
  const [likeability,setLikeability] = useState(0);

  useEffect(() => {
    setLikeability(location.state?.Likeability || 0);
  }, [location.state]);

  return (
    <div
      className="end"
      style={{
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>End</h1>
      <p>Thank you for playing!</p>
      <p>{likeability}</p>
      <p>We hope you enjoyed the game!</p>
      <TitleButton />
    </div>
  );
}

export default End;