import { useState, useCallback, useEffect } from "react";
import { randomWords } from "./assets/readAbleWords";
import "./App.css";
const uniqueUnicodeChars = [
  "ä",
  "ö",
  "ü",
  "ß",
  "é",
  "è",
  "ê",
  "ñ",
  "ç",
  "å",
  "æ",
  "ø",
  "ð",
  "þ",
  "ý",
  "ž",
  "š",
  "č",
  "ı",
  "ł",
];
function App() {
  let [length, setLength] = useState(15);
  let [fullpass, setFullpass] = useState("");
  let [capital, setCapital] = useState(false);
  let [smLetter, setSmLetter] = useState(false);
  let [symbol, setSymbol] = useState(false);
  let [number, setNumber] = useState(true);
  let [words, setWords] = useState(true);
  let [uniqueChar, setUniqueChar] = useState(false);
  let [copy, setCopy] = useState("Copy");
  let RandomNum = (n) => {
    return Math.floor(Math.random() * n);
  };
  let CopyText = () => {
    window.navigator.clipboard.writeText(fullpass.slice(0, length));
    let old_pass = fullpass;
    setFullpass("Copied!");
    setCopy("Copied!");
    setTimeout(() => {
      setCopy("Copy");
      setFullpass(old_pass);
    }, 1400);
  };
  let PasswordGenerator = useCallback(() => {
    if (
      !capital &&
      !smLetter &&
      !number &&
      !symbol
      // (words == uniqueChar || words !== uniqueChar)
    ) {
      setNumber(true);
      setWords(true);
    }
    let passwordIs = "";
    let passChar = "";
    let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lowerCase = "abcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()_+-=[]{}|;:'.<>?/`~";

    if (capital) passChar += upperCase;
    if (smLetter) passChar += lowerCase;
    if (number) passChar += numbers;
    if (symbol) passChar += symbols;

    for (let i = 1; i <= length; i++) {
      if (i == 1 && words) {
        passwordIs += randomWords[RandomNum(randomWords.length)];
      }
      if (i == 2 && uniqueChar) {
        passwordIs += uniqueUnicodeChars[RandomNum(uniqueUnicodeChars.length)];
      }
      passwordIs += passChar[RandomNum(passChar.length)];
    }
    setFullpass(passwordIs);
  }, [length, capital, smLetter, symbol, number, words, uniqueChar]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, capital, smLetter, symbol, number, words, uniqueChar]);
  return (
    <>
      <div className="w-600 m0a">
        <h1>Password Generator</h1>
        <input
          type="text"
          value={fullpass.slice(0, length)}
          name="pass"
          id="pass"
          readOnly
          placeholder="Your password will appear here"
          onClick={CopyText}
        />

        <div className="length">
          <div className="length-label">
            <span>9-50 characters ({length})</span>
          </div>
          <input
            type="range"
            max="50"
            min="9"
            name="passLength"
            id="length"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="opt">
          <div className="opt-box">
            <label htmlFor="Cchar">Uppercase Letters {capital}</label>
            <input
              type="checkbox"
              name="allowdCapt"
              id="Cchar"
              checked={capital}
              onChange={() => setCapital(!capital)}
            />
          </div>

          <div className="opt-box">
            <label htmlFor="Schar">Lowercase Letters</label>
            <input
              type="checkbox"
              name="allowdSmall"
              id="Schar"
              checked={smLetter}
              onChange={() => {
                setSmLetter(!smLetter);
              }}
            />
          </div>

          <div className="opt-box">
            <label htmlFor="num">Numbers</label>
            <input
              type="checkbox"
              name="allowdNumber"
              id="num"
              checked={number}
              onChange={() => {
                setNumber(!number);
              }}
            />
          </div>

          <div className="opt-box">
            <label htmlFor="sym">Symbols</label>
            <input
              type="checkbox"
              name="allowdSymb"
              id="sym"
              checked={symbol}
              onChange={() => {
                setSymbol(!symbol);
              }}
            />
          </div>
          <div className="opt-box">
            <label htmlFor="allowdWords">Add a Word</label>
            <input
              type="checkbox"
              name="allowdWords"
              id="allowdWords"
              checked={words}
              onChange={() => {
                setWords(!words);
              }}
            />
          </div>
          <div className="opt-box">
            <label htmlFor="unique">Unique Char (non-ASCII)</label>
            <input
              type="checkbox"
              name="unique"
              id="unique"
              checked={uniqueChar}
              onChange={() => {
                setUniqueChar(!uniqueChar);
              }}
            />
          </div>
        </div>
        <div className="f nowrap gap10">
          <button
            className="generate-btn"
            id="generate"
            onClick={PasswordGenerator}
          >
            Generate Password
          </button>
          <button className="generate-btn" id="generate" onClick={CopyText}>
            {copy}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
