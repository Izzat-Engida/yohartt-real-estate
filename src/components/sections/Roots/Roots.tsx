import Image from "next/image";

import image2 from "@/assets/home/roots/image2.webp";
import image3 from "@/assets/home/roots/image3.webp";

export default function Roots() {
  return (
    <section
      id="Roots"
      className="bg-navy relative z-1 min-h-screen overflow-clip max-md:hidden"
    >
      <div className="trigger relative flex min-h-screen flex-col justify-center pt-40 pb-40 max-xl:py-20">
        <div className="roots-kicker-wrap wrapper flex">
          <div className="w-1/12 max-lg:w-1/6" />

          <div className="w-1/6 max-lg:w-1/3">
            <p className="kicker text-accent uppercase">
              The way of living
            </p>
          </div>
        </div>

       
        <div className="roots-image absolute top-[15%] right-0 z-2 w-[min(48vw,720px)] max-w-none will-change-transform max-xl:right-0 max-xl:w-143 max-lg:top-[16%] max-lg:right-0 max-lg:w-125">
          <Image
            src={image3}
            alt="Roots"
            className="mask h-auto w-full mask-[url('/home/roots/mask3.svg')] mask-size-[100%] mask-center mask-no-repeat [-webkit-mask-image:url('/home/roots/mask3.svg')] [-webkit-mask-size:100%]"
            sizes="(max-width: 1024px) 500px, (max-width: 1280px) 572px, 920px"
          />
        </div>

        <div className="roots-kicker-wrap wrapper relative z-[10] mt-15 flex justify-center">
          <h2 className="huge text-cream-dark text-center whitespace-nowrap uppercase max-xl:text-[15rem] max-lg:text-left max-lg:text-[12.5rem] max-lg:whitespace-normal">
            Your roots
          </h2>
        </div>

       
        <div className="roots-image absolute top-[23%] right-[4%] z-3 w-[min(38vw,575px)] max-w-none will-change-transform max-xl:right-[3%] max-xl:left-auto max-xl:w-120 max-lg:top-[24%] max-lg:right-4 max-lg:w-100">
          <Image
            src={image2}
            alt="Roots"
            className="mask h-auto w-full -translate-y-1/2 mask-[url('/home/roots/mask2.svg')] mask-size-[100%] mask-center mask-no-repeat [-webkit-mask-image:url('/home/roots/mask2.svg')] [-webkit-mask-size:100%]"
            sizes="(max-width: 1024px) 400px, (max-width: 1280px) 480px, 720px"
          />
        </div>

      
        <div className="roots-image absolute top-[35%] right-[9%] z-4 w-[min(31vw,470px)] max-w-none will-change-transform max-xl:w-120 max-xl:right-[8%] max-xl:left-auto max-lg:top-[42%] max-lg:w-95 max-lg:right-[7%] max-lg:left-auto">
          <div className="mask h-auto w-full mask-[url('/home/roots/mask1.svg')] mask-size-[95%] mask-center mask-no-repeat object-cover [-webkit-mask-image:url('/home/roots/mask1.svg')] [-webkit-mask-size:95%]">
            <video
              muted
              loop
              playsInline
              preload="none"
              className="h-full w-full translate-y-1/10 scale-130 object-cover"
            />
          </div>
        </div>

        <div className="wrapper roots-kicker-wrap relative z-[10] mt-20 flex max-lg:mt-50">
          <div className="w-1/12 max-lg:hidden" />

          <div className="w-5/12 max-xl:w-6/12 max-lg:w-full">
            <p className="heading-2 text-sand max-xl:text-[3.25rem] max-lg:text-[3rem]">
              In Belgrade Arbor, each residence is crafted not merely for
              living, but as a space that evolves alongside you
            </p>

            <a
              className="mt-15 inline-block max-xl:mt-10"
              href="/en/residences"
            >
              <button
                data-slot="button"
                data-variant="darkOutline"
                data-size="default"
                className="inline-flex menu cursor-pointer border shrink-0 min-w-55 items-center justify-center gap-2 uppercase whitespace-nowrap [&_svg]:transition-all transition-all outline-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none bg-transparent border-green hover:bg-green/40 [&_svg]:text-green text-cream active:[&_svg]:text-cream-dark active:border-cream-dark active:bg-green h-14 px-5 py-5 has-[>svg]:px-5 rounded-full max-md:h-12 max-md:py-3 group relative"
                type="button"
              >
                <span className="relative z-1 block w-full overflow-hidden">
                  <span className="flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:-translate-y-full has-[>svg]:justify-between">
                    Explore residences

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 25 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-2.25 w-6"
                    >
                      <path
                        d="M0.5 5L24.5 5"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19.5 0.5L24.5 5L19.5 9.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                      />
                    </svg>
                  </span>

                  <span className="absolute top-full left-0 flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:top-0 has-[>svg]:justify-between">
                    Explore residences

                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 25 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-2.25 w-6"
                    >
                      <path
                        d="M0.5 5L24.5 5"
                        stroke="currentColor"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19.5 0.5L24.5 5L19.5 9.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="bevel"
                      />
                    </svg>
                  </span>
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
