import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Calculator = () => {
  const [input, setInput] = useState("0");
  const [theme, setTheme] = useState("dark");

  const handleClick = (value) => {
    if (input === "0" && value !== ".") setInput(value);
    else setInput((prev) => prev + value);
  };

  const clearInput = () => setInput("0");

  const calculate = () => {
    try {
      const result = eval(input);
      setInput(String(result));
    } catch {
      setInput("Error");
    }
  };

  // 🎹 Handle keyboard input
  const handleKeyPress = (e) => {
    const key = e.key;
    if (/^[0-9+\-*/().]$/.test(key)) handleClick(key);
    else if (key === "Enter") calculate();
    else if (key === "Backspace")
      setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    else if (key.toLowerCase() === "c") clearInput();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [input]);

  // 🌗 Theme toggle logic
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("calcTheme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("calcTheme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  return (
    <div className={`calculator-container ${theme}`}>
      {/* Floating Theme Toggle */}
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? (
          <FaSun className="theme-icon sun" />
        ) : (
          <FaMoon className="theme-icon moon" />
        )}
      </div>

      {/* Calculator Box */}
      <div className={`calculator-box ${theme}-box`}>
        <div className={`display ${theme}-display`}>{input}</div>

        <div className="buttons">
          <button className="clear" onClick={clearInput}>
            C
          </button>
          <button onClick={() => handleClick("(")}>(</button>
          <button onClick={() => handleClick(")")}>)</button>
          <button className="operator" onClick={() => handleClick("/")}>
            /
          </button>

          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button className="operator" onClick={() => handleClick("*")}>
            *
          </button>

          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button className="operator" onClick={() => handleClick("-")}>
            -
          </button>

          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button className="operator" onClick={() => handleClick("+")}>
            +
          </button>

          <button className="zero" onClick={() => handleClick("0")}>
            0
          </button>
          <button onClick={() => handleClick(".")}>.</button>
          <button className="equals" onClick={calculate}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
