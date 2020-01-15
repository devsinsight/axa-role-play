import React from "react";

interface Props {
  friends: Array<string>;
}

const Friends = ({ friends }: Props) => (
  <span>
    My friends:
    {friends.map((f: string, i: number) => (
      <span key={f}>
        {" "}
        {f}
        {i == friends.length - 1 ? "." : ","}
      </span>
    ))}
  </span>
);

export default Friends;
