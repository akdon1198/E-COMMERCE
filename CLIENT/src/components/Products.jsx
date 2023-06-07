import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios"
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({cat, filters, sort}) => {
  const[products, setproducts] = useState([]);
  const[filteredproducts, setfilteredproducts] = useState([]);
  useEffect(() => {
    const getproducts = async() => {
      try{
        const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : "http://localhost:5000/api/products")
        // console.log(res.data);
        setproducts(res.data)
      }catch(err){
        console.log(err.message);
      }
    }
    getproducts();
    console.log("hello");
  }, [cat]);

  useEffect(() =>{
      cat && setfilteredproducts(
        products.filter((item) => 
          Object.entries(filters).every(([key, value]) =>
              item[key].includes(value)
          )
        )
      )
  },[products, filters])

  useEffect(() => {
    if(sort === "newest"){
      setfilteredproducts((prev) =>
      [...prev].sort((a, b) => a.createdAt - b.createdAt)
      )
    }else if(sort === "asc"){
      setfilteredproducts((prev) =>
      [...prev].sort((a, b) => a.price - b.price)
      )
    }else{
      setfilteredproducts((prev) =>
      [...prev].sort((a, b) => b.price - a.price)
      )
    }
  }, [sort])

  return (
    <Container>
      {cat ? filteredproducts.map((item) => {

        return <Product item={item} key={item.id} />
      }
      ) : products.slice(0, 8).map((item) => <Product item = {item} key = {item.id}/>)}
    </Container>
  );
};

export default Products;
