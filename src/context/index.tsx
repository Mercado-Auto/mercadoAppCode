import React from "react";
import CartProvider from "./Cart";
import AuthProvider from "./Auth";

const GlobalContext: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default GlobalContext;
