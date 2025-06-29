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
      </body>
    </html>
  );
}
