import { useEffect, useState, useCallback } from "react";
import Button from "./components/Button";

function App() {
  const ColorsArr = [
    "Red",
    "Green",
    "Blue",
    "Orange",
    "Purple",
    "Pink",
    "Coral",
    "Gray",
    "Black",
    "Cyan",
    "Magenta",
    "Teal",
  ];
  let [color, setColor] = useState(ColorsArr[0]);
  let changeColor = useCallback((currColor) => {
    setColor(currColor);
  });
  return (
    <>
      <div
        className="f fdc jce aic"
        style={{
          backgroundColor: color,
          height: "100vh",
          width: "100vw",
          paddingBottom: "5rem",
        }}
      >
        <h1 className="wtc mb3r mh">Background changer using `react`.</h1>
        <div className="colorsBar container f jcc gap10 wbgc br10">
          {ColorsArr.map((singleColor) => (
            <Button
              key={singleColor}
              color={color}
              singleColor={singleColor}
              changeColor={changeColor}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
