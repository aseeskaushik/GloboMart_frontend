import { Fragment, useState } from "react";
import "./SearchBar.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get('query') ?? '');

  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (keyword) {
      const keywordWithoutSpaces = keyword.replace(/\s/g, "");
      navigate(`/products?query=${keywordWithoutSpaces}`);
    } else {
      navigate("/products");
    }
    // setKeyword("");
  };
  
  return (
    <Fragment>
      <form className="search-box" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </Fragment>
  );
};
export default SearchBar;
