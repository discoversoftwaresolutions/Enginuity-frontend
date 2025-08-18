import React from "react";

interface Props {
  className: any;
  check: string;
}

export const Check = ({
  className,
  check = "https://c.animaapp.com/megb0yhnHjtLMS/img/check.svg",
}: Props): JSX.Element => {
  return (
    <img
      className={`absolute w-5 h-5 top-0 left-0 ${className}`}
      alt="Check"
      src={check}
    />
  );
};
