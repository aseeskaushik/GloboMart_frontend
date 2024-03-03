import { Fragment, useEffect, useState } from "react";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { productActions } from "../../store/product-slice";
import { createNewProduct } from "../../store/product-actions";

import "./NewProduct.css";

const categories = [
  "Men's Clothing",
  "Women's Clothing",
  "Footwear",
  "Accessories(bags, hats, jewelry)",
  "Computers & Laptops",
  "Smartphones & Accessories",
  "Cameras & Photography",
];

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newProductLoading, newProductSuccess } = useSelector(
    (state) => state.product
  );

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      name.replace(/[^\w\s]/gi, "") === "" ||
      description.replace(/[^\w\s]/gi, "") === "" ||
      category.replace(/[^\w\s]/gi, "") === ""
    ) {
      toast.error("Invalid entries");
      return;
    }
    const productData = {
      name: name,
      description: description,
      price: price,
      images: images,
      category: category,
      stock: stock,
    };
    dispatch(createNewProduct(productData));
  };

  const imageChangeHandler = (event) => {
    const files = Array.from(event.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prevState) => {
            return [...prevState, reader.result];
          });
          setImagesPreview((prevState) => {
            return [...prevState, reader.result];
          });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    if (newProductSuccess) {
      navigate("/admin/dashboard");
      dispatch(
        productActions.newProductReducer({
          loading: false,
          success: false,
        })
      );
      toast.success("Product Created Successfully");
    }
  }, [newProductSuccess, dispatch, navigate]);

  return (
    <Fragment>
      <MetaData title="create product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProduct-container">
          <form className="newProduct-form" onSubmit={submitHandler}>
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                required
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                value={price}
                required
                min={100}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                rows={1}
                cols={30}
                placeholder="Product Description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(event) => setCategory(event.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                required
                onChange={(event) => setStock(event.target.value)}
              />
            </div>
            <div id="newProduct-file">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={imageChangeHandler}
                multiple
              />
            </div>
            <div id="newProduct-image">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="item" />
              ))}
            </div>
            <button type="submit" disabled={newProductLoading ? true : false}>
              Create
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
