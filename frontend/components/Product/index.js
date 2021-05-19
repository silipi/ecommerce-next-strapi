import React from "react";
import { currencyMask } from "../../utils/helpers";
import { useRouter } from "next/router";
import Image from "next/image";

import { Container } from "./styles";

export default function Product({ product }) {
  const router = useRouter();
  const imgUrl = product.imageCover.formats.thumbnail.url;

  const handleClick = () => {
    router.push(`/produto/${product.id}`);
  };

  return (
    <Container onClick={handleClick}>
      <Image
        width={150}
        height={150}
        src={imgUrl}
        alt="Imagem ilustrativa do produto"
      />
      <div>
        <h3>{product.title}</h3>
        <p>{currencyMask(product.price)}</p>
      </div>
    </Container>
  );
}
