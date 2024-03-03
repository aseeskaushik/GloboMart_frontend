import { cartActions } from "./cart-slice";

export const addToCart = (item, quantity) => {
  return async (dispatch, getState) => {
    dispatch(
      cartActions.addItemToCart({
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image[0].url,
        stock: item.stock,
        quantity: quantity,
      })
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const removeFromCart = (itemId) => {
  return async (dispatch, getState) => {
    dispatch(
      cartActions.removeItemFromCart({
        _id: itemId,
      })
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

export const saveShippingInfo = (shippingData) => {
  return async (dispatch, getState) => {
    dispatch(cartActions.saveShippingInfo(shippingData));
    localStorage.setItem(
      "shippingInfo",
      JSON.stringify(getState().cart.shippingInfo)
    );
  };
};
