import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../breakpoints";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { Badge } from "../../components/Badge";
import { BrandsLogos } from "../../components/BrandsLogos";
import { Button } from "../../components/Button";
import { Check } from "../../components/Check";
import { FeatureCard } from "../../components/FeatureCard";
import { InputIcons } from "../../components/InputIcons";
import { PricingCard } from "../../components/PricingCard";
import { QuoteCard } from "../../components/QuoteCard";
import { SocialMediaIcons } from "../../components/SocialMediaIcons";
import { Toggle } from "../../components/Toggle";
import { SplineBackground } from "../../components/SplineBackground";

export const ScalehubStartupLp = (): JSX.Element => {
  const screenWidth = useWindowWidth();
  const [animationStage, setAnimationStage] = useState(0);
  const [isYearlyPricing, setIsYearlyPricing] = useState(false);

  // Intersection observers for different sections
  const { elementRef: logoSectionRef, isIntersecting: logoSectionVisible } = useIntersectionObserver({ threshold: 0.3 });
  const { elementRef: featuresSectionRef, isIntersecting: featuresSectionVisible } = useIntersectionObserver({ threshold: 0.2 });
  const { elementRef: pricingSectionRef, isIntersecting: pricingSectionVisible } = useIntersectionObserver({ threshold: 0.2 });
  const { elementRef: testimonialsSectionRef, isIntersecting: testimonialsSectionVisible } = useIntersectionObserver({ threshold: 0.2 });
  const { elementRef: ctaSectionRef, isIntersecting: ctaSectionVisible } = useIntersectionObserver({ threshold: 0.3 });

  // Calculate discounted prices (20% off for yearly)
  const basicPrice = isYearlyPricing ? Math.round(19 * 0.8) : 19;
  const proPrice = isYearlyPricing ? Math.round(49 * 0.8) : 49;
  const enterprisePrice = isYearlyPricing ? Math.round(89 * 0.8) : 89;
  const pricingPeriod = isYearlyPricing ? "/yearly" : "/monthly";

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setAnimationStage(1), 100),  // Logo
      setTimeout(() => setAnimationStage(2), 300),  // Navigation
      setTimeout(() => setAnimationStage(3), 600),  // Hero content
      setTimeout(() => setAnimationStage(4), 1000), // Hero image
    ];

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center bg-[#f7f7f7] relative ${screenWidth < 920 ? "min-w-[375px]" : (screenWidth >= 920) ? "min-w-[920px]" : ""}`}
      data-model-id="2031:523"
    >
      <header className="w-full flex self-stretch items-center flex-[0_0_auto] pt-[var(--spacing-spacing-lg)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-lg)] pl-[var(--spacing-spacing-xl)] justify-between bg-transparent relative">
        <img
          className={`w-[130.95px] aspect-[6.55] object-cover h-5 relative transition-all duration-700 ease-out ${
            animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          alt="Scalehub"
          src={
            screenWidth >= 920
              ? "https://c.animaapp.com/megb0yhnHjtLMS/img/scalehub-2-1.svg"
              : screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/scalehub-2.svg"
                : undefined
          }
        />

        {screenWidth < 920 && (
          <InputIcons
            className="!relative !left-[unset] !top-[unset]"
            property1="menu"
            size="big"
          />
        )}

        {screenWidth >= 920 && (
          <div className={`inline-flex gap-3 rounded-[20px] items-center relative flex-[0_0_auto] transition-all duration-700 ease-out ${
            animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <button className="all-[unset] box-border inline-flex items-center justify-center gap-[var(--spacing-spacing-xs)] px-4 py-0 relative flex-[0_0_auto] rounded-lg">
              <button className="all-[unset] box-border relative w-fit mt-[-1.00px] font-body-bold-xs font-[number:var(--body-bold-xs-font-weight)] text-colors-dark-750 text-[length:var(--body-bold-xs-font-size)] tracking-[var(--body-bold-xs-letter-spacing)] leading-[var(--body-bold-xs-line-height)] whitespace-nowrap [font-style:var(--body-bold-xs-font-style)]">
                Home
              </button>
            </button>

            <button className="all-[unset] box-border flex w-[89px] items-center justify-center gap-[var(--spacing-spacing-xs)] px-4 py-0 relative rounded-lg">
              <button className="all-[unset] box-border relative w-fit mt-[-1.00px] font-body-bold-xs font-[number:var(--body-bold-xs-font-weight)] text-colors-dark-750 text-[length:var(--body-bold-xs-font-size)] tracking-[var(--body-bold-xs-letter-spacing)] leading-[var(--body-bold-xs-line-height)] whitespace-nowrap [font-style:var(--body-bold-xs-font-style)]">
                Features
              </button>
            </button>

            <button className="all-[unset] box-border flex w-[77px] items-center justify-center gap-[var(--spacing-spacing-xs)] px-4 py-0 relative rounded-lg">
              <button className="all-[unset] box-border relative w-fit mt-[-1.00px] font-body-bold-xs font-[number:var(--body-bold-xs-font-weight)] text-colors-dark-750 text-[length:var(--body-bold-xs-font-size)] tracking-[var(--body-bold-xs-letter-spacing)] leading-[var(--body-bold-xs-line-height)] whitespace-nowrap [font-style:var(--body-bold-xs-font-style)]">
                Pricing
              </button>
            </button>

            <button className="all-[unset] box-border flex w-[147px] h-8 items-center justify-center gap-[var(--spacing-spacing-xs)] pr-[var(--spacing-spacing-lg)] pl-[var(--spacing-spacing-lg)] py-2.5 relative bg-colors-primary-1000 rounded-[var(--spacing-corner-radius-xl)]">
              <button className="all-[unset] box-border relative w-fit mt-[-3.00px] mb-[-1.00px] font-body-bold-xs font-[number:var(--body-bold-xs-font-weight)] text-colors-light-1000 text-[length:var(--body-bold-xs-font-size)] tracking-[var(--body-bold-xs-letter-spacing)] leading-[var(--body-bold-xs-line-height)] whitespace-nowrap [font-style:var(--body-bold-xs-font-style)]">
                Get Started
              </button>
            </button>
          </div>
        )}
      </header>

      <div
        className={`w-full flex flex-col items-center flex-[0_0_auto] relative overflow-hidden ${screenWidth >= 920 ? "self-stretch" : ""} ${screenWidth < 920 ? "max-w-[1080px]" : ""} ${screenWidth < 920 ? "gap-[var(--spacing-spacing-3xl)]" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-4xl)]" : ""} ${screenWidth < 920 ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-3xl)] pl-[var(--spacing-spacing-xl)]" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-4xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-4xl)] pl-[var(--spacing-spacing-xl)]" : ""}`}
      >
        {/* Spline Background Animation */}
        <SplineBackground className="opacity-60 pointer-events-none" />
        {screenWidth < 920 && (
          <>
            <div className="flex flex-col items-center gap-[var(--spacing-spacing-xxl)] flex-[0_0_auto] relative self-stretch w-full z-20">
              <div className="inline-flex h-8 items-center justify-center gap-1 pt-[var(--spacing-corner-radius-md)] pr-[var(--spacing-corner-radius-md)] pl-[var(--spacing-corner-radius-md)] pb-3 relative bg-over-spline rounded-[var(--spacing-corner-radius-xl)] border border-solid border-colors-dark-100">
                <div className="relative w-[18px] h-[18px] mt-[-5.00px] mb-[-5.00px]">
                  <img
                    className="absolute w-[15px] h-4 top-px left-0.5 animate-pulse-glow"
                    alt="Icon"
                    src="https://c.animaapp.com/megb0yhnHjtLMS/img/icon.svg"
                  />
                </div>

                <div className="inline-flex items-center gap-1.5 relative flex-[0_0_auto] mt-[-4.00px] mb-[-4.00px]">
                  <div className="relative w-fit mt-[-1.00px] font-body-regular-xs font-[number:var(--body-regular-xs-font-weight)] text-colors-dark-1000 text-[length:var(--body-regular-xs-font-size)] tracking-[var(--body-regular-xs-letter-spacing)] leading-[var(--body-regular-xs-line-height)] whitespace-nowrap [font-style:var(--body-regular-xs-font-style)]">
                    Start Building with AI
                  </div>
                </div>
              </div>

              <div className="flex flex-col max-w-[860px] items-start gap-[var(--spacing-spacing-md)] relative w-full flex-[0_0_auto]">
                <p className="relative self-stretch mt-[-1.00px] font-heading-h6 font-[number:var(--heading-h6-font-weight)] text-colors-dark-1000 text-[length:var(--heading-h6-font-size)] text-center tracking-[var(--heading-h6-letter-spacing)] leading-[var(--heading-h6-line-height)] [font-style:var(--heading-h6-font-style)]">
                  Your Work. Supercharged by AI.
                </p>

                <p className="font-body-regular-md font-[number:var(--body-regular-md-font-weight)] text-colors-dark-1000 text-[length:var(--body-regular-md-font-size)] text-center tracking-[var(--body-regular-md-letter-spacing)] leading-[var(--body-regular-md-line-height)] relative self-stretch [font-style:var(--body-regular-md-font-style)]">
                  Automate tasks, get instant insights, and scale your
                  productivity — all in one powerful SaaS platform.
                </p>
              </div>

              <div className="flex flex-col items-start justify-center gap-4 px-6 py-0 relative self-stretch w-full flex-[0_0_auto]">
                <Button
                  className="!self-stretch !w-full"
                  label="Get Started"
                  showIcon={false}
                  size="big"
                  stateProp="default"
                  type="primary"
                />
                <Button
                  className="!self-stretch !w-full"
                  inputIconsPropertyArrowUp="https://c.animaapp.com/megb0yhnHjtLMS/img/input-icons-6.svg"
                  label="See Demo"
                  size="big"
                  stateProp="default"
                  type="secondary"
                />
              </div>
            </div>

            <img
              className={`aspect-[1.78] object-cover relative self-stretch w-full transition-all duration-1000 ease-out ${
                animationStage >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
              }`}
              alt="Hero image"
              src="https://c.animaapp.com/megb0yhnHjtLMS/img/hero-image_1.png"
            />
          </>
        )}

        {screenWidth >= 920 && (
          <div className="max-w-[1080px] items-start flex flex-col gap-[var(--spacing-spacing-4xl)] relative w-full flex-[0_0_auto] z-20">
            <div className={`flex flex-col gap-[var(--spacing-spacing-xxl)] self-stretch w-full flex-[0_0_auto] items-center relative transition-all duration-1000 ease-out ${
              animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="border-colors-dark-100 inline-flex h-8 items-center justify-center gap-1 pt-[var(--spacing-corner-radius-md)] pr-[var(--spacing-corner-radius-md)] pb-[var(--spacing-corner-radius-md)] pl-[var(--spacing-corner-radius-md)] relative bg-over-spline rounded-[var(--spacing-corner-radius-xl)] border border-solid">
                <div className="relative w-[18px] h-[18px] mt-[-5.00px] mb-[-5.00px]">
                  <img
                    className="absolute w-[15px] h-4 top-px left-0.5 animate-pulse-glow"
                    alt="Icon"
                    src="https://c.animaapp.com/megb0yhnHjtLMS/img/icon-2.svg"
                  />
                </div>

                <div className="mt-[-4.00px] mb-[-4.00px] inline-flex items-center gap-1.5 relative flex-[0_0_auto]">
                  <div className="font-body-regular-xs font-[number:var(--body-regular-xs-font-weight)] text-[length:var(--body-regular-xs-font-size)] leading-[var(--body-regular-xs-line-height)] whitespace-nowrap relative w-fit mt-[-1.00px] text-colors-dark-1000 tracking-[var(--body-regular-xs-letter-spacing)] [font-style:var(--body-regular-xs-font-style)]">
                    Start Building with AI
                  </div>
                </div>
              </div>

              <div className="flex flex-col max-w-[860px] items-start gap-3 relative w-full flex-[0_0_auto]">
                <p className="self-stretch mt-[-1.00px] font-[number:var(--heading-h4-font-weight)] text-colors-dark-1000 text-[length:var(--heading-h4-font-size)] tracking-[var(--heading-h4-letter-spacing)] leading-[var(--heading-h4-line-height)] relative font-heading-h4 text-center [font-style:var(--heading-h4-font-style)]">
                  Your Work. Supercharged by AI.
                </p>

                <p className="relative self-stretch font-body-regular-lg font-[number:var(--body-regular-lg-font-weight)] text-colors-dark-1000 text-[length:var(--body-regular-lg-font-size)] text-center tracking-[var(--body-regular-lg-letter-spacing)] leading-[var(--body-regular-lg-line-height)] [font-style:var(--body-regular-lg-font-style)]">
                  Automate tasks, get instant insights, and scale your
                  productivity — all in one powerful SaaS platform.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex gap-4 flex-[0_0_auto] items-center relative">
                  <Button
                    divClassName="!mr-[-1.50px] !ml-[-1.50px]"
                    label="Get Started"
                    showIcon={false}
                    size="big"
                    stateProp="default"
                    type="primary"
                  />
                  <button className="all-[unset] box-border flex w-[158px] h-11 items-center justify-center gap-[var(--spacing-spacing-sm)] pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-2.5 relative bg-colors-light-1000 rounded-[var(--spacing-corner-radius-xl)] border border-solid border-colors-dark-250">
                    <div className="relative w-6 h-6">
                      <img
                        className="absolute w-3 h-3 top-1.5 left-1.5"
                        alt="Icon"
                        src="https://c.animaapp.com/megb0yhnHjtLMS/img/icon-3.svg"
                      />
                    </div>

                    <button className="all-[unset] box-border relative w-fit mt-[-1.00px] font-body-bold-sm font-[number:var(--body-bold-sm-font-weight)] text-colors-dark-750 text-[length:var(--body-bold-sm-font-size)] tracking-[var(--body-bold-sm-letter-spacing)] leading-[var(--body-bold-sm-line-height)] whitespace-nowrap [font-style:var(--body-bold-sm-font-style)]">
                      See Demo
                    </button>
                  </button>
                </div>
              </div>
            </div>

            <img
              className={`relative self-stretch w-full aspect-[1.78] object-cover transition-all duration-1000 ease-out ${
                animationStage >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
              }`}
              alt="Hero image"
              src="https://c.animaapp.com/megb0yhnHjtLMS/img/hero-image_1.png"
            />
          </div>
        )}
      </div>

      <div
        ref={logoSectionRef}
        className={`w-full flex flex-col items-center max-w-[1080px] flex-[0_0_auto] relative transition-all duration-1000 ease-out ${logoSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${screenWidth < 920 ? "gap-8" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-xxl)]" : ""} ${screenWidth >= 920 ? "pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-0" : ""}`}
      >
        <div className="w-full flex self-stretch flex-col items-start gap-3 flex-[0_0_auto] relative">
          <div className="[font-family:'Open_Sans',Helvetica] self-stretch mt-[-1.00px] tracking-[0] text-base text-colors-dark-500 relative font-normal text-center leading-[normal]">
            Trusted by Leading Startups
          </div>
        </div>

        <div className="w-full overflow-hidden relative">
          <div className="flex items-center gap-12 animate-scroll">
            {/* First set of logos */}
            <BrandsLogos
              brand="bolt"
              className="bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-9.svg)] !w-[55.9px] flex-shrink-0"
            />
            <BrandsLogos
              brand="open-AI"
              className="bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-10.svg)] !w-[97.52px] flex-shrink-0"
            />
            <BrandsLogos
              brand="anthropic"
              className="!h-[15.86px] bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-11.svg)] !w-[141.24px] flex-shrink-0"
            />
            <BrandsLogos
              brand="replit"
              className="!h-[23.81px] bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-12.svg)] !w-[100.72px] flex-shrink-0"
            />
            <BrandsLogos
              brand="anima-logo"
              className="!w-[81.6px] flex-shrink-0"
              vector="https://c.animaapp.com/megb0yhnHjtLMS/img/vector-13.svg"
            />
            
            {/* Duplicate set for seamless loop */}
            <BrandsLogos
              brand="bolt"
              className="bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-9.svg)] !w-[55.9px] flex-shrink-0"
            />
            <BrandsLogos
              brand="open-AI"
              className="bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-10.svg)] !w-[97.52px] flex-shrink-0"
            />
            <BrandsLogos
              brand="anthropic"
              className="!h-[15.86px] bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-11.svg)] !w-[141.24px] flex-shrink-0"
            />
            <BrandsLogos
              brand="replit"
              className="!h-[23.81px] bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-12.svg)] !w-[100.72px] flex-shrink-0"
            />
            <BrandsLogos
              brand="anima-logo"
              className="!w-[81.6px] flex-shrink-0"
              vector="https://c.animaapp.com/megb0yhnHjtLMS/img/vector-13.svg"
            />

            {/* Third set for extra smoothness */}
            <BrandsLogos
              brand="bolt"
              className="bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-9.svg)] !w-[55.9px] flex-shrink-0"
            />
            <BrandsLogos
              brand="open-AI"
              className="bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-10.svg)] !w-[97.52px] flex-shrink-0"
            />
            <BrandsLogos
              brand="anthropic"
              className="!h-[15.86px] bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-11.svg)] !w-[141.24px] flex-shrink-0"
            />
            <BrandsLogos
              brand="replit"
              className="!h-[23.81px] bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/vector-12.svg)] !w-[100.72px] flex-shrink-0"
            />
            <BrandsLogos
              brand="anima-logo"
              className="!w-[81.6px] flex-shrink-0"
              vector="https://c.animaapp.com/megb0yhnHjtLMS/img/vector-13.svg"
            />
          </div>
        </div>
      </div>

      <div
        ref={featuresSectionRef}
        className={`w-full flex flex-col items-center max-w-[1080px] gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative transition-all duration-1000 ease-out ${featuresSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${screenWidth < 920 ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-3xl)] pl-[var(--spacing-spacing-xl)]" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-4xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-4xl)] pl-[var(--spacing-spacing-xl)]" : ""}`}
      >
        <div
          className={`w-full flex self-stretch flex-col items-center flex-[0_0_auto] relative ${screenWidth < 920 ? "gap-[var(--spacing-spacing-xxl)]" : (screenWidth >= 920) ? "gap-[var(--spacing-spacing-xl)]" : ""}`}
        >
          <Badge
            label="More Control, More Power"
            showIcon={false}
            state="default"
          />
          <div className="w-full flex flex-col items-start max-w-[860px] gap-3 flex-[0_0_auto] relative">
            <p
              className={`self-stretch mt-[-1.00px] text-colors-dark-1000 relative text-center ${screenWidth < 920 ? "font-heading-h7" : (screenWidth >= 920) ? "font-heading-h5" : ""} ${screenWidth < 920 ? "tracking-[var(--heading-h7-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--heading-h5-letter-spacing)]" : ""} ${screenWidth < 920 ? "text-[length:var(--heading-h7-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--heading-h5-font-size)]" : ""} ${screenWidth < 920 ? "[font-style:var(--heading-h7-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--heading-h5-font-style)]" : ""} ${screenWidth < 920 ? "font-[number:var(--heading-h7-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--heading-h5-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--heading-h7-line-height)]" : (screenWidth >= 920) ? "leading-[var(--heading-h5-line-height)]" : ""}`}
            >
              Powerful Features, Built for Results
            </p>

            <p className="font-body-regular-md self-stretch tracking-[var(--body-regular-md-letter-spacing)] [font-style:var(--body-regular-md-font-style)] text-[length:var(--body-regular-md-font-size)] text-colors-dark-1000 relative font-[number:var(--body-regular-md-font-weight)] text-center leading-[var(--body-regular-md-line-height)]">
              Discover how this startup helps your team work faster and smarter
              with intelligent tools designed to save time and boost
              productivity.
            </p>
          </div>
        </div>

        <div
          className={`w-full flex flex-wrap self-stretch items-start flex-[0_0_auto] justify-center relative ${screenWidth < 920 ? "gap-[var(--spacing-spacing-md)]" : (screenWidth >= 920) ? "gap-[12px_12px]" : ""}`}
        >
          <FeatureCard
            className={`!flex-1 !grow !min-w-[280px] !w-[unset] transition-all duration-700 ease-out ${featuresSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            imagePlaceholder={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/image-placeholder-1.png"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/image-placeholder-3.png"
                  : undefined
            }
            imagePlaceholderClassName={
              screenWidth < 920
                ? "!mr-[-8.50px] !ml-[-8.50px] animate-float-up"
                : screenWidth >= 920
                  ? "!mr-[unset] !ml-[unset] animate-float-up"
                  : undefined
            }
            text="Smart Automation"
            text1="Automate repetitive tasks and workflows so you can focus on what really matters."
          />
          <FeatureCard
            className={`!flex-1 !grow !min-w-[280px] !w-[unset] transition-all duration-700 ease-out delay-200 ${featuresSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            imagePlaceholder={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/image-placeholder-2.png"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/image-placeholder-4.png"
                  : undefined
            }
            imagePlaceholderClassName={
              screenWidth < 920
                ? "!mr-[-8.50px] !ml-[-8.50px] animate-float-down"
                : screenWidth >= 920
                  ? "!mr-[unset] !ml-[unset] animate-float-down"
                  : undefined
            }
            text="Instant Insights"
            text1="Turn data into clear, actionable insights with real-time reporting at your fingertips."
          />
        </div>
      </div>

      <div
        ref={pricingSectionRef}
        className={`w-full flex flex-col items-center max-w-[1080px] gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative transition-all duration-1000 ease-out ${pricingSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${screenWidth < 920 ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-3xl)] pl-[var(--spacing-spacing-xl)]" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-3xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-4xl)] pl-[var(--spacing-spacing-xl)]" : ""}`}
      >
        <div className="w-full flex self-stretch flex-col items-center gap-[var(--spacing-spacing-xl)] flex-[0_0_auto] relative">
          <Badge
            className={
              screenWidth < 920
                ? "!pr-[var(--spacing-corner-radius-md)] !pb-[var(--spacing-corner-radius-md)] !pl-[var(--spacing-corner-radius-md)] !pt-3"
                : screenWidth >= 920
                  ? "!pt-[var(--spacing-corner-radius-md)] !pr-[var(--spacing-corner-radius-md)] !pl-[var(--spacing-corner-radius-md)] !pb-3"
                  : undefined
            }
            label="Boost your productivity"
            showIcon={false}
            state="default"
          />
          <div
            className={`text-colors-dark-1000 relative text-center ${screenWidth < 920 ? "font-heading-h7" : (screenWidth >= 920) ? "font-heading-h5" : ""} ${screenWidth < 920 ? "tracking-[var(--heading-h7-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--heading-h5-letter-spacing)]" : ""} ${screenWidth < 920 ? "[font-style:var(--heading-h7-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--heading-h5-font-style)]" : ""} ${screenWidth < 920 ? "text-[length:var(--heading-h7-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--heading-h5-font-size)]" : ""} ${screenWidth < 920 ? "font-[number:var(--heading-h7-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--heading-h5-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--heading-h7-line-height)]" : (screenWidth >= 920) ? "leading-[var(--heading-h5-line-height)]" : ""}`}
          >
            Simple &amp; Transparent Pricing
          </div>

          <div className="w-full flex self-stretch items-center gap-3 flex-[0_0_auto] justify-center relative">
            <div
              className={`w-fit mt-[-1.00px] text-colors-dark-1000 relative text-center ${screenWidth < 920 ? "[font-family:'Open_Sans',Helvetica]" : (screenWidth >= 920) ? "font-body-bold-md" : ""} ${screenWidth < 920 ? "tracking-[0]" : (screenWidth >= 920) ? "tracking-[var(--body-bold-md-letter-spacing)]" : ""} ${screenWidth < 920 ? "text-lg" : (screenWidth >= 920) ? "text-[length:var(--body-bold-md-font-size)]" : ""} ${screenWidth >= 920 ? "[font-style:var(--body-bold-md-font-style)]" : ""} ${screenWidth < 920 ? "font-semibold" : (screenWidth >= 920) ? "font-[number:var(--body-bold-md-font-weight)]" : ""} ${screenWidth >= 920 ? "whitespace-nowrap" : ""} ${screenWidth < 920 ? "leading-[normal]" : (screenWidth >= 920) ? "leading-[var(--body-bold-md-line-height)]" : ""}`}
            >
              Monthly
            </div>

            <Toggle
              className={
                screenWidth < 920
                  ? "!rounded-2xl !w-[42.35px]"
                  : screenWidth >= 920
                    ? "!w-[42.35px]"
                    : undefined
              }
              stateProp={isYearlyPricing ? "on" : "off"}
              onClick={() => setIsYearlyPricing(!isYearlyPricing)}
            />
            <div
              className={`w-fit mt-[-1.00px] text-colors-dark-1000 relative text-center ${screenWidth < 920 ? "[font-family:'Open_Sans',Helvetica]" : (screenWidth >= 920) ? "font-body-bold-md" : ""} ${screenWidth < 920 ? "tracking-[0]" : (screenWidth >= 920) ? "tracking-[var(--body-bold-md-letter-spacing)]" : ""} ${screenWidth < 920 ? "text-lg" : (screenWidth >= 920) ? "text-[length:var(--body-bold-md-font-size)]" : ""} ${screenWidth >= 920 ? "[font-style:var(--body-bold-md-font-style)]" : ""} ${screenWidth < 920 ? "font-semibold" : (screenWidth >= 920) ? "font-[number:var(--body-bold-md-font-weight)]" : ""} ${screenWidth >= 920 ? "whitespace-nowrap" : ""} ${screenWidth < 920 ? "leading-[normal]" : (screenWidth >= 920) ? "leading-[var(--body-bold-md-line-height)]" : ""}`}
            >
              Yearly
            </div>
          </div>
        </div>

        <div className="w-full flex flex-wrap self-stretch items-start gap-[12px_12px] flex-[0_0_auto] relative">
          <PricingCard
            className={`transition-all duration-700 ease-out ${pricingSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${screenWidth < 920 ? "!flex-1 !grow !min-w-[280px] !w-[unset]" : screenWidth >= 920 ? "!min-w-[280px] !flex-1 !grow !w-[unset]" : undefined}`}
            checkCheck={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-29.svg"
                  : undefined
            }
            checkCheck1={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-29.svg"
                  : undefined
            }
            checkCheck2={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-29.svg"
                  : undefined
            }
            checkCheck3={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-29.svg"
                  : undefined
            }
            checkImg={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-29.svg"
                  : undefined
            }
            featuresDescriptionClassName={
              screenWidth >= 920 ? "!mr-[-1.33px]" : undefined
            }
            text="1 user"
            text1="Basic features"
            text2="Email support"
            text3="Secure cloud storage"
            text4="Access to community forum"
            text5="Perfect for individuals getting started."
            text6={screenWidth >= 920 ? "Basic" : undefined}
            text7={screenWidth >= 920 ? `$${basicPrice}` : undefined}
            text8={screenWidth >= 920 ? pricingPeriod : undefined}
            type="default"
          />
          <div className={`flex min-w-[280px] flex-col items-start grow gap-[var(--spacing-spacing-xl)] flex-1 pt-[var(--spacing-spacing-xl)] pr-[var(--spacing-spacing-xl)] pb-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] rounded-[var(--spacing-corner-radius-xl)] bg-colors-dark-1000 relative transition-all duration-700 ease-out delay-200 ${pricingSectionVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
            <div className="w-full flex self-stretch flex-col items-start gap-4 flex-[0_0_auto] relative">
              <div className="w-full flex self-stretch items-start flex-[0_0_auto] justify-between relative">
                <div className="font-body-bold-md w-fit mt-[-1.00px] tracking-[var(--body-bold-md-letter-spacing)] text-[length:var(--body-bold-md-font-size)] [font-style:var(--body-bold-md-font-style)] text-colors-light-1000 relative font-[number:var(--body-bold-md-font-weight)] text-center whitespace-nowrap leading-[var(--body-bold-md-line-height)]">
                  Pro
                </div>

                <div className="border border-solid border-colors-light-500 inline-flex items-center gap-1 flex-[0_0_auto] pt-[var(--spacing-corner-radius-md)] pr-[var(--spacing-corner-radius-md)] pb-[var(--spacing-corner-radius-md)] pl-[var(--spacing-corner-radius-md)] h-8 [-webkit-backdrop-filter:blur(2.5px)_brightness(100%)] rounded-[var(--spacing-corner-radius-xl)] justify-center bg-colors-light-1000 backdrop-blur-[2.5px] backdrop-brightness-[100%] relative">
                  <div className="w-[18px] mt-[-5.00px] h-[18px] mb-[-5.00px] relative">
                    <img
                      className={`w-[15px] left-0.5 top-px absolute ${screenWidth < 920 ? "h-[17px]" : (screenWidth >= 920) ? "h-4" : ""}`}
                      alt="Icon"
                      src={
                        screenWidth < 920
                          ? "https://c.animaapp.com/megb0yhnHjtLMS/img/icon-1.svg"
                          : screenWidth >= 920
                            ? "https://c.animaapp.com/megb0yhnHjtLMS/img/icon-4.svg"
                            : undefined
                      }
                    />
                  </div>

                  <div className="inline-flex mt-[-3.50px] items-center gap-1.5 flex-[0_0_auto] mb-[-3.50px] relative">
                    <div className="[font-family:'Mulish',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-xs text-colors-dark-1000 font-semibold leading-[normal] relative">
                      Most Popular
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-3 flex-[0_0_auto] relative">
              <div className="font-heading-h5 w-fit mt-[-1.00px] tracking-[var(--heading-h5-letter-spacing)] text-[length:var(--heading-h5-font-size)] [font-style:var(--heading-h5-font-style)] text-colors-light-1000 relative font-[number:var(--heading-h5-font-weight)] text-center whitespace-nowrap leading-[var(--heading-h5-line-height)]">
                ${proPrice}
              </div>

              <div className="font-body-bold-md w-fit tracking-[var(--body-bold-md-letter-spacing)] [font-style:var(--body-bold-md-font-style)] text-[length:var(--body-bold-md-font-size)] text-colors-light-1000 relative font-[number:var(--body-bold-md-font-weight)] text-center whitespace-nowrap leading-[var(--body-bold-md-line-height)]">
                {pricingPeriod.replace('/', '/')}
              </div>
              </div>

              <Button
                className="!self-stretch !gap-2 !w-full"
                label="Subscribe"
                showIcon={false}
                size="big"
                stateProp="default"
                type="primary"
              />
            </div>

            <div className="w-full flex self-stretch flex-col items-start gap-3 flex-[0_0_auto] relative">
              <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
                <Check
                  check={
                    screenWidth < 920
                      ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                      : screenWidth >= 920
                        ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-34.svg"
                        : undefined
                  }
                  className="!relative !left-[unset] !top-[unset]"
                />
                <div className="font-body-regular-sm w-fit mt-[-1.00px] tracking-[var(--body-regular-sm-letter-spacing)] text-[length:var(--body-regular-sm-font-size)] [font-style:var(--body-regular-sm-font-style)] text-colors-light-1000 relative font-[number:var(--body-regular-sm-font-weight)] whitespace-nowrap leading-[var(--body-regular-sm-line-height)]">
                  Up to 10 users
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
                <Check
                  check={
                    screenWidth < 920
                      ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                      : screenWidth >= 920
                        ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-34.svg"
                        : undefined
                  }
                  className="!relative !left-[unset] !top-[unset]"
                />
                <div className="font-body-regular-sm w-fit mt-[-1.00px] tracking-[var(--body-regular-sm-letter-spacing)] text-[length:var(--body-regular-sm-font-size)] [font-style:var(--body-regular-sm-font-style)] text-colors-light-1000 relative font-[number:var(--body-regular-sm-font-weight)] whitespace-nowrap leading-[var(--body-regular-sm-line-height)]">
                  Advanced automations
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
                <Check
                  check={
                    screenWidth < 920
                      ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                      : screenWidth >= 920
                        ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-34.svg"
                        : undefined
                  }
                  className="!relative !left-[unset] !top-[unset]"
                />
                <div className="font-body-regular-sm w-fit mt-[-1.00px] tracking-[var(--body-regular-sm-letter-spacing)] text-[length:var(--body-regular-sm-font-size)] [font-style:var(--body-regular-sm-font-style)] text-colors-light-1000 relative font-[number:var(--body-regular-sm-font-weight)] whitespace-nowrap leading-[var(--body-regular-sm-line-height)]">
                  Priority support
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
                <Check
                  check={
                    screenWidth < 920
                      ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                      : screenWidth >= 920
                        ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-34.svg"
                        : undefined
                  }
                  className="!relative !left-[unset] !top-[unset]"
                />
                <div
                  className={`font-body-regular-sm w-fit mt-[-1.00px] tracking-[var(--body-regular-sm-letter-spacing)] text-[length:var(--body-regular-sm-font-size)] [font-style:var(--body-regular-sm-font-style)] text-colors-light-1000 relative font-[number:var(--body-regular-sm-font-weight)] whitespace-nowrap leading-[var(--body-regular-sm-line-height)] ${screenWidth >= 920 ? "mr-[-15.33px]" : ""}`}
                >
                  Integration with popular tools
                </div>
              </div>

              <div className="w-full flex self-stretch items-center gap-2 flex-[0_0_auto] relative">
                <Check
                  check={
                    screenWidth < 920
                      ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                      : screenWidth >= 920
                        ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-34.svg"
                        : undefined
                  }
                  className="!relative !left-[unset] !top-[unset]"
                />
                <div className="font-body-regular-sm w-fit mt-[-1.00px] tracking-[var(--body-regular-sm-letter-spacing)] text-[length:var(--body-regular-sm-font-size)] [font-style:var(--body-regular-sm-font-style)] text-colors-light-1000 relative font-[number:var(--body-regular-sm-font-weight)] whitespace-nowrap leading-[var(--body-regular-sm-line-height)]">
                  Customizable workflows
                </div>
              </div>
            </div>

            <p className="font-body-regular-xs self-stretch tracking-[var(--body-regular-xs-letter-spacing)] [font-style:var(--body-regular-xs-font-style)] text-[length:var(--body-regular-xs-font-size)] text-colors-light-500 relative font-[number:var(--body-regular-xs-font-weight)] text-center leading-[var(--body-regular-xs-line-height)]">
              Ideal for For growing teams.
            </p>
          </div>

          <PricingCard
            className={`transition-all duration-700 ease-out delay-400 ${pricingSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${screenWidth < 920 ? "!flex-1 !grow !min-w-[280px] !w-[unset]" : screenWidth >= 920 ? "!min-w-[280px] !flex-1 !grow !w-[unset]" : undefined}`}
            checkCheck={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-39.svg"
                  : undefined
            }
            checkCheck1={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-39.svg"
                  : undefined
            }
            checkCheck2={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-39.svg"
                  : undefined
            }
            checkCheck3={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-39.svg"
                  : undefined
            }
            checkImg={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-24.svg"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/feature-check-39.svg"
                  : undefined
            }
            featuresDescriptionClassName={
              screenWidth >= 920 ? "!mr-[-30.33px]" : undefined
            }
            featuresDescriptionClassNameOverride={
              screenWidth >= 920 ? "!mr-[-1.33px]" : undefined
            }
            text="Unlimited users"
            text1="Dedicated success manager"
            text2="Custom integrations"
            text3="SLA &amp; uptime guarantee"
            text4="Premium onboarding &amp; training"
            text5="Right choice for large organizations."
            text6="Enterprise"
            text7={`$${enterprisePrice}`}
            text8={pricingPeriod}
            type="default"
          />
        </div>
      </div>

      <div
        ref={testimonialsSectionRef}
        className={`w-full flex flex-col items-center flex-[0_0_auto] relative transition-all duration-1000 ease-out ${testimonialsSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${screenWidth < 920 ? "self-stretch" : ""} ${screenWidth >= 920 ? "max-w-[1080px]" : ""} ${screenWidth < 920 ? "gap-[var(--spacing-spacing-3xl)]" : (screenWidth >= 920) ? "gap-[42px]" : ""} ${screenWidth < 920 ? "pt-[var(--spacing-spacing-3xl)] pb-[var(--spacing-spacing-3xl)] px-0" : (screenWidth >= 920) ? "pt-[var(--spacing-spacing-3xl)] pb-[var(--spacing-spacing-4xl)] px-0" : ""}`}
      >
        <div
          className={`w-full flex flex-col items-center gap-[var(--spacing-spacing-xl)] flex-[0_0_auto] pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-0 relative ${screenWidth < 920 ? "self-stretch" : ""} ${screenWidth >= 920 ? "max-w-[1080px]" : ""}`}
        >
          <Badge
            className={
              screenWidth < 920
                ? "!pt-[var(--spacing-corner-radius-md)] !pr-[var(--spacing-corner-radius-md)] !pl-[var(--spacing-corner-radius-md)] !pb-3"
                : screenWidth >= 920
                  ? "!pr-[var(--spacing-corner-radius-md)] !pb-[var(--spacing-corner-radius-md)] !pl-[var(--spacing-corner-radius-md)] !pt-3"
                  : undefined
            }
            label="Feedback"
            showIcon={false}
            state="default"
          />
          <div className="w-full flex flex-col items-start max-w-[860px] gap-3 flex-[0_0_auto] relative">
            <div className="w-full flex self-stretch flex-col items-start gap-3 flex-[0_0_auto] relative">
              <p
                className={`self-stretch mt-[-1.00px] text-colors-dark-1000 relative text-center ${screenWidth < 920 ? "font-heading-h7" : (screenWidth >= 920) ? "font-heading-h5" : ""} ${screenWidth < 920 ? "tracking-[var(--heading-h7-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--heading-h5-letter-spacing)]" : ""} ${screenWidth < 920 ? "text-[length:var(--heading-h7-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--heading-h5-font-size)]" : ""} ${screenWidth < 920 ? "[font-style:var(--heading-h7-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--heading-h5-font-style)]" : ""} ${screenWidth < 920 ? "font-[number:var(--heading-h7-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--heading-h5-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--heading-h7-line-height)]" : (screenWidth >= 920) ? "leading-[var(--heading-h5-line-height)]" : ""}`}
              >
                Empower Your Workflow with AI
              </p>
            </div>

            <p className="font-body-regular-md self-stretch tracking-[var(--body-regular-md-letter-spacing)] [font-style:var(--body-regular-md-font-style)] text-[length:var(--body-regular-md-font-size)] text-colors-dark-1000 relative font-[number:var(--body-regular-md-font-weight)] text-center leading-[var(--body-regular-md-line-height)]">
              Discover what our customers are saying.
            </p>
          </div>
        </div>

        <div className="w-full overflow-hidden relative">
          <div className="flex items-start gap-6 animate-slide-quotes">
            {/* First set of quotes */}
            <QuoteCard
              className="flex-shrink-0"
              image="https://c.animaapp.com/megb0yhnHjtLMS/img/image-8@2x.png"
              text="Scalehub keeps our remote team perfectly aligned, focused, and on track—without the clutter of endless tools or meetings."
              text1="Carlos Ramirez"
              text2="@CarlosR1"
            />
            <QuoteCard
              className="flex-shrink-0"
              image="https://c.animaapp.com/megb0yhnHjtLMS/img/image-8@2x.png"
              text="With Scalehub, we finally replaced spreadsheets and confusion with clarity, structure, and a real sense of momentum."
              text1="Luis Martinez"
              text2="@MartinezMartinez"
            />
            <QuoteCard
              className="flex-shrink-0"
              image="https://c.animaapp.com/megb0yhnHjtLMS/img/image-8@2x.png"
              text="This tool helped us scale operations fast, stay lean, and keep everyone rowing in the same direction without friction."
              text1="Andres Gonzalez"
              text2="@And1"
            />
            <QuoteCard
              className="flex-shrink-0"
              image="https://c.animaapp.com/megb0yhnHjtLMS/img/image-10@2x.png"
              text="Scalehub makes it easy to manage tasks, priorities, and goals across teams, all in one intuitive and powerful space."
              text1="Ava Kim"
              text2="@AvaKim"
            />
            <QuoteCard
              className="flex-shrink-0"
              image="https://c.animaapp.com/megb0yhnHjtLMS/img/image-10@2x.png"
              text="Just tried the new features in @boltdotnew + @AnimaApp! The speed of converting designs to code is impressive."
              text1="Jordan Smith"
              text2="@JordanCode"
            />
            
            {/* Duplicate set for seamless loop */}
            <QuoteCard
              className="flex-shrink-0"
              image="https://c.animaapp.com/megb0yhnHjtLMS/img/image-8@2x.png"
              text="Scalehub keeps our remote team perfectly aligned, focused, and on track—without the clutter of endless tools or meetings."
              text1="Carlos Ramirez"
              text2="@CarlosR1"
            />
            <QuoteCard
              className="flex-shrink-0"
              image="https://c.animaapp.com/megb0yhnHjtLMS/img/image-8@2x.png"
              text="With Scalehub, we finally replaced spreadsheets and confusion with clarity, structure, and a real sense of momentum."
              text1="Luis Martinez"
              text2="@MartinezMartinez"
            />
            <QuoteCard
              className="flex-shrink-0"
              image="https://c.animaapp.com/megb0yhnHjtLMS/img/image-8@2x.png"
              text="This tool helped us scale operations fast, stay lean, and keep everyone rowing in the same direction without friction."
              text1="Andres Gonzalez"
              text2="@And1"
            />
            <QuoteCard
              className="flex-shrink-0"
              image="https://c.animaapp.com/megb0yhnHjtLMS/img/image-10@2x.png"
              text="Scalehub makes it easy to manage tasks, priorities, and goals across teams, all in one intuitive and powerful space."
              text1="Ava Kim"
              text2="@AvaKim"
            />
            <QuoteCard
              className="flex-shrink-0"
              image="https://c.animaapp.com/megb0yhnHjtLMS/img/image-10@2x.png"
              text="Just tried the new features in @boltdotnew + @AnimaApp! The speed of converting designs to code is impressive."
              text1="Jordan Smith"
              text2="@JordanCode"
            />
          </div>
        </div>
      </div>

      <div
        ref={ctaSectionRef}
        className={`bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(21,128,255,1)_100%)] w-full flex self-stretch flex-col items-center gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative transition-all duration-1000 ease-out ${ctaSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${screenWidth < 920 ? "pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-[120px]" : (screenWidth >= 920) ? "pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-[180px]" : ""}`}
      >
        <div className="w-full flex flex-col items-center max-w-[1080px] gap-[var(--spacing-spacing-xxl)] flex-[0_0_auto] pr-[var(--spacing-spacing-xl)] pl-[var(--spacing-spacing-xl)] py-0 relative">
          <img
            className={`-left-[276px] aspect-[1] object-cover absolute ${screenWidth >= 920 ? "w-[586px]" : (screenWidth < 920) ? "w-[297px]" : ""} ${screenWidth >= 920 ? "top-[-304px]" : (screenWidth < 920) ? "top-[-188px]" : ""} ${screenWidth >= 920 ? "h-[736px]" : (screenWidth < 920) ? "h-[377px]" : ""} animate-float-rotate`}
            alt="Shape placeholder"
            src={
              screenWidth >= 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/shape-placeholder-left-1.png"
                : screenWidth < 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/shape-placeholder-left.png"
                  : undefined
            }
          />

          <img
            className={`aspect-[1] object-cover absolute ${screenWidth < 920 ? "w-[297px]" : (screenWidth >= 920) ? "w-[493px]" : ""} ${screenWidth < 920 ? "right-0" : (screenWidth >= 920) ? "right-[-300px]" : ""} ${screenWidth < 920 ? "top-[61px]" : (screenWidth >= 920) ? "top-[-124px]" : ""} ${screenWidth < 920 ? "h-[309px]" : (screenWidth >= 920) ? "h-[512px]" : ""} animate-float-rotate`}
            alt="Shape placeholder"
            src={
              screenWidth < 920
                ? "https://c.animaapp.com/megb0yhnHjtLMS/img/shape-placeholder-right.png"
                : screenWidth >= 920
                  ? "https://c.animaapp.com/megb0yhnHjtLMS/img/shape-placeholder-right-1.png"
                  : undefined
            }
          />

          <div className="w-full flex flex-col items-start max-w-[860px] gap-3 flex-[0_0_auto] relative">
            <div
              className={`self-stretch mt-[-1.00px] text-colors-dark-1000 text-center relative ${screenWidth < 920 ? "font-heading-h6" : (screenWidth >= 920) ? "font-heading-h4" : ""} ${screenWidth < 920 ? "tracking-[var(--heading-h6-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--heading-h4-letter-spacing)]" : ""} ${screenWidth < 920 ? "text-[length:var(--heading-h6-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--heading-h4-font-size)]" : ""} ${screenWidth < 920 ? "[font-style:var(--heading-h6-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--heading-h4-font-style)]" : ""} ${screenWidth < 920 ? "font-[number:var(--heading-h6-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--heading-h4-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--heading-h6-line-height)]" : (screenWidth >= 920) ? "leading-[var(--heading-h4-line-height)]" : ""}`}
            >
              Automate. Move Faster
            </div>

            <p
              className={`self-stretch text-colors-dark-1000 relative text-center ${screenWidth < 920 ? "font-body-regular-md" : (screenWidth >= 920) ? "font-body-regular-lg" : ""} ${screenWidth < 920 ? "tracking-[var(--body-regular-md-letter-spacing)]" : (screenWidth >= 920) ? "tracking-[var(--body-regular-lg-letter-spacing)]" : ""} ${screenWidth < 920 ? "[font-style:var(--body-regular-md-font-style)]" : (screenWidth >= 920) ? "[font-style:var(--body-regular-lg-font-style)]" : ""} ${screenWidth < 920 ? "text-[length:var(--body-regular-md-font-size)]" : (screenWidth >= 920) ? "text-[length:var(--body-regular-lg-font-size)]" : ""} ${screenWidth < 920 ? "font-[number:var(--body-regular-md-font-weight)]" : (screenWidth >= 920) ? "font-[number:var(--body-regular-lg-font-weight)]" : ""} ${screenWidth < 920 ? "leading-[var(--body-regular-md-line-height)]" : (screenWidth >= 920) ? "leading-[var(--body-regular-lg-line-height)]" : ""}`}
            >
              Start your 7-day free trial. No credit card required.
            </p>
          </div>

          {screenWidth < 920 && (
            <Button
              className="!self-stretch !w-full"
              label="Get Started"
              showIcon={false}
              size="big"
              stateProp="default"
              type="secondary"
            />
          )}

          {screenWidth >= 920 && (
            <div className="flex flex-col items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <Button
                divClassName="!mr-[-1.50px] !ml-[-1.50px]"
                label="Get Started"
                showIcon={false}
                size="big"
                stateProp="default"
                type="secondary"
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={`w-full flex self-stretch items-start flex-[0_0_auto] bg-colors-dark-1000 relative ${screenWidth >= 920 ? "flex-wrap" : ""} ${screenWidth < 920 ? "flex-col" : ""} ${screenWidth < 920 ? "gap-[512px]" : (screenWidth >= 920) ? "gap-[32px_462px]" : ""} ${screenWidth < 920 ? "px-6 py-10" : (screenWidth >= 920) ? "p-[42px]" : ""} ${screenWidth >= 920 ? "justify-center" : ""}`}
      >
        <div
          className={`flex items-start max-w-[1080px] relative ${screenWidth < 920 ? "w-full" : ""} ${screenWidth < 920 ? "flex-col" : ""} ${screenWidth >= 920 ? "grow" : ""} ${screenWidth < 920 ? "gap-[var(--spacing-spacing-xxl)]" : ""} ${screenWidth < 920 ? "flex-[0_0_auto]" : (screenWidth >= 920) ? "flex-1" : ""} ${screenWidth >= 920 ? "justify-between" : ""}`}
        >
          <div className="inline-flex flex-col items-start gap-[42px] flex-[0_0_auto] relative">
            <div className="inline-flex flex-col items-start gap-5 flex-[0_0_auto] relative">
              <div className="inline-flex items-center gap-2.5 flex-[0_0_auto] p-2 rounded-lg bg-colors-light-50 relative">
                <img
                  className="w-6 h-6 relative"
                  alt="Vector"
                  src={
                    screenWidth < 920
                      ? "https://c.animaapp.com/megb0yhnHjtLMS/img/vector-8.svg"
                      : screenWidth >= 920
                        ? "https://c.animaapp.com/megb0yhnHjtLMS/img/vector-14.svg"
                        : undefined
                  }
                />
              </div>

              <div className="[font-family:'DM_Sans',Helvetica] w-60 tracking-[0] text-xl text-colors-light-1000 font-semibold leading-[normal] relative">
                ScaleHub
              </div>

              <p className="[font-family:'Open_Sans',Helvetica] w-60 tracking-[0] text-sm text-colors-light-500 font-normal leading-[normal] relative">
                Effortlessly turn your ideas into a fully functional,
                responsive, no-code SaaS website.
              </p>
            </div>

            <div className="inline-flex items-start gap-4 flex-[0_0_auto] relative">
              <SocialMediaIcons
                brand="instagram"
                className={
                  screenWidth < 920
                    ? "bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/logo.svg)] !relative !bg-[100%_100%] !left-[unset] !w-[17.99px] !top-[unset]"
                    : screenWidth >= 920
                      ? "bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/logo-4.svg)] !relative !bg-[100%_100%] !left-[unset] !w-[17.99px] !top-[unset]"
                      : undefined
                }
                color="monochrome"
                size="medium"
              />
              <SocialMediaIcons
                brand="linked-in"
                className={
                  screenWidth < 920
                    ? "bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/logo-1.svg)] !relative !bg-[100%_100%] !left-[unset] !top-[unset]"
                    : screenWidth >= 920
                      ? "bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/logo-5.svg)] !relative !bg-[100%_100%] !left-[unset] !top-[unset]"
                      : undefined
                }
                color="monochrome"
                size="medium"
              />
              <SocialMediaIcons
                brand="github"
                className={
                  screenWidth < 920
                    ? "!h-[17.7px] bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/logo-2.svg)] !relative !bg-[100%_100%] !left-[unset] !top-[unset]"
                    : screenWidth >= 920
                      ? "!h-[17.7px] bg-[url(https://c.animaapp.com/megb0yhnHjtLMS/img/logo-6.svg)] !relative !bg-[100%_100%] !left-[unset] !top-[unset]"
                      : undefined
                }
                color="monochrome"
                size="medium"
              />
              <div className="w-[18px] h-[18px] relative">
                <img
                  className="w-4 left-px top-px h-[15px] absolute"
                  alt="Logo"
                  src={
                    screenWidth < 920
                      ? "https://c.animaapp.com/megb0yhnHjtLMS/img/logo-3.svg"
                      : screenWidth >= 920
                        ? "https://c.animaapp.com/megb0yhnHjtLMS/img/logo-7.svg"
                        : undefined
                  }
                />
              </div>
            </div>
          </div>

          <div
            className={`inline-flex items-start gap-[var(--spacing-spacing-3xl)] flex-[0_0_auto] relative ${screenWidth < 920 ? "flex-col" : ""}`}
          >
            <div className="inline-flex flex-col items-start gap-5 flex-[0_0_auto] relative">
              <div className="[font-family:'Open_Sans',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-sm text-colors-light-1000 font-bold leading-[normal] relative">
                Product
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Features
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Integrations
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Updates
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                FAQ
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Pricing
              </div>
            </div>

            <div className="inline-flex flex-col items-start gap-5 flex-[0_0_auto] relative">
              <div className="[font-family:'Open_Sans',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-sm text-colors-light-1000 font-bold leading-[normal] relative">
                Company
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                About
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Blog
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Careers
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Manifesto
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Contact
              </div>
            </div>

            <div className="inline-flex flex-col items-start gap-5 flex-[0_0_auto] relative">
              <div className="[font-family:'Open_Sans',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-sm text-colors-light-1000 font-bold leading-[normal] relative">
                Resources
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Examples
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Community
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Guides
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Docs
              </div>
            </div>

            <div className="inline-flex flex-col items-start gap-5 flex-[0_0_auto] relative">
              <div className="[font-family:'Open_Sans',Helvetica] w-fit mt-[-1.00px] tracking-[0] text-sm text-colors-light-1000 font-bold leading-[normal] relative">
                Legal
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Privacy
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Terms
              </div>

              <div className="[font-family:'Open_Sans',Helvetica] w-fit tracking-[0] text-sm text-colors-light-250 font-normal leading-[normal] relative">
                Security
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
