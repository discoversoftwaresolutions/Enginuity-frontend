import React from "react";
import { BadgeDefault } from "../BadgeDefault";
import { Button } from "../Button";
import { Check } from "../Check";

interface Props {
  showBadge: boolean;
  type: "highlighted" | "default";
  className: any;
  checkCheck: string;
  text: string;
  checkImg: string;
  text1: string;
  checkCheck1: string;
  text2: string;
  checkCheck2: string;
  text3: string;
  checkCheck3: string;
  text4: string;
  text5: string;
  text6: string;
  text7: string;
  text8: string;
  featuresDescriptionClassName: any;
  featuresDescriptionClassNameOverride: any;
}

export const PricingCard = ({
  showBadge = true,
  type,
  className,
  checkCheck = "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-9.svg",
  text = "Up to 5 project members",
  checkImg = "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-9.svg",
  text1 = "Unlimited tasks and projects",
  checkCheck1 = "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-9.svg",
  text2 = "2GB storage",
  checkCheck2 = "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-9.svg",
  text3 = "Integrations",
  checkCheck3 = "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-9.svg",
  text4 = "Basic support",
  text5 = "Perfect for individuals and small projects",
  text6 = "Basic",
  text7 = "$19",
  text8 = "/monthly",
  featuresDescriptionClassName,
  featuresDescriptionClassNameOverride,
}: Props): JSX.Element => {
  return (
    <div
      className={`w-[354px] flex flex-col items-start gap-[var(--spacing-spacing-xl)] pt-[var(--spacing-spacing-xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] rounded-[var(--spacing-corner-radius-xl)] relative ${type === "default" ? "border border-solid" : ""} ${type === "default" ? "border-colors-dark-250" : ""} ${type === "highlighted" ? "bg-colors-dark-1000" : "bg-colors-light-1000"} ${className}`}
    >
      <div className="w-full flex self-stretch flex-col items-start gap-4 flex-[0_0_auto] relative">
        <div
          className={`w-full flex self-stretch items-start flex-[0_0_auto] relative ${type === "default" ? "gap-6" : ""} ${type === "highlighted" ? "justify-between" : ""}`}
        >
          <div
            className={`font-body-bold-md w-fit mt-[-1.00px] tracking-[var(--body-bold-md-letter-spacing)] text-[length:var(--body-bold-md-font-size)] [font-style:var(--body-bold-md-font-style)] relative font-[number:var(--body-bold-md-font-weight)] text-center whitespace-nowrap leading-[var(--body-bold-md-line-height)] ${type === "default" ? "text-colors-dark-750" : "text-colors-light-1000"}`}
          >
            {type === "highlighted" && <>Pro</>}

            {type === "default" && <>{text6}</>}
          </div>

          {type === "highlighted" && (
            <>
              <>
                {showBadge && (
                  <BadgeDefault
                    className="!border-colors-light-750 !flex-[0_0_auto]"
                    labelClassName="!text-colors-dark-1000 !text-xs !font-semibold ![font-family:'Mulish',Helvetica]"
                    text="Most Popular"
                  />
                )}
              </>
            </>
          )}
        </div>

        <div className="w-full flex self-stretch items-center gap-3 flex-[0_0_auto] relative">
          <div
            className={`font-heading-h5 w-fit mt-[-1.00px] tracking-[var(--heading-h5-letter-spacing)] text-[length:var(--heading-h5-font-size)] [font-style:var(--heading-h5-font-style)] font-[number:var(--heading-h5-font-weight)] text-center whitespace-nowrap leading-[var(--heading-h5-line-height)] relative ${type === "highlighted" ? "text-colors-light-1000" : "text-colors-dark-1000"}`}
          >
            {type === "default" && <>{text7}</>}

            {type === "highlighted" && <>$49</>}
          </div>

          <div
            className={`font-body-bold-md w-fit tracking-[var(--body-bold-md-letter-spacing)] [font-style:var(--body-bold-md-font-style)] text-[length:var(--body-bold-md-font-size)] relative font-[number:var(--body-bold-md-font-weight)] text-center whitespace-nowrap leading-[var(--body-bold-md-line-height)] ${type === "highlighted" ? "text-colors-light-1000" : "text-colors-dark-750"}`}
          >
            {text8}
          </div>
        </div>

        <Button
          className="!self-stretch !gap-2 !w-full"
          label="Subscribe"
          showIcon={false}
          size="big"
          stateProp="default"
          type={type === "highlighted" ? "primary" : "secondary"}
        />
      </div>

      <div className="w-full flex self-stretch flex-col items-start gap-3 flex-[0_0_auto] relative">
        <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
          <Check
            check={checkCheck}
            className="!relative !left-[unset] !top-[unset]"
          />
          <p
            className={`font-body-regular-sm w-fit mt-[-1.00px] tracking-[var(--body-regular-sm-letter-spacing)] text-[length:var(--body-regular-sm-font-size)] [font-style:var(--body-regular-sm-font-style)] relative font-[number:var(--body-regular-sm-font-weight)] whitespace-nowrap leading-[var(--body-regular-sm-line-height)] ${type === "highlighted" ? "text-colors-light-1000" : "text-colors-dark-1000"}`}
          >
            {text}
          </p>
        </div>

        <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
          <Check
            check={checkImg}
            className="!relative !left-[unset] !top-[unset]"
          />
          <div
            className={`font-body-regular-sm w-fit mt-[-1.00px] tracking-[var(--body-regular-sm-letter-spacing)] text-[length:var(--body-regular-sm-font-size)] [font-style:var(--body-regular-sm-font-style)] relative font-[number:var(--body-regular-sm-font-weight)] whitespace-nowrap leading-[var(--body-regular-sm-line-height)] ${type === "highlighted" ? "text-colors-light-1000" : "text-colors-dark-1000"} ${featuresDescriptionClassNameOverride}`}
          >
            {text1}
          </div>
        </div>

        <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
          <Check
            check={checkCheck1}
            className="!relative !left-[unset] !top-[unset]"
          />
          <div
            className={`font-body-regular-sm w-fit mt-[-1.00px] tracking-[var(--body-regular-sm-letter-spacing)] text-[length:var(--body-regular-sm-font-size)] [font-style:var(--body-regular-sm-font-style)] relative font-[number:var(--body-regular-sm-font-weight)] whitespace-nowrap leading-[var(--body-regular-sm-line-height)] ${type === "highlighted" ? "text-colors-light-1000" : "text-colors-dark-1000"}`}
          >
            {text2}
          </div>
        </div>

        <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
          <Check
            check={checkCheck2}
            className="!relative !left-[unset] !top-[unset]"
          />
          <div
            className={`font-body-regular-sm w-fit mt-[-1.00px] tracking-[var(--body-regular-sm-letter-spacing)] text-[length:var(--body-regular-sm-font-size)] [font-style:var(--body-regular-sm-font-style)] relative font-[number:var(--body-regular-sm-font-weight)] whitespace-nowrap leading-[var(--body-regular-sm-line-height)] ${type === "highlighted" ? "text-colors-light-1000" : "text-colors-dark-1000"}`}
          >
            {text3}
          </div>
        </div>

        <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
          <Check
            check={checkCheck3}
            className="!relative !left-[unset] !top-[unset]"
          />
          <div
            className={`font-body-regular-sm w-fit mt-[-1.00px] tracking-[var(--body-regular-sm-letter-spacing)] text-[length:var(--body-regular-sm-font-size)] [font-style:var(--body-regular-sm-font-style)] relative font-[number:var(--body-regular-sm-font-weight)] whitespace-nowrap leading-[var(--body-regular-sm-line-height)] ${type === "highlighted" ? "text-colors-light-1000" : "text-colors-dark-1000"} ${featuresDescriptionClassName}`}
          >
            {text4}
          </div>
        </div>
      </div>

      <div
        className={`font-body-regular-xs self-stretch tracking-[var(--body-regular-xs-letter-spacing)] [font-style:var(--body-regular-xs-font-style)] text-[length:var(--body-regular-xs-font-size)] relative font-[number:var(--body-regular-xs-font-weight)] text-center leading-[var(--body-regular-xs-line-height)] ${type === "highlighted" ? "text-colors-light-500" : "text-colors-dark-750"}`}
      >
        {type === "default" && <p>{text5}</p>}

        {type === "highlighted" && (
          <p>Ideal for growing businesses and teams</p>
        )}
      </div>
    </div>
  );
};
