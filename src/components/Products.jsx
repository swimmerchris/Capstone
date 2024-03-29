/* This component handles the display of the products 
It also handles searching, filtering and sorting using both the items in this component
and the associated SearchBar and Sidebar components. 
*/
import { useState } from "react";
import { useGetAllProductsQuery } from "../api/api";
import SearchBar from "./SearchBar";
import SideBar from "./SideBar";
import ListDetails from "./ListDetails";
import "./css/Products.css";

export default function Products() {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const [foundProduct, setFoundProduct] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchName, setSearchName] = useState("");

  if (isLoading) {
    return <div>is Loading...</div>;
  }

  // Show an error message if the fetch failed
  if (error) {
    return <div>Error Occurred</div>;
  }

  //   This function handles the sorting of the procuts based on criteria selected by user.
  function sortProductsChange(e) {
    const sort = e.target.value;
    let copyProducts = [...foundProduct];

    if (sort == 0) {
      copyProducts.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (sort == 1) {
      copyProducts.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (sort == "rating") {
      copyProducts.sort((a, b) => {
        return b.rating.rate - a.rating.rate;
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
      <div className="filter_products_container">
        <SideBar
          data={data}
          foundProduct={foundProduct?.length > 0 ? foundProduct : data}
          setFoundProduct={setFoundProduct}
          setFilterProducts={setFilterProducts}
          searchProducts={searchProducts}
          searchName={searchName}
        />
        <div className="Product-container">
          <select onChange={sortProductsChange}>
            Price:
            <option>Sort By</option>
            <option value={1}>Price High to Low</option>
            <option value={0}>Price Low to High</option>
            <option value="rating">Avg. Customer rating</option>
          </select>
          <ListDetails
            data={
              foundProduct?.length === 0 ? setFoundProduct(data) : foundProduct
            }
          />
        </div>
      </div>
    </div>
  );
}
