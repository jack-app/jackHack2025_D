const QuestionBox = ({line}) => {
  return (
    <div
      style={{
        fontFamily: "'Yomogi', sans-serif",
        textAlign: "center",
        zIndex: 1,
        margin: "1% 20% 0 20%",
        height: "25%",
        position: "relative"
      }}
    >
      <div
        className="question-button"
        style={{
          display: "inline-block",
          height: "auto",
          background: "linear-gradient(to right, #ffdde1, #ee9ca7)",
          color: "#fff",
          fontSize: "20px",
          padding: "14px 32px",
          border: "1px solid black",
          borderRadius: "20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          userSelect: "none",
        }}
      >
        {line}
      </div>
    </div>
  );
};

export default QuestionBox;