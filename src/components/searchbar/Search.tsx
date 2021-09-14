import React from "react";
import { SearchWrapper, Input } from "./search.styles";
import { RiSearch2Line } from "react-icons/ri";

function SearchBar() {
  return (
    <SearchWrapper>
      <RiSearch2Line
        style={{ color: "grey", fontSize: "20px", marginLeft: "5px" }}
      />
      <Input placeholder="Search" />
    </SearchWrapper>
  );
}

export default SearchBar;
