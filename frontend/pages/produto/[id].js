import { currencyMask } from "../../utils/helpers";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";

import styles from "../../styles/pages/ProductDetails.module.css";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";

export default function ProductDetails(props) {
  const { addProductToCart, toggleCartPreview } = useContext(AppContext);

  const [quantitySelected, setQuantitySelected] = useState(1);

  const imgUrl = props?.data?.imageCover?.url;

  const handleChangeQuantity = (e) => {
    const number = e.target.valueAsNumber;

    if (number > 0) {
      setQuantitySelected(number);
    } else {
      setQuantitySelected(1);
    }
  };

  const handleAddToCart = () => {
    const { title, price } = props.data;
    addProductToCart({
      price,
      quantity: quantitySelected,
      title,
      id: props.id,
      url: props.data.imageCover.formats.thumbnail.url,
    });
    toggleCartPreview(true);
  };

  return (
    <>
      <Head>
        <title>{`Loja | ${props.data.title || Produto}`}</title>
      </Head>
      <main className={styles.detailsContainer}>
        <div className={styles.details}>
          <div>
            <img src="https://via.placeholder.com/80" alt="" />
            <img src="https://via.placeholder.com/80" alt="" />
            <img src="https://via.placeholder.com/80" alt="" />
            <img src="https://via.placeholder.com/80" alt="" />
          </div>

          <div className={styles.image}>
            <Image layout="fill" src={imgUrl} quality={95} />
          </div>

          <div>
            <h2>{props?.data?.title}</h2>
            <div>
              <h4>{currencyMask(props?.data?.price)}</h4>
              <div>
                <p>
                  Quantidade:
                  <input
                    type="number"
                    value={quantitySelected}
                    onChange={handleChangeQuantity}
                  />
                </p>
                <p>Restante disponível: {props?.data?.quantity}</p>
              </div>
            </div>

            <button type="button" onClick={handleAddToCart}>
              Adicionar ao carrinho
            </button>
          </div>
        </div>

        <div className={styles.divisor} />

        <div className={styles.description}>
          <h3>Descrição do produto:</h3>
          <p>{props?.data.description}</p>
        </div>
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const allProducts = await axios
    .get("http://localhost:1337/products")
    .then((response) => response.data);
  return {
    paths: allProducts?.map((product) => `/produto/${product.id}`) || [],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;

  const data = await axios
    .get(`http://localhost:1337/products/${id}`)
    .then((response) => response.data);

  return {
    props: {
      id,
      data,
    },
  };
}
