/* eslint-disable @next/next/no-page-custom-font */
import { Limelight, Montserrat } from 'next/font/google'; 
import './globals.css';

// 1. Limelight
const limelight = Limelight({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-limelight',
});
const googleSansFlex = Montserrat({
  subsets: ['latin'],
  variable: '--font-google-sans-flex',
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en"
      className={`${limelight.variable} ${googleSansFlex.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&fam ily=Google+Sans+Flex:opsz,wght@6..144,1..1000&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Limelight&display=swap" rel="stylesheet"/>
      </head>
      <body className={`antialiased min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
