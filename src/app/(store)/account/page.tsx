import React from "react";
import Head from "next/head";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Home - E-commerce System</title>
        <meta name="description" content="Welcome to our e-commerce store" />
      </Head>
      <header>
        <h1>Welcome to Our E-commerce Store</h1>
        <nav>
          <ul>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
            <li>
              <Link href="/account">Account</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>Featured Products</h2>
          {/* Add code to display featured products here */}
        </section>
        <section>
          <h2>Latest Products</h2>
          {/* Add code to display latest products here */}
        </section>
      </main>
      <footer>
        <p>&copy; 2023 E-commerce System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
