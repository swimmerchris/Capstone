import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery, useGetAllProductsQuery } from "../api/api";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import ListDetails from "./ListDetails";

export default function Products() {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [foundProduct, setFoundProduct] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchName, setSearchName] = useState("");
  //   const [foundProduct, setFoundProduct] = useState(null);
  //   const [sort, setSort] = useState(true);
  //   const [products, setProducts] = useState([]);
  //   const navigate = useNavigate();
  if (isLoading) {
    return <div>is Loading...</div>;
  }

  // Show an error message if the fetch failed
  if (error) {
    return <div>Error Occurred</div>;
  }

  function sortProductsChange(e) {
    const sort = e.target.value;
    let copyProducts = [...foundProduct];
    console.log(copyProducts);

    console.log(sort);
    if (sort == 0) {
      copyProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else {
      copyProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    setFoundProduct(copyProducts);
  }

  return (
    <div className="Product-page">
      <SearchBar
        data={data}
        foundProduct={foundProduct}
        setFoundProduct={setFoundProduct}
        setSearchProducts={setSearchProducts}
        filterProducts={filterProducts}
        searchName={searchName}
        setSearchName={setSearchName}
      />
      <SideBar
        data={data}
        foundProduct={foundProduct?.length > 0 ? foundProduct : data}
        setFoundProduct={setFoundProduct}
        setFilterProducts={setFilterProducts}
        searchProducts={searchProducts}
        searchName={searchName}
      />
      <select onChange={sortProductsChange}>
        Price:
        <option>Sort By</option>
        <option value={1}>Price High to Low</option>
        <option value={0}>Price Low to High</option>
        <option>Avg. Customer rating</option>
      </select>
      <div className="Product-container">
        <ListDetails data={foundProduct?.length > 0 ? foundProduct : data} />
      </div>
    </div>
  );
}
