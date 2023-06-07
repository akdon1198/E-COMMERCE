import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import {Link} from "react-router-dom"
import { logoutfun } from "../redux/apiCalls";
import { cartReset } from "../redux/cartRedux";
import { useState } from "react";
import Handlecartquantity from "./Handlecartquantity";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-decoration: none;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const StyleLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const val = useSelector(state => state.cart);
  const {currentUser} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const handleclick = () =>{
    logoutfun(dispatch);
  }
  const handlecart = () => {
    dispatch(
      cartReset()
    )
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <StyleLink to = "/">
          <Logo>E COMMERCE </Logo>
          </StyleLink>
        </Center>
        <Right>
          {
            currentUser ? <MenuItem onClick={handleclick}>LOG OUT</MenuItem> :
            <>
            <StyleLink to = "/register">
            <MenuItem>REGISTER</MenuItem>
            </StyleLink>
            <StyleLink to = "/login">
            <MenuItem>SIGN IN</MenuItem>
            </StyleLink>
            </>
          }
          <StyleLink to = "/cart">
          <MenuItem onClick = {handlecart}>
              <ShoppingCartOutlined/>
              <Handlecartquantity/>
          </MenuItem>
          </StyleLink>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
