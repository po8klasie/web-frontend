import { ReactNode } from "react";
import './global.css'

export default function RootLayout({
                                     children,
                                   }: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/logo.png" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link
        href="https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&family=Source+Sans+Pro&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
    {children}
    </body>
    </html>
  );
}
