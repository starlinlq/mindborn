import { EditAccountContainer } from "./edit.styles";
import { Wrapper, Button } from "../../styles/global";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import UpdatePassword from "./updatePassword";
import { useEffect, useRef, useState } from "react";
import UpdateId from "./updateId";
export default function EditAccount() {
  const { username } = useSelector((state: RootState) => state.user);
  const [selected, setSelected] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const selectedRef = useRef(selected);

  const handleSelected = (n: string) => {
    setSelected(n);
  };

  const handleClick = (e: any) => {
    if (ref.current && ref.current.contains(e.target)) {
    } else if (selectedRef.current.length !== 0) {
      setSelected("");
    }
  };

  useEffect(() => {
    selectedRef.current = selected;
    document.addEventListener("click", handleClick);

    return () => document.removeEventListener("click", handleClick);
  }, [selected]);

  return (
    <EditAccountContainer>
      <div ref={ref}>
        {selected === "updatepass" && (
          <UpdatePassword setSelected={setSelected} />
        )}
        {selected === "updateid" && <UpdateId setSelected={setSelected} />}
      </div>
      <Wrapper width="100%" flex="flex" content="space-between">
        <div>
          <h3>ID</h3>
          <p>{username}</p>
        </div>
        <Button
          main
          onClick={() => handleSelected("updateid")}
          width="100px"
          padding="10px"
          margin="0"
        >
          Change
        </Button>
      </Wrapper>
      <Wrapper
        width="100%"
        style={{ margin: "20px 0" }}
        flex="flex"
        content="space-between"
      >
        <div>
          <h3>Change password</h3>
          <p>Password must be at least 6 characters long</p>
        </div>
        <Button
          main
          onClick={() => handleSelected("updatepass")}
          width="100px"
          padding="10px"
          margin="0"
        >
          Change
        </Button>
      </Wrapper>
    </EditAccountContainer>
  );
}
