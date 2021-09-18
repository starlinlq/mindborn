import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import agent from "../../api/agent";
import { Profile } from "../../store/user/userTypes";
import { Button, Wrapper } from "../../styles/global";
import { GoLocation } from "react-icons/go";
import { MdFace } from "react-icons/md";

import {
  Bio,
  Followers,
  Following,
  Name,
  Photo,
  ProfileCardContainer,
  Location,
  Span,
  EditProfile,
} from "./profilecard.styles";

import { history } from "../../App";
import { VscSettingsGear } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { toast } from "react-toastify";
import FollowData from "../followData/FollowData";

export default function ProfileCard() {
  let { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) => state.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selected, setSelected] = useState("following");
  const [displayInfo, setDisplayInfo] = useState(false);
  const followRef = useRef<HTMLButtonElement>(null);

  useEffect(
    function () {
      async function get() {
        let { profile, followers, following, followersIds } =
          await agent.user.getProfile(id);

        let found = followersIds.find((match) => match.follower_id === user.id);
        if (found) {
          setIsFollowing(true);
        }
        setProfile({ ...profile, followers, following });
      }
      get();
    },
    [id]
  );

  const handleDisplayInfo = (name: string) => {
    setSelected(name);
    setDisplayInfo(true);
  };

  const handleFollow = async () => {
    try {
      if (!isFollowing) {
        await agent.user.follow(id);
        setIsFollowing(true);
        return;
      }
      await agent.user.unFollow(id);
      setIsFollowing(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleMouseOver = () => {
    if (followRef && followRef.current && isFollowing) {
      followRef.current.innerText = "Unfollow";
    }
  };
  const handleMouseLeave = () => {
    if (followRef && followRef.current && isFollowing) {
      followRef.current.innerText = "Following";
    }
  };

  const handleClick = () => {
    history.push("/account");
  };
  return (
    <ProfileCardContainer>
      {profile && (
        <>
          {displayInfo && (
            <FollowData setDisplay={setDisplayInfo} id={id} name={selected} />
          )}
          <Wrapper width="100%" style={{ position: "relative" }}>
            {profile.userId === user.id && (
              <EditProfile onClick={handleClick}>
                <VscSettingsGear />
              </EditProfile>
            )}
            <Photo src={`${profile.photourl}`} />
          </Wrapper>

          <Name>{profile.name}</Name>
          <Wrapper width="100%" flex="flex" content="space-between">
            <Wrapper width="fit-content" style={{ textAlign: "center" }}>
              <Followers onClick={() => handleDisplayInfo("followers")}>
                {profile.followers}
              </Followers>
              <Span>Followers</Span>
            </Wrapper>
            <Wrapper width="fit-content" style={{ textAlign: "center" }}>
              <Following onClick={() => handleDisplayInfo("following")}>
                {profile.following}
              </Following>
              <Span>Following</Span>
            </Wrapper>
          </Wrapper>

          <Location>
            <Span>
              <GoLocation />{" "}
            </Span>
            {profile.location}
          </Location>
          <Bio>
            <Span>
              <MdFace />
            </Span>{" "}
            {profile.bio}
          </Bio>
          <Wrapper width="100%">
            {user.id !== id && (
              <Button
                ref={followRef}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                width="100%"
                main
                padding="6px"
                margin="0"
                onClick={handleFollow}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
            )}
          </Wrapper>
        </>
      )}
    </ProfileCardContainer>
  );
}
