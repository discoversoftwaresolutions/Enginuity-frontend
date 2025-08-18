import React from "react";

interface Props {
  className: any;
  text: string;
  imageClassName: any;
  image: string;
  text1: string;
  text2: string;
}

export const QuoteCard = ({
  className,
  text = "New @boltdotnew + @AnimaApp Figma to Code just got released. Spoiler: it’s the best tool by far right now.",
  imageClassName,
  image = "https://c.animaapp.com/megb0yhnHjtLMS/img/image@2x.png",
  text1 = "Miguel Fernandez",
  text2 = "@MiguelFdezDev",
}: Props): JSX.Element => {
  return (
    <div
      className={`flex flex-col w-[340px] items-start gap-4 pt-[var(--spacing-spacing-xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] relative bg-colors-light-1000 rounded-[var(--spacing-corner-radius-xl)] border border-solid border-colors-dark-250 ${className}`}
    >
      <p className="relative self-stretch mt-[-1.00px] font-body-regular-sm font-[number:var(--body-regular-sm-font-weight)] text-colors-dark-1000 text-[length:var(--body-regular-sm-font-size)] tracking-[var(--body-regular-sm-letter-spacing)] leading-[var(--body-regular-sm-line-height)] [font-style:var(--body-regular-sm-font-style)]">
        {text}
      </p>

      <div className="flex items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
        <img
          className={`relative w-12 h-12 object-cover ${imageClassName}`}
          alt="Image"
          src={image}
        />

        <div className="flex flex-col items-start gap-1 relative flex-1 grow">
          <div className="flex h-6 items-center gap-1.5 relative self-stretch w-full">
            <div className="relative w-fit mt-[-1.00px] font-body-bold-sm font-[number:var(--body-bold-sm-font-weight)] text-colors-dark-1000 text-[length:var(--body-bold-sm-font-size)] tracking-[var(--body-bold-sm-letter-spacing)] leading-[var(--body-bold-sm-line-height)] whitespace-nowrap [font-style:var(--body-bold-sm-font-style)]">
              {text1}
            </div>
          </div>

          <div className="relative self-stretch font-body-regular-xs font-[number:var(--body-regular-xs-font-weight)] text-colors-dark-500 text-[length:var(--body-regular-xs-font-size)] tracking-[var(--body-regular-xs-letter-spacing)] leading-[var(--body-regular-xs-line-height)] [font-style:var(--body-regular-xs-font-style)]">
            {text2}
          </div>
        </div>
      </div>
    </div>
  );
};
