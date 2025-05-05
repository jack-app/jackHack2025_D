import { useState, useEffect } from 'react';

const LineBox = ({line}) => { 

    if(line === "null"){
        line = "";
    }

    return (
        <>
            <div className="lineBox">
                <div style={{ padding: "30px 16px", fontSize: "40px", color: "white" }}>
                    {line}
                </div>
            </div>
        </>
    );
};

export default LineBox;