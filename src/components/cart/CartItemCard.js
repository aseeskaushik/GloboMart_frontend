import { Fragment } from "react";
import { Link } from "react-router-dom";

import "./CartItemCard.css";

const CartItemCard = ({ item, removeItemHandler }) => {
  return (
    <Fragment>
      <div className="cartItem-card">
        <img src={item.image} alt="test" />
        <div>
          <Link to={`/product/${item.id}`}>{item.name}</Link>
          <span>{`Price ₹${item.price}`}</span>
          <p onClick={removeItemHandler}>Remove</p>
        </div>
      </div>
    </Fragment>
  );
};
export default CartItemCard;
