import React, { useContext } from "react";
import { HiShoppingCart, HiTerminal } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";

import { AppContext } from "../../context/AppContext";
import { AuthContext } from "../../context/AuthContext";

import { Container } from './styles';

export default function Header() {
  const { cartData, toggleCartPreview } = useContext(AppContext);
  const { user, logout } = useContext(AuthContext);
  const Router = useRouter();

  const handleCartPreview = () => {
    toggleCartPreview();
  };

  const handleAuth = () => {
    const currentPath = Router.asPath;
    
    Router.push(`/auth?redirect=${currentPath}`);
  };

  return (
    <Container>
      <Link as="/" href="/">
        <HiTerminal size={30} color="#6c5ce7" style={{ cursor: "pointer" }} />
      </Link>

      <div>
        {user === null ? (
          <button onClick={handleAuth} className="btnLogin">
            Entrar
          </button>
        ) : (
          <div className="userLoggedContainer">
            <span>Bem vindo, {user.username}!</span>
            <button onClick={() => logout()} className="btnLogout">
              Deslogar
            </button>
          </div>
        )}
        <div className="cart" onClick={handleCartPreview}>
          <HiShoppingCart
            size={28}
            color="#636e72"
            style={{ cursor: "pointer" }}
          />
          <span>{cartData.totalQuantity}</span>
        </div>
      </div>
    </Container>
  );
}
