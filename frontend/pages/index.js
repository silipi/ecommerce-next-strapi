import { useEffect, useState } from "react";
import Product from "../components/Product";
import strapiApi from "../utils/lib/api";
import Head from "next/head";

import styles from "../styles/pages/Home.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    strapiApi.get("/products").then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) <h1>Carregando...</h1>;

  return (
    <div className={styles.homeContainer}>
      <Head>
        <title>{`Loja | Página Inicial`}</title>
      </Head>

      <main className={styles.productsContainer}>
        {products.length > 0 &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
      </main>
    </div>
  );
}
