"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";

export const RandomJokes = () => {
  const [randomJoke, setRandomJoke] = useState(null);
  const [showJoke, setShowJoke] = useState(true);
  const { theme, handleToggleTheme } = useContext(ThemeContext);

  const URL = "https://official-joke-api.appspot.com/random_joke";

  const fetchRandomJokes = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setRandomJoke(data);
    setShowJoke(false);
  };

  useEffect(() => {
    fetchRandomJokes();
  }, []);

  if (!randomJoke) {
    return <p className="text-center mt-10">Loading joke...</p>;
  }

  return (
    <div
      className={`w-full h-screen flex justify-center items-center transition-colors ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50 text-black"
      }`}
    >
      <div
        className={`flex flex-col gap-4 p-6 rounded-xl shadow-lg w-[400px] transition-colors ${
          theme === "dark"
            ? "bg-gray-800 border border-gray-600"
            : "bg-white border border-orange-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-orange-400  flex-1 text-left pr-4">
            😂 Comedy Clicks
          </h2>
          <button
            onClick={handleToggleTheme}
            className={`${
              theme === "dark"
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-black"
            } rounded-full px-4 py-2 font-medium hover:brightness-110 transition`}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <h1 className="text-lg font-semibold">{randomJoke.setup}</h1>

        {showJoke ? (
          <h2 className="text-md text-green-600 font-medium">
            🥁 {randomJoke.punchline}
          </h2>
        ) : (
          <p className="italic text-gray-500">
            🤔 Click reveal to see the punchline!
          </p>
        )}

        <div className="flex flex-col">
          <button
            onClick={() => setShowJoke(!showJoke)}
            className="bg-orange-400 text-white font-semibold px-4 py-2 rounded hover:bg-orange-500 transition"
          >
            {showJoke ? "🙈 Hide Punchline" : "😂 Reveal"}
          </button>

          <button
            onClick={fetchRandomJokes}
            className="bg-green-500 text-white font-semibold px-4 py-2 mt-3 rounded hover:bg-green-600 transition"
          >
            🔁 Next Joke
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <RandomJokes />
    </div>
  );
}
