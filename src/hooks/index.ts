import React from "react";
import { CartContext } from "../context/Cart";
import { AuthContext } from "../context/Auth";

export const useAuth = () => {
  const ctx = React.useContext(AuthContext);
  if (!ctx) {
    throw new Error("Error, context not wrapped!");
  }

  return ctx;
};

export const useCart = () => {
  const ctx = React.useContext(CartContext);
  if (!ctx) {
    throw new Error("Error, context not wrapped!");
  }

  return ctx;
};

export * from './use-effect-only-once';
