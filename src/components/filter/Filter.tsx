import { FilterWrapper, Selected, Type } from "./filter.styles";
import { FaPepperHot } from "react-icons/fa";
import { BsGem } from "react-icons/bs";
import { ImShift } from "react-icons/im";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BiDonateHeart } from "react-icons/bi";
import { RootState } from "../../store/store";

type Props = {
  setFilter: Function;
};
export default function Filter({ setFilter }: Props) {
  const [selected, setSelected] = useState("-commentCount");
  const { category } = useSelector((state: RootState) => state.post);

  const handleFilter = (s: string) => {
    setFilter(s);
    setSelected(s);
  };

  useEffect(() => {
    setSelected("-commentCount");
    setFilter("-commentCount");
  }, [category]);
  return (
    <FilterWrapper>
      <Selected
        onClick={() => handleFilter("-commentCount")}
        selected={selected === "-commentCount" ? true : false}
      >
        <FaPepperHot style={{ color: "red" }} />
        <Type>Hot</Type>
      </Selected>
      <Selected
        onClick={() => handleFilter("-likeCount")}
        selected={selected === "-likeCount" ? true : false}
      >
        <BiDonateHeart />
        <Type>Best</Type>
      </Selected>
      <Selected
        onClick={() => handleFilter("-createdAt")}
        selected={selected === "-createdAt" ? true : false}
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
