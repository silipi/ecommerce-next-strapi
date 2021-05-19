import React from "react";
import Image from "next/image";

import styles from "../styles/components/PreviewCartItem.module.css";
import { currencyMask } from "../utils/helpers";

export default function PreviewCartItem(props) {
  return (
    <div className={styles.previewCartItemContainer}>
      <Image src={props.product.url} width={60} height={60} />
      <div>
        <p>{props.product.title}</p>
        <p>Quantidade: {props.product.quantity}</p>
      </div>
      <p>{currencyMask(props.product.price)}</p>
    </div>
  );
}
