import PropTypes from "prop-types";

const LoveMeter = ({ love }) => {
  return (
    <div className="love-meter" style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "10%", height: "50%"}}>
      <p style={{ margin: 0, color: "white" }}>好感度</p>
      <p style={{ margin: 0, fontSize: "2rem", color: "white" }}>{love}</p>
      <div
        style={{
        width: "60%",
        height: "100%",
        backgroundColor: "#ddd",
        borderRadius: "100px",
        overflow: "hidden",
        marginTop: "10px",
        display: "flex",
        flexDirection: "column-reverse",
        border: "2px solid white",
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${love}%`,
            background: "linear-gradient(to top, rgb(236, 141, 222), rgb(255, 182, 193))",
            transition: "height 0.3s ease",
          }}
        />
      </div>
    </div>
  );
};

LoveMeter.propTypes = {
  love: PropTypes.number.isRequired,
};

export default LoveMeter;