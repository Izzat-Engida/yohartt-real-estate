import Image from "next/image";
import Link from "next/link";

import finishedBuilding from "@/assets/home/roots/image3.webp";

// Two clear rows: the big heading on its own, then the copy on the left and
// the real media on the right (the finished building, with the interior
// walkthrough tucked into its lower-left corner). Nothing sits on top of the
// text, and both rows move together on scroll so nothing slides into anything.
export default function Roots() {
  return (
    <section
      id="Roots"
      className="bg-navy relative z-1 min-h-screen overflow-clip max-md:hidden"
    >
      <div className="trigger relative flex min-h-screen flex-col justify-center gap-14 py-24 max-xl:gap-10 max-xl:py-20">
        <div className="roots-kicker-wrap wrapper">
          <div className="flex">
            <div className="w-1/12 max-lg:w-1/6" />
            <p className="kicker text-accent uppercase">The way of living</p>
          </div>

          <h2 className="huge text-cream-dark mt-4 text-center whitespace-nowrap uppercase max-xl:text-[15rem] max-lg:text-left max-lg:text-[12.5rem] max-lg:whitespace-normal">
            Your roots
          </h2>
        </div>

        <div className="roots-kicker-wrap wrapper grid grid-cols-12 items-center gap-x-6 max-lg:grid-cols-1 max-lg:gap-y-20">
          <div className="col-span-5 col-start-2 max-xl:col-start-1 max-lg:col-span-1">
            <p className="heading-2 text-sand max-xl:text-[3.25rem] max-lg:text-[3rem]">
              At Yohartt Tower, each residence is crafted not merely for
              living, but as a space that evolves alongside you
            </p>

            <Link
              className="mt-15 inline-block max-xl:mt-10"
              href="/#Residences"
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
            </Link>
          </div>

          <div className="relative col-span-5 col-start-8 max-xl:col-span-6 max-xl:col-start-7 max-lg:col-span-1 max-lg:col-start-1 max-lg:ml-auto max-lg:w-4/5">
            <div className="roots-image will-change-transform">
              <Image
                src={finishedBuilding}
                alt="A finished Yohart residential building with stone-look cladding and large black-framed windows"
                className="mask h-auto w-full mask-[url('/media/home/roots/mask3.svg')] mask-size-[100%] mask-center mask-no-repeat [-webkit-mask-image:url('/media/home/roots/mask3.svg')] [-webkit-mask-size:100%]"
                sizes="(max-width: 1024px) 80vw, 42vw"
              />
            </div>

            <div className="roots-image pointer-events-none absolute -bottom-14 -left-14 w-[42%] will-change-transform max-lg:-left-8">
              <div className="mask relative aspect-[629/831] w-full mask-[url('/media/home/roots/mask1.svg')] mask-size-[95%] mask-center mask-no-repeat [-webkit-mask-image:url('/media/home/roots/mask1.svg')] [-webkit-mask-size:95%]">
                <video
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label="Walkthrough of a finished Yohart apartment"
                  className="roots-video absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
