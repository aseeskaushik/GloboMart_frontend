import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import "./Product.css";

const Product = (props) => {
  const options = {
    edit: false,
    activeColor: "#67727D",
    color: "#FFFFFF",
    border: "1px solid #415161",
    size: window.innerWidth < 600 ? 15 : 20,
    value: props.product.rating,
    isHalf: true,
    emptyIcon: (
      <i
        className="far fa-star"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #415161" }}
      />
    ),
    halfIcon: (
      <i
        className="fas fa-star-half-alt"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #415161" }}
      />
    ),
  };
  return (
    <Link className="productCard" to={`/product/${props.product._id}`}>
      <img
        src={
          // props.product.image &&
          // props.product.image[0] &&
          // props.product.image[0].url &&
          props.product?.image?.[0]?.url
        }
        alt="img"
      />
      <div>
        <p>{props.product.name}</p>
        <div>
          <ReactStars {...options} />
          <span>({props.product.numofReviews} Reviews)</span>
        </div>
        <span>₹{props.product.price}</span>
      </div>
    </Link>
  );
};
export default Product;
