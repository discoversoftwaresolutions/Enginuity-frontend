import React from "react";

interface Props {
  property1: "menu" | "arrow-up-right" | "user" | "zap";
  size: "medium" | "big";
  className: any;
  propertyArrowUp: string;
  propertyUserSize: string;
}

export const InputIcons = ({
  property1,
  size,
  className,
  propertyArrowUp = "https://c.animaapp.com/megb0yhnHjtLMS/img/property-1-arrow-up-right--size-big.svg",
  propertyUserSize = "https://c.animaapp.com/megb0yhnHjtLMS/img/property-1-user--size-medium.svg",
}: Props): JSX.Element => {
  return (
    <img
      className={`left-0 top-0 absolute ${size === "big" ? "w-6" : "w-[18px]"} ${size === "big" ? "h-6" : "h-[18px]"} ${className}`}
      alt="Property user size"
      src={
        property1 === "zap"
          ? "https://c.animaapp.com/megb0yhnHjtLMS/img/property-1-zap--size-medium.svg"
          : property1 === "arrow-up-right"
            ? propertyArrowUp
            : property1 === "menu"
              ? "https://c.animaapp.com/megb0yhnHjtLMS/img/input-icons-5.svg"
              : propertyUserSize
      }
    />
  );
};
