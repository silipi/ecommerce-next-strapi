import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const cartDataInitialValues = {
    products: [],
    totalQuantity: 0,
    totalValue: 0,
  };
  const [cartData, setCartData] = useState(cartDataInitialValues);

  useEffect(() => {
    if (!process.browser) {
      return;
    }

    const cartProductsFromLocal = JSON.parse(
      localStorage.getItem("cartProducts")
    );

    if (cartProductsFromLocal !== null) {
      setCartData(cartProductsFromLocal);
    }
  }, []);
  
  useEffect(() => {
    if (!process.browser) {
      return;
    }
    
    localStorage.setItem("cartProducts", JSON.stringify(cartData));
  }, [cartData])

  const [shouldShowPreviewCart, setShouldShowPreviewCart] = useState(false);

  function addProductToCart(product) {
    const { price, quantity, title, id, url } = product;

    if (cartData.products.some((e) => e.id === id)) {
      const index = cartData.products.findIndex((prd) => prd.id === id);

      let arr = cartData.products;

      arr[index] = {
        ...cartData.products[index],
        quantity: quantity + cartData.products[index].quantity,
      };

      setCartData({
        products: arr,
        totalQuantity: cartData.totalQuantity + quantity,
        totalValue: quantity * price + cartData.totalValue,
      });
    } else {
      setCartData({
        products: [...cartData.products, { price, quantity, title, id, url }],
        totalQuantity: cartData.totalQuantity + quantity,
        totalValue: quantity * price + cartData.totalValue,
      });
    }
  }
  
  function increaseProductCount(id) {
    const productToIncrease = cartData.products.filter(product => product.id === id)[0];
    const index = cartData.products.indexOf(productToIncrease);
    
    let cartProducts = cartData.products;
    
    cartProducts[index].quantity++;
    
    setCartData({
      products: cartProducts,
      totalQuantity: cartData.totalQuantity + 1,
      totalValue: cartData.totalValue + productToIncrease.price
    });
  }
  
  function decreaseProductCount(id) {
    const productToDecrease = cartData.products.filter(product => product.id === id)[0];
    const index = cartData.products.indexOf(productToDecrease);
    
    let cartProducts = cartData.products;
    
    if (cartProducts[index].quantity === 1) {
      return;
    }
    
    cartProducts[index].quantity--;
    
    setCartData({
      products: cartProducts,
      totalQuantity: cartData.totalQuantity - 1,
      totalValue: cartData.totalValue - productToDecrease.price
    });
  }
  
  function removeProductFromCart(product) {
    const filteredProducts = cartData.products.filter(prod => prod.id !== product.id);
    
    setCartData({
      products: filteredProducts,
      totalQuantity: cartData.totalQuantity - product.quantity,
      totalValue: cartData.totalValue - product.price * product.quantity,
    })
  }

  function removeAllProductsFromCart() {
    setCartData(cartDataInitialValues);
    localStorage.removeItem("cartProducts");
  }

  function toggleCartPreview(boolean) {
    if (boolean === undefined) {
      setShouldShowPreviewCart(!shouldShowPreviewCart);
      return;
    }

    if (boolean) {
      setShouldShowPreviewCart(true);
    } else {
      setShouldShowPreviewCart(false);
    }
  }

  return (
    <AppContext.Provider
      value={{
        cartData,
        addProductToCart,
        removeProductFromCart,
        removeAllProductsFromCart,
        
        increaseProductCount,
        decreaseProductCount,
        
        shouldShowPreviewCart,
        toggleCartPreview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
