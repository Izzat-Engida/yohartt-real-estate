'use client';

import Link from "next/link";

export default function InstallmentMobile() {
  return (
    <section id="InstallmentMobile" className="relative z-1 hidden overflow-clip max-md:block">
      <div className="bg-[radial-gradient(at_right_bottom,#3E562E,#2F3A26)] px-6 py-10">
        <div className="flex h-full flex-col justify-between gap-10">
          <div className="flex flex-col gap-6">
            <p className="heading-2 text-cream-dark">Installment plan</p>
            <ul className="divide-cream-dark/40 divide-y">
              <li className="flex items-center justify-start gap-8 border-b border-b-green py-3">
                <p className="heading-2 text-accent italic whitespace-nowrap">20%</p>
                <p className="detail text-sand">Pre-contract</p>
              </li>
              <li className="flex items-center justify-start gap-8 border-b border-b-green py-3">
                <p className="heading-2 text-accent italic whitespace-nowrap">20%</p>
                <p className="detail text-sand">Zero level</p>
              </li>
              <li className="flex items-center justify-start gap-8 border-b border-b-green py-3">
                <p className="heading-2 text-accent italic whitespace-nowrap">20%</p>
                <p className="detail text-sand">Structure completed</p>
              </li>
              <li className="flex items-center justify-start gap-8 border-b border-b-green py-3">
                <p className="heading-2 text-accent italic whitespace-nowrap">30%</p>
                <p className="detail text-sand">Building 80% complete</p>
              </li>
              <li className="flex items-center justify-start gap-8 border-b border-b-green py-3">
                <p className="heading-2 text-accent italic whitespace-nowrap">10%</p>
                <p className="detail text-sand">Technical acceptance</p>
              </li>
            </ul>
          </div>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="/pdf/gradjevinska-dozvola.pdf"
            className="mt-4 w-full"
          >
            <button
              data-slot="button"
              data-variant="darkFill"
              data-size="default"
              className="inline-flex menu cursor-pointer border shrink-0 w-full items-center justify-center gap-2 uppercase whitespace-nowrap [&_svg]:transition-all transition-all outline-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none border-cream-dark bg-cream-dark text-pine-green [&_svg]:text-green hover:bg-cream hover:border-cream active:bg-golden active:[&_svg]:text-cream-dark h-12 px-5 py-3 rounded-full group relative"
            >
              <span className="relative z-1 block w-full overflow-hidden">
                <span className="flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:-translate-y-full">
                  Building permit
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
                <span className="absolute top-full left-0 flex w-full items-center justify-center gap-6 transition-all duration-600 group-hover:top-0">
                  Building permit
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
          </Link>
        </div>
      </div>
    </section>
  );
}
