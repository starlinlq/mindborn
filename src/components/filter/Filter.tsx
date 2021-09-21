import { FilterWrapper, Selected, Type } from "./filter.styles";
import { FaPepperHot } from "react-icons/fa";
import { BsGem } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiDonateHeart } from "react-icons/bi";
import { RootState } from "../../store/store";
import { IoSkullOutline } from "react-icons/io5";

type Props = {
  setFilter: Function;
};
export default function Filter({ setFilter }: Props) {
  const [selected, setSelected] = useState("-likeCount");
  const { category } = useSelector((state: RootState) => state.post);

  const handleFilter = (s: string) => {
    setFilter(s);
    setSelected(s);
  };

  useEffect(() => {
    setSelected("-likeCount");
    setFilter(category);
  }, [category]);
  return (
    <FilterWrapper>
      <Selected
        onClick={() => handleFilter("-likeCount")}
        selected={selected === "-likeCount" ? true : false}
      >
        <FaPepperHot style={{ color: "red" }} />
        <Type>Hot</Type>
      </Selected>
      <Selected
        onClick={() => handleFilter("-commentCount")}
        selected={selected === "-commentCount" ? true : false}
      >
        <BiDonateHeart />
        <Type>Best</Type>
      </Selected>
      <Selected
        onClick={() => handleFilter("-createdAt")}
        selected={selected === "-createdAt" ? true : false}
      >
        <BsGem />
        <Type>Recent</Type>
      </Selected>
      <Selected
        onClick={() => handleFilter("createdAt")}
        selected={selected === "createdAt" ? true : false}
      >
        <IoSkullOutline />
        <Type>Old</Type>
      </Selected>
    </FilterWrapper>
  );
}
