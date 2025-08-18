import React from "react";
import { InputIcons } from "../InputIcons";

interface Props {
  showIcon: boolean;
  label: string;
  state: "default";
  className: any;
}

export const Badge = ({
  showIcon = true,
  label = "Bring multiple screens from Figma",
  state,
  className,
}: Props): JSX.Element => {
  return (
    <div
      className={`inline-flex h-8 items-center justify-center gap-1 pt-[var(--spacing-corner-radius-md)] pr-[var(--spacing-corner-radius-md)] pb-[var(--spacing-corner-radius-md)] pl-[var(--spacing-corner-radius-md)] relative bg-colors-light-1000 rounded-[var(--spacing-corner-radius-xl)] border border-solid border-colors-dark-100 backdrop-blur-[2.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2.5px)_brightness(100%)] ${className}`}
    >
      {showIcon && (
        <InputIcons
          className="!mt-[-5.00px] !mb-[-5.00px] !relative !left-[unset] !top-[unset]"
          property1="user"
          propertyUserSize="https://c.animaapp.com/megb0yhnHjtLMS/img/input-icons-4.svg"
          size="medium"
        />
      )}

      <div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto] mt-[-4.00px] mb-[-4.00px]">
        <p className="relative w-fit mt-[-1.00px] font-body-regular-xs font-[number:var(--body-regular-xs-font-weight)] text-colors-dark-1000 text-[length:var(--body-regular-xs-font-size)] tracking-[var(--body-regular-xs-letter-spacing)] leading-[var(--body-regular-xs-line-height)] whitespace-nowrap [font-style:var(--body-regular-xs-font-style)]">
          {label}
        </p>
      </div>
    </div>
  );
};
