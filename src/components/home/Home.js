import { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import boyimg from "../../images/background.png";
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
          <MetaData title="GloboMart" />
          <div className="banner">
            <div className="banner1">
              <h1>
                FASHION'S PLAYGROUND
                <br /> AWAITS
              </h1>
              <p>
                Join the Style Revolution!
                <br /> Experience Fashion Freedom Like Never Before!
              </p>
              <a href="#container">
                <button>
                  Explore <CgMouse />
                </button>
              </a>
            </div>
            <div className="banner2">
              <img src={boyimg} alt="ecommerce" />
            </div>
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
