import Image from "next/image";
import image from "@/assets/home/installment/image.webp";
import imageMobile from "@/assets/home/installment/image-t.webp";
export default function Installment() {
  return (
    <section id="Installment">
      <div className="installment-trigger trigger relative flex min-h-screen items-stretch overflow-clip max-md:min-h-auto max-md:flex-col">
        <div className="installment-reveal-image absolute top-0 left-0 z-0 h-full w-[55vw] max-xl:w-1/2 max-lg:w-full max-md:relative max-md:h-auto max-md:w-full">
          <div className="relative h-full w-full max-md:h-[34rem]">
            <div className="reveal-image-zoom relative h-full w-full overflow-hidden">
              <Image
                src={image}
                alt="Installment plan"
                loading="lazy"
                decoding="async"
                className="installment-parallax absolute top-1/2 left-0 h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover max-lg:hidden max-md:relative max-md:h-[calc(100%+10rem)] max-md:translate-y-0"
              />
              <Image
                src={imageMobile}
                alt="Installment plan"
                loading="lazy"
                decoding="async"
                className="installment-parallax absolute top-1/2 left-0 hidden h-[calc(100%+20rem)] w-full -translate-y-1/2 object-cover max-lg:block max-md:relative max-md:-top-80 max-md:translate-y-40"
              />
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute top-0 right-0 h-full w-[45vw] bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] max-xl:w-1/2 max-lg:hidden" />
        <div className="installment-reveal-content relative z-1 flex w-full justify-end max-lg:px-10 max-md:hidden">
          <div className="wrapper flex justify-end py-20 max-xl:py-15 max-lg:px-0 max-lg:py-15">
            <div className="flex w-5/12 flex-col max-xl:w-1/2 max-lg:mt-120 max-lg:w-full max-lg:rounded-2xl max-lg:bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] max-lg:px-8 max-lg:py-8">
              <div className="flex h-full flex-col justify-between gap-16 pl-10 max-xl:pl-17 max-lg:relative max-lg:pl-0 max-md:gap-4 ">
                <div className="max-lg:flex max-lg:gap-15 max-md:flex-col max-md:gap-3">
                  <p className="heading-2 text-cream-dark mb-15 max-md:mb-0">
                    Installment plan
                  </p>
                  <ul className="divide-cream-dark/40 divide-y">
                    <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                      <p className="heading-2 text-accent translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                        20%
                      </p>
                      <p className="detail text-sand">Pre-contract</p>
                    </li>
                    <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                      <p className="heading-2 text-accent translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                        20%
                      </p>
                      <p className="detail text-sand">Zero level</p>
                    </li>
                    <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                      <p className="heading-2 text-accent translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                        20%
                      </p>
                      <p className="detail text-sand">Structure completed</p>
                    </li>
                    <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                      <p className="heading-2 text-accent translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                        30%
                      </p>
                      <p className="detail text-sand">Building 80% complete</p>
                    </li>
                    <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                      <p className="heading-2 text-accent translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                        10%
                      </p>
                      <p className="detail text-sand">Technical acceptance</p>
                    </li>
                  </ul>
                </div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href=""
                  className="mt-auto max-lg:absolute max-lg:bottom-0 max-lg:left-0 max-md:static max-md:w-full"
                >
                  <button
                    data-slot="button"
                    data-variant="darkFill"
                    data-size="default"
                    className="inline-flex menu cursor-pointer border shrink-0 min-w-55 items-center justify-center gap-2 uppercase whitespace-nowrap [&amp;_svg]:transition-all transition-all outline-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&amp;_svg]:pointer-events-none border-cream-dark bg-cream-dark text-pine-green [&amp;_svg]:text-green hover:bg-cream hover:border-cream
                                                                 active:bg-golden active:[&amp;_svg]:text-cream-dark h-14 px-5 py-5 has-[&gt;svg]:px-5 rounded-full max-md:h-12 max-md:py-3 max-md:w-full group relative"
                  >
                    <span className="relative z-1 block w-full overflow-hidden">
                      <span className="flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:-translate-y-full has-[&gt;svg]:justify-between">
                        Building permit{" "}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                        >
                          <path
                            d="M19.5428 27.0002H18.1445V21.407H19.5428C20.5725 21.407 21.4072 22.2417 21.4072 23.2714V25.1358C21.4072 26.1655 20.5725 27.0002 19.5428 27.0002Z"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M24.2031 21.407V27.0002"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M24.2031 21.407H26.9997"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M26.0675 24.2034H24.2031"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12.082 27.0002V21.407"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M13.9464 21.407H12.082V24.2036H13.9464C14.7187 24.2036 15.3447 23.5776 15.3447 22.8053C15.3447 22.033 14.7187 21.407 13.9464 21.407Z"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M13.3906 12.4578V18.051"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M11.5234 16.1865L13.3878 18.0509L15.2523 16.1865"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M21.7812 18.0507V10.593"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M16.1864 5H6.86441C5.83474 5 5 5.83474 5 6.86441V25.1356C5 26.1653 5.83474 27 6.86441 27H8.72882"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M21.7807 10.5932H18.0519C17.0222 10.5932 16.1875 9.75848 16.1875 8.72882V5L21.7807 10.5932Z"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                      <span className="absolute top-full left-0 flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:top-0 has-[&gt;svg]:justify-between">
                        Building permit{" "}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                        >
                          <path
                            d="M19.5428 27.0002H18.1445V21.407H19.5428C20.5725 21.407 21.4072 22.2417 21.4072 23.2714V25.1358C21.4072 26.1655 20.5725 27.0002 19.5428 27.0002Z"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M24.2031 21.407V27.0002"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M24.2031 21.407H26.9997"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M26.0675 24.2034H24.2031"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12.082 27.0002V21.407"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M13.9464 21.407H12.082V24.2036H13.9464C14.7187 24.2036 15.3447 23.5776 15.3447 22.8053C15.3447 22.033 14.7187 21.407 13.9464 21.407Z"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M13.3906 12.4578V18.051"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M11.5234 16.1865L13.3878 18.0509L15.2523 16.1865"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M21.7812 18.0507V10.593"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M16.1864 5H6.86441C5.83474 5 5 5.83474 5 6.86441V25.1356C5 26.1653 5.83474 27 6.86441 27H8.72882"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M21.7807 10.5932H18.0519C17.0222 10.5932 16.1875 9.75848 16.1875 8.72882V5L21.7807 10.5932Z"
                            stroke="currentColor"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="installment-reveal-content hidden w-full max-md:block">
          <div className="bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] px-6 py-10">
            <div className="flex h-full flex-col justify-between gap-16 pl-10 max-xl:pl-17 max-lg:relative max-lg:pl-0 max-md:gap-4 ">
              <div className="max-lg:flex max-lg:gap-15 max-md:flex-col max-md:gap-3">
                <p className="heading-2 text-cream-dark mb-15 max-md:mb-0">
                  Installment plan
                </p>
                <ul className="divide-cream-dark/40 divide-y">
                  <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                    <p className="heading-2 text-accent translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                      20%
                    </p>
                    <p className="detail text-sand">Pre-contract</p>
                  </li>
                  <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                    <p className="heading-2 text-accent translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                      20%
                    </p>
                    <p className="detail text-sand">Zero level</p>
                  </li>
                  <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                    <p className="heading-2 text-accent translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                      20%
                    </p>
                    <p className="detail text-sand">Structure completed</p>
                  </li>
                  <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                    <p className="heading-2 text-accent translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                      30%
                    </p>
                    <p className="detail text-sand">Building 80% complete</p>
                  </li>
                  <li className="border-b-green mb-4 flex items-center justify-start gap-4 border-b pb-4 max-lg:justify-start max-md:mb-0 max-md:gap-8 max-md:py-2">
                    <p className="heading-2 text-accent translate-y-0 whitespace-nowrap italic max-lg:not-italic">
                      10%
                    </p>
                    <p className="detail text-sand">Technical acceptance</p>
                  </li>
                </ul>
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="/pdf/gradjevinska-dozvola.pdf"
                className="mt-auto max-lg:absolute max-lg:bottom-0 max-lg:left-0 max-md:static max-md:w-full"
              >
                <button
                  data-slot="button"
                  data-variant="darkFill"
                  data-size="default"
                  className="inline-flex menu cursor-pointer border shrink-0 min-w-55 items-center justify-center gap-2 uppercase whitespace-nowrap [&amp;_svg]:transition-all transition-all outline-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&amp;_svg]:pointer-events-none border-cream-dark bg-cream-dark text-pine-green [&amp;_svg]:text-green hover:bg-cream hover:border-cream active:bg-golden active:[&amp;_svg]:text-cream-dark h-14 px-5 py-5 has-[&gt;svg]:px-5 rounded-full max-md:h-12 max-md:py-3 max-md:w-full group relative"
                >
                  <span className="relative z-1 block w-full overflow-hidden">
                    <span className="flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:-translate-y-full has-[&gt;svg]:justify-between">
                      Building permit{" "}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                      >
                        <path
                          d="M19.5428 27.0002H18.1445V21.407H19.5428C20.5725 21.407 21.4072 22.2417 21.4072 23.2714V25.1358C21.4072 26.1655 20.5725 27.0002 19.5428 27.0002Z"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M24.2031 21.407V27.0002"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M24.2031 21.407H26.9997"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M26.0675 24.2034H24.2031"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M12.082 27.0002V21.407"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13.9464 21.407H12.082V24.2036H13.9464C14.7187 24.2036 15.3447 23.5776 15.3447 22.8053C15.3447 22.033 14.7187 21.407 13.9464 21.407Z"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13.3906 12.4578V18.051"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M11.5234 16.1865L13.3878 18.0509L15.2523 16.1865"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M21.7812 18.0507V10.593"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M16.1864 5H6.86441C5.83474 5 5 5.83474 5 6.86441V25.1356C5 26.1653 5.83474 27 6.86441 27H8.72882"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M21.7807 10.5932H18.0519C17.0222 10.5932 16.1875 9.75848 16.1875 8.72882V5L21.7807 10.5932Z"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute top-full left-0 flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:top-0 has-[&gt;svg]:justify-between">
                      Building permit{" "}
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                      >
                        <path
                          d="M19.5428 27.0002H18.1445V21.407H19.5428C20.5725 21.407 21.4072 22.2417 21.4072 23.2714V25.1358C21.4072 26.1655 20.5725 27.0002 19.5428 27.0002Z"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M24.2031 21.407V27.0002"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M24.2031 21.407H26.9997"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M26.0675 24.2034H24.2031"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M12.082 27.0002V21.407"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13.9464 21.407H12.082V24.2036H13.9464C14.7187 24.2036 15.3447 23.5776 15.3447 22.8053C15.3447 22.033 14.7187 21.407 13.9464 21.407Z"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M13.3906 12.4578V18.051"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M11.5234 16.1865L13.3878 18.0509L15.2523 16.1865"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M21.7812 18.0507V10.593"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M16.1864 5H6.86441C5.83474 5 5 5.83474 5 6.86441V25.1356C5 26.1653 5.83474 27 6.86441 27H8.72882"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M21.7807 10.5932H18.0519C17.0222 10.5932 16.1875 9.75848 16.1875 8.72882V5L21.7807 10.5932Z"
                          stroke="currentColor"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </span>
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
