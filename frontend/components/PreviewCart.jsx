import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import PreviewCartItem from "./PreviewCartItem";
import { useRouter } from "next/router";

import styles from "../styles/components/PreviewCart.module.css";

export default function PreviewCart() {
  const { cartData, shouldShowPreviewCart } = useContext(AppContext);
  const router = useRouter();

  const handleClick = () => {
    router.push("/checkout");
  };

  if (!shouldShowPreviewCart) {
    return null;
  }

  if (shouldShowPreviewCart) {
    return (
      <div className={styles.previewContainer}>
        {cartData.products.length > 0 ? (
          <>
            <h3>
              Minha sacola, <span>{cartData.totalQuantity} itens</span>
            </h3>

            {cartData.products.map((product) => (
              <PreviewCartItem product={product} />
            ))}

            <div className={styles.divisor} />

            <div className={styles.openFullCart}>
              <button type="button" onClick={handleClick}>
                Ir para o carrinho
              </button>
            </div>
          </>
        ) : (
          <h2>Nenhum produto adicionado...</h2>
        )}
      </div>
    );
  }
}
