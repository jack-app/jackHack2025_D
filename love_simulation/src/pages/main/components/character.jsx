const Character = ({ speaker }) => {

    return (
        <div className="character" style={{fontSize: "32px", color: "white" }}>
            {speaker}
        </div>
    );
};

export default Character;