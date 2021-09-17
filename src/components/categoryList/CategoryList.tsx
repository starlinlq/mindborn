import { CategoryListWrapper, Item, List } from "./categoryList.styles";
import {
  GiDiscussion,
  GiLifeInTheBalance,
  GiLovers,
  GiTechnoHeart,
} from "react-icons/gi";
import { Wrapper } from "../../styles/global";
import { RiMentalHealthLine } from "react-icons/ri";
import { BiGlasses, BiWorld } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { IoMdBook } from "react-icons/io";
import { Dispatch, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CgGames } from "react-icons/cg";
import * as actionTypes from "../../store/post/actionTypes";

export default function CategoryList() {
  const [selected, setSelected] = useState("all");
  const dispatch = useDispatch<Dispatch<any>>();

  useEffect(() => {
    dispatch({ type: actionTypes.CATEGORY, payload: selected });
  }, [selected]);

  return (
    <CategoryListWrapper>
      <List>
        <Wrapper width="100%" flex="flex" style={{ padding: "5px 0" }}>
          <BiWorld style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("all")}
            selected={selected === "all" ? true : false}
          >
            All
          </Item>
        </Wrapper>
        <Wrapper width="100%" flex="flex" style={{ padding: "5px 0" }}>
          <GiDiscussion style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("discussion")}
            selected={selected === "discussion" ? true : false}
          >
            Discussion
          </Item>
        </Wrapper>
        <Wrapper width="100%" flex="flex" style={{ padding: "5px 0" }}>
          <CgGames style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("videogames")}
            selected={selected === "videogames" ? true : false}
          >
            Games
          </Item>
        </Wrapper>
        <Wrapper width="100%" flex="flex" style={{ padding: "7px 0" }}>
          <GiLifeInTheBalance style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("life")}
            selected={selected === "life" ? true : false}
          >
            Life
          </Item>
        </Wrapper>
        <Wrapper width="100%" flex="flex" style={{ padding: "7px 0" }}>
          <BiGlasses style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("opinion")}
            selected={selected === "opinion" ? true : false}
          >
            Opinion
          </Item>
        </Wrapper>
        <Wrapper width="100%" flex="flex" style={{ padding: "7px 0" }}>
          <GiTechnoHeart style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("technology")}
            selected={selected === "technology" ? true : false}
          >
            Technology
          </Item>
        </Wrapper>
        <Wrapper width="100%" flex="flex" style={{ padding: "7px 0" }}>
          <RiMentalHealthLine style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("health")}
            selected={selected === "health" ? true : false}
          >
            Health
          </Item>
        </Wrapper>
        <Wrapper width="100%" flex="flex" style={{ padding: "7px 0" }}>
          <GrUserWorker style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("workplace")}
            selected={selected === "workplace" ? true : false}
          >
            Workplace
          </Item>
        </Wrapper>
        <Wrapper width="100%" flex="flex" style={{ padding: "7px 0" }}>
          <IoMdBook style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("education")}
            selected={selected === "education" ? true : false}
          >
            Education
          </Item>
        </Wrapper>
        <Wrapper width="100%" flex="flex" style={{ padding: "7px 0" }}>
          <GiLovers style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("relationship")}
            selected={selected === "relationship" ? true : false}
          >
            Relationship
          </Item>
        </Wrapper>
        <Wrapper width="100%" flex="flex" style={{ padding: "7px 0" }}>
          <FaRegMoneyBillAlt style={{ marginRight: "5px" }} />
          <Item
            onClick={() => setSelected("income")}
            selected={selected === "income" ? true : false}
          >
            Income
          </Item>
        </Wrapper>
      </List>
    </CategoryListWrapper>
  );
}
