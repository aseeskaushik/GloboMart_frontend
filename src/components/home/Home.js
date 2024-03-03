import { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import MetaData from "../layout/MetaData";

import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/product-actions";
import Loader from "../layout/loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="GenieBazaar" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>Find Amazing Products Below</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <div className="low-banner">
            <h1 className="home-heading">Featured Products</h1>
            <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
