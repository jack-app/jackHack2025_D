import TitleButton from "./components/title_button";
import ResultProp from "../../types/result_prop";
import React from 'react';


const End = (result) => {

  // result must be ResultProp type
  if (!(result instanceof ResultProp)) {
    throw new Error("Invalid result prop type. Expected ResultProp.");
  }


  return (
    <div className="end">
      <h1>End</h1>
      <p>Thank you for playing!</p>
      <p>Final point:{result.points}</p>
      <p>We hope you enjoyed the game!</p>
      <TitleButton />
    </div>
  );
}

export default End;