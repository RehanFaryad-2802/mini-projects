export default function Button({ singleColor, color ,changeColor}) {
  return (
    <>
      <button
        className="pointer br20 wtc"
        style={{
          fontWeight: 500,
          backgroundColor: singleColor,
          scale: singleColor == color ? "1.2" : "1",
          color:
            singleColor.toLowerCase() == "yellow" ||
            singleColor.toLowerCase() == "white"
              ? "black"
              : "white",
          padding: "7px 18px",
          border: "none",
          fontSize: "15px",
          opacity: singleColor == color ? "1" : "0.5",
        }}
        onClick={() => changeColor(singleColor)}
      >
        {singleColor}
      </button>
    </>
  );
}
