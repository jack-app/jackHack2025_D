const Character = ({ speaker }) => {
    return (
        <div className="character" style={{zIndex:1, fontSize: "32px", color: "white" }}>
            {speaker}
        </div>
    );
};

export default Character;