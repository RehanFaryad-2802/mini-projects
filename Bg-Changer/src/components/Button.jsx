export default function Button({ singleColor, color, changeColor }) {
  return (
    <>
      <button
        className="pointer br20 wtc my-btn"
        style={{
          backgroundColor: singleColor,
          scale: singleColor == color ? "1.2" : "1",
          opacity: singleColor == color ? "1" : "0.5",
        }}
        onClick={() => changeColor(singleColor)}
      >
        {singleColor}
      </button>
    </>
  );
}
