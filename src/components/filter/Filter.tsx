import { FilterWrapper, Selected, Type } from "./filter.styles";
import { FaPepperHot } from "react-icons/fa";
import { BsGem } from "react-icons/bs";
import { ImShift } from "react-icons/im";
import { Dispatch, useState } from "react";
import { useDispatch } from "react-redux";

export default function Filter() {
  const [selected, setSelected] = useState("hot");
  const dipatch = useDispatch<Dispatch<any>>();

  const handleFilter = (s: string) => {
    setSelected(s);
  };
  return (
    <FilterWrapper>
      <Selected
        onClick={() => handleFilter("hot")}
        selected={selected === "hot" ? true : false}
      >
        <FaPepperHot style={{ color: "red" }} />
        <Type>Hot</Type>
      </Selected>
      <Selected
        onClick={() => handleFilter("new")}
        selected={selected === "new" ? true : false}
      >
        <BsGem />
        <Type>New</Type>
      </Selected>
      <Selected
        onClick={() => handleFilter("top")}
        selected={selected === "top" ? true : false}
      >
        <ImShift />
        <Type>Top</Type>
      </Selected>
    </FilterWrapper>
  );
}
