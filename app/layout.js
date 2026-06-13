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
        <footer style={{ textAlign: "center", padding: "12px", fontSize: "14px" }}>
          Dhruvil Mistry ❤️
        </footer>
      </body>
    </html>
  );
}
