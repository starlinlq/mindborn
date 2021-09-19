import React, { useState } from "react";
import { SearchWrapper, Input } from "./search.styles";
import { RiSearch2Line } from "react-icons/ri";
import { history } from "../../App";

function SearchBar() {
  const [data, setData] = useState("");

  const handleKeyDow = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      history.push(`/search?q=${data}`);
    }
  };
  return (
    <SearchWrapper>
      <RiSearch2Line
        style={{ color: "grey", fontSize: "20px", marginLeft: "5px" }}
      />
      <Input
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Search"
        onKeyDown={handleKeyDow}
      />
    </SearchWrapper>
  );
}

export default SearchBar;
