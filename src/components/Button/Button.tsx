import React from "react";
import { useReducer } from "react";
import { InputIcons } from "../InputIcons";

interface Props {
  showIcon: boolean;
  label: string;
  type: "primary" | "secondary";
  stateProp: "hover" | "default";
  size: "big";
  className: any;
  inputIconsPropertyArrowUp: string;
  divClassName: any;
}

export const Button = ({
  showIcon = true,
  label = "Button",
  type,
  stateProp,
  size,
  className,
  inputIconsPropertyArrowUp = "https://c.animaapp.com/megb0yhnHjtLMS/img/input-icons.svg",
  divClassName,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    type: type || "secondary",

    state: stateProp || "default",

    size: size || "big",
  });

  return (
    <div
      className={`w-[134px] flex items-center gap-[var(--spacing-spacing-sm)] pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-2.5 h-11 rounded-[var(--spacing-corner-radius-xl)] justify-center relative ${state.type === "secondary" ? "border border-solid" : ""} ${state.state === "default" && state.type === "secondary" ? "border-colors-dark-250" : (state.type === "secondary" && state.state === "hover") ? "border-colors-dark-500" : ""} ${state.type === "secondary" ? "bg-colors-light-1000" : (state.type === "primary" && state.state === "hover") ? "bg-colors-primary-500" : "bg-colors-primary-1000"} ${className}`}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      {showIcon && (
        <InputIcons
          className="!relative !left-[unset] !top-[unset]"
          property1="arrow-up-right"
          propertyArrowUp={inputIconsPropertyArrowUp}
          size="big"
        />
      )}

      <div
        className={`font-body-bold-sm w-fit mt-[-1.00px] tracking-[var(--body-bold-sm-letter-spacing)] text-[length:var(--body-bold-sm-font-size)] [font-style:var(--body-bold-sm-font-style)] font-[number:var(--body-bold-sm-font-weight)] leading-[var(--body-bold-sm-line-height)] whitespace-nowrap relative ${state.type === "secondary" && state.state === "hover" ? "text-colors-dark-1000" : (state.type === "primary") ? "text-colors-light-1000" : "text-colors-dark-750"} ${divClassName}`}
      >
        {label}
      </div>
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        state: "default",
      };
  }

  return state;
}
