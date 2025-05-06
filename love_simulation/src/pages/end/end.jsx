import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import "./end.css";

const End = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [likeability, setLikeability] = useState(0);
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    setLikeability(location.state?.Likeability || 0);
    const container = document.getElementById("confetti-container");

    function createConfetti() {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");

      // ランダムな色
      const colors = ["#ff69b4", "#ffc0cb", "#ffe4e1", "#ffb6c1", "#deb887"];
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      // ランダムな位置とサイズ
      confetti.style.left = `${Math.random() * window.innerWidth}px`;
      confetti.style.top = "-10px";
        const size = 5 + Math.random() * 10;
      confetti.style.width = size + "px";
      confetti.style.height = size + "px";
      confetti.style.position = "absolute"; 
      confetti.style.animationDuration = 2 + Math.random() * 3 + "s";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

      container.appendChild(confetti);

      // 一定時間後に削除
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }

    // 紙吹雪を定期的に生成
    const interval = setInterval(createConfetti, 100);

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch("/scenarios/scenarioList.json");
        if (!res.ok) throw new Error("Failed to fetch scenarioList.json");
        const json = await res.json();
        console.log("fetched scenarios:", json.scenarios);
        setScenarios(json.scenarios || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchList();
  }, []);

  const handleButtonClick = () => {
    navigate("/");
  };

  const currentScenario = scenarios.find(s => s.id === location.state?.id);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", justifyContent: "center", alignItems: "center",userSelect:"none" }}>
      {/* 紙吹雪コンテナ */}
      <div id="confetti-container" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", overflow: "hidden", zIndex: 9999 }}></div>

      <div
        id="box"
        style={{
          background: "linear-gradient(to right, #f9cbec, #bacff3)",
          fontFamily: "'Yomogi', sans-serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span className="text_thx" style={{ color: "rgb(179, 32, 120)", fontSize: "70px" }}>
          THANK YOU FOR PLAYING!!
        </span>
        <br />
        <span className="text_like_cancel" style={{ fontSize: "30px" }}>
          好感度：{likeability}
          <br />
          キャンセル回数：{currentScenario?.cancel_num - location.state?.cancel_num}
          <br />
          <br />
        </span>
        <button
          id="myButton"
          style={{
            backgroundColor: "rgb(236, 141, 222)",
            fontFamily: "'Yomogi', sans-serif",
            border: "4mm ridge rgba(211, 220, 50, 0.6)",
            borderRadius: "20px",
            borderColor: "deeppink",
            width: "30vw",
            height: "15vw",
            color: "white",
            padding: "15px",
            textAlign: "center",
            textShadow: "0 0 3px pink, 0 0 6px deeppink",
            display: "inline-block",
            fontSize: "22px",
            margin: "4px 2px",
            cursor: "pointer",
          }}
          onClick={handleButtonClick}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "rgb(245, 220, 241)")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(236, 141, 222)")}
        >
          タイトルに戻る
        </button>
      </div>
    </div>
  );
};

export default End;