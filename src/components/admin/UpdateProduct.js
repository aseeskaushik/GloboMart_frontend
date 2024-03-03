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
import { useNavigate, useParams } from "react-router-dom";
import { productActions } from "../../store/product-slice";
import { fetchProductDetail, updateProduct } from "../../store/product-actions";
import Loader from "../layout/loader/Loader";

// import "./NewProduct.css";

const categories = [
  "Men's Clothing",
  "Women's Clothing",
  "Footwear",
  "Accessories(bags, hats, jewelry)",
  "Computers & Laptops",
  "Smartphones & Accessories",
  "Cameras & Photography",
];

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updateLoading, isUpdated, product, productDetailLoading } =
    useSelector((state) => state.product);

  const { id } = useParams();

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
      image: images,
      category: category,
      stock: stock,
    };
    dispatch(updateProduct(productData, id));
  };

  const imageChangeHandler = (event) => {
    const files = Array.from(event.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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
    dispatch(fetchProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (Object.keys(product).length !== 0) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setOldImages(product.image);
      setImages(product.image);
      setStock(product.stock);
    }
  }, [product]);

  useEffect(() => {
    if (isUpdated) {
      navigate("/admin/products");
      dispatch(
        productActions.updateProductReducer({
          isUpdated: false,
          loading: false,
        })
      );
      toast.success("Product Updated Successfully");
    }
  }, [isUpdated, dispatch, navigate]);

  return (
    <Fragment>
      <MetaData title="create product" />
      <div className="dashboard">
        <Sidebar />
        {productDetailLoading ? (
          <Loader />
        ) : (
          <div className="newProduct-container">
            <form className="newProduct-form" onSubmit={submitHandler}>
              <h1>Update Product</h1>
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
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
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
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img key={index} src={image.url} alt="item" />
                  ))}
              </div>
              <div id="newProduct-image">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="item" />
                ))}
              </div>
              <button type="submit" disabled={updateLoading ? true : false}>
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
