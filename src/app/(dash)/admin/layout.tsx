import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login & Signup",
  description: "The ecommerce platform for the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <p>header admin</p>
        </header>
        {children}
        <footer>
          <p>footer admin</p>
        </footer>
      </body>
    </html>
  );
}
