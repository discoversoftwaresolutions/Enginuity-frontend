import React from "react";
import { useReducer } from "react";

interface Props {
  stateProp: "off" | "on";
  className: any;
  onClick?: () => void;
}

export const Toggle = ({ stateProp, className, onClick }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "off",
  });

  return (
    <div
      className={`w-[42px] flex items-center p-[2.82px] rounded-[var(--spacing-corner-radius-lg)] relative ${state.state === "on" ? "justify-end" : ""} ${state.state === "on" ? "bg-colors-primary-1000" : "bg-colors-dark-250"} ${className}`}
      onClick={() => {
        dispatch("click");
        onClick?.();
      }}
    >
      <div className="w-[18.35px] h-[18.35px] rounded-[16.94px] bg-colors-light-1000 relative" />
    </div>
  );
};

function reducer(state: any, action: any) {
  if (state.state === "off") {
    switch (action) {
      case "click":
        return {
          state: "on",
        };
    }
  }

  if (state.state === "on") {
    switch (action) {
      case "click":
        return {
          state: "off",
        };
    }
  }

  return state;
}
