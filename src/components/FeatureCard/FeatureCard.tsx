import React from "react";

interface Props {
  className: any;
  imagePlaceholderClassName: any;
  imagePlaceholder: string;
  text: string;
  text1: string;
}

export const FeatureCard = ({
  className,
  imagePlaceholderClassName,
  imagePlaceholder = "https://c.animaapp.com/megb0yhnHjtLMS/img/image-placeholder@2x.png",
  text = "Integration Ecosystem",
  text1 = "Automate tasks, generate insights, and assist your team with a powerful AI agent designed to adapt to your needs.",
}: Props): JSX.Element => {
  return (
    <div
      className={`flex flex-col w-80 items-center gap-6 pt-[var(--spacing-spacing-xl)] pr-[var(--spacing-spacing-xxl)] pb-[var(--spacing-spacing-xxl)] pl-[var(--spacing-spacing-xxl)] relative bg-colors-light-1000 rounded-[var(--spacing-corner-radius-xl)] border border-solid border-colors-dark-250 ${className}`}
    >
      <img
        className={`relative w-[280px] h-[280px] ml-[-12.00px] mr-[-12.00px] aspect-[1] object-cover ${imagePlaceholderClassName}`}
        alt="Image placeholder"
        src={imagePlaceholder}
      />

      <div className="flex flex-col items-center gap-3 relative self-stretch w-full flex-[0_0_auto]">
        <div className="mt-[-1.00px] font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-[length:var(--heading-h6-font-size)] tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] relative self-stretch text-colors-dark-1000 text-center [font-style:var(--heading-h6-font-style)]">
          {text}
        </div>

        <p className="font-body-regular-md font-[number:var(--body-regular-md-font-weight)] text-[length:var(--body-regular-md-font-size)] tracking-[var(--body-regular-md-letter-spacing)] leading-[var(--body-regular-md-line-height)] relative self-stretch text-colors-dark-1000 text-center [font-style:var(--body-regular-md-font-style)]">
          {text1}
        </p>
      </div>
    </div>
  );
};
