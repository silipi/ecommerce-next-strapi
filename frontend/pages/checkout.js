import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import { currencyMask } from "../utils/helpers";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import axios from "axios";

import styles from "../styles/pages/Checkout.module.css";
import styled from "styled-components";

export default function Checkout() {
  const { user } = useContext(AuthContext);
  
  const { 
    toggleCartPreview, 
    cartData, 
    removeAllProductsFromCart, 
    increaseProductCount,
    decreaseProductCount,
    removeProductFromCart,
  } = useContext(AppContext);
  
  const [checkoutSuccess, setCheckoutSuccess] = useState();
  const [checkoutError, setCheckoutError] = useState();
  const [loading, setLoading] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    toggleCartPreview(false);
  }, []);

  const handleSubmitCardInfo = async () => {
    if (!stripe || !elements) {
      return;
    }

    setLoading(true); // Para bloquear a <div>;

    const card = elements.getElement(CardElement);

    const clientSecret = await axios
      .post("/api/payment_intents", { cartData })
      .then(async (res) => {
        return res.data.payment_intent.client_secret;
      });

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user.username,
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        setLoading(false);
        setCheckoutSuccess(true);
      }
    }
  };

  if (cartData?.products.length === 0) {
    return (
      <>
        <Head>
          <title>{`Loja | Carrinho (vazio)`}</title>
        </Head>
        <div className={`${styles.checkoutContainer} ${styles.emptyCart}`}>
          <h1>Oops...</h1>
          <h2>Parece que seu carrinho está vazio :(</h2>
          <div>
            <Image src="/images/empty-cart.svg" height={250} width={250} />
          </div>
          <Link as="/" href="/">
            <button type="button">Escolher produtos</button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`Loja | Carrinho`}</title>
      </Head>
      
      {loading && (
        <img
          className={styles.spinner}
          src="/images/spinner.svg"
          width="120px"
          height="120px"
        />
      )}

      <div className={styles.checkoutContainer} disabled={loading}>
        <h3>Confira os produtos selecionados:</h3>

        <p>Você está comprando {`${cartData.totalQuantity} produto${cartData.totalQuantity > 1 ? "s" : ""}`} no valor total de {currencyMask(cartData.totalValue)}.</p>

        <table>
          <thead>
            <tr>
              <td>Produto</td>
              <td>Quantidade</td>
              <td>Preço</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {cartData.products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Image src={product.url} width={50} height={50} />
                  <p>{product.title}</p>
                </td>
                <td>
                  <span 
                    style={{
                      margin: '0 8px',
                      cursor: 'pointer',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                    onClick={() => decreaseProductCount(product.id)}
                  >-</span>
                  <span>{product.quantity}</span>
                  <span 
                    style={{
                      margin: '0 8px',
                      cursor: 'pointer',
                      fontSize: '18px',
                      fontWeight: 'bold',
                    }}
                    onClick={() => increaseProductCount(product.id)}
                  >+</span>
                </td>
                <td>{currencyMask(product.price)}</td>
                <td onClick={() => removeProductFromCart(product)}>Remover</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        
        
        <h3>Agora, insira as informações do seu cartão para pagamento:</h3>
        <div className={styles.cardContainer}>
          <div>
            <CardElement
              options={{
                hidePostalCode: true,
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <button
            type="button"
            disabled={user === null || !stripe}
            onClick={handleSubmitCardInfo}
          >
            Confirmar pagamento
          </button>
          {user === null && (
            <div className={styles.userNotLogged}>
              <p>Faça o login para continuar: </p>
              <Link as="/auth" href="/auth">
                <button>Login</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const Item = styled.tr`
  
`;