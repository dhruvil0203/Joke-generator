import Head from "next/head";
import ThemeProvider from "./context/ThemeProvider";
import "./globals.css";
export const metadata = {
  title: "Joke Junkie",
  description: "Joke Genrater",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favJoke.png"></link>
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <footer style={{ overflow: "hidden", padding: "12px 0", backgroundColor: "#101828" }}>
          <div className="marquee-inner" style={{ fontSize: "14px", color: "#ffffff" }}>
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className="marquee-copy">Dhruvil Mistry ❤️</span>
            ))}
          </div>
        </footer>
      </body>
    </html>
  );
}
