import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createProductReview,
  fetchProductDetail,
} from "../../store/product-actions";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import "./ProductDetail.css";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/loader/Loader";
import MetaData from "../layout/MetaData";
import { addToCart } from "../../store/cart-actions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { productActions } from "../../store/product-slice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, productDetailLoading, reviewSuccess } = useSelector(
    (state) => state.product
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increment = () => {
    if (product.stock <= quantity) {
      return;
    }
    setQuantity((prevState) => {
      return prevState + 1;
    });
  };

  const decrement = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity((prevState) => {
      return prevState - 1;
    });
  };

  const addToCartHandler = () => {
    dispatch(addToCart(product, quantity));
    toast.success("Product added successfully");
  };

  const reviewToggler = () => {
    setOpen((prevState) => {
      return !prevState;
    });
    setRating(0);
    setComment("");
  };

  const submitReviewHandler = () => {
    if (rating === 0 || comment === "") {
      toast.error("Please submit a valid review");
      return;
    }
    const reviewData = {
      rating: rating,
      comment: comment,
      productId: id,
    };
    dispatch(createProductReview(reviewData));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchProductDetail(id));
    if (reviewSuccess) {
      toast.success("Review Submitted Successfully");
      dispatch(
        productActions.productReviewReducer({
          success: false,
        })
      );
    }
  }, [dispatch, id, reviewSuccess]);

  return (
    <Fragment>
      {productDetailLoading ? (
        <Loader />
      ) : !Object.keys(product).length ? (
        <div className="empty-cart">
          <RemoveShoppingCartIcon />
          <Typography>No product in your cart</Typography>
          <Link to="/products">view products</Link>
        </div>
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- GloboMart`} />
          <div className="product-detail">
            <div className="left-column">
              <Carousel>
                {product.image &&
                  product.image.map((item, i) => (
                    <img
                      className="carousel-image"
                      key={i}
                      src={item.url && item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
            <div className="right-column">
              <div className="detail-block-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detail-block-2">
                <ReactStars
                  {...{
                    edit: false,
                    color: "rgba(20,20,20,0.2)",
                    activeColor: "#CC9B47",
                    size: window.innerWidth < 600 ? 25 : 20,
                    value: product.rating,
                    isHalf: true,
                  }}
                />
                <span>({product.numofReviews} Reviews)</span>
              </div>
              <div className="detail-block-3">
                <h1>₹{product.price}</h1>
                <div className="detail-block-3-1">
                  <div className="detail-block-3-1-1">
                    <button onClick={decrement}>-</button>
                    <span>{quantity}</span>
                    <button onClick={increment}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>
              <div className="detail-block-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={reviewToggler} className="submit-review">
                submit review
              </button>
            </div>
          </div>
          <h3 className="reviews-heading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={reviewToggler}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submit-dialog">
              <Rating
                value={rating}
                onChange={(event) => setRating(+event.target.value)}
                size="large"
              />
              <textarea
                className="sumbit-textArea"
                rows="5"
                cols="30"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={reviewToggler}>
                Cancel
              </Button>
              <Button color="primary" onClick={submitReviewHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review, index) => (
                <ReviewCard review={review} key={index} />
              ))}
            </div>
          ) : (
            <p className="no-reviews">No reviews yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetail;
