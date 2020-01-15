import React from "react";

interface Props {
  professions: Array<string>;
}

const Professions = ({ professions }: Props) => (
  <span>
    My professions:
    {professions.map((p: string, i: number) => (
      <span key={p}>
        {" "}
        {p}
        {i == professions.length - 1 ? "." : ","}
      </span>
    ))}
  </span>
);

export default Professions;
