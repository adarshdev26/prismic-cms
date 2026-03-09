import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import { Bounded } from "@/components/Bounded";
import { PrismicRichText } from "@/components/PrismicRichText";

/**
 * Props for `HeroBanner`.
 */
export type HeroBannerProps = SliceComponentProps<Content.HeroBannerSlice>;

/**
 * Component for "Hero Banner" Slices.
 */
const HeroBanner: FC<HeroBannerProps> = ({ slice }) => {
  const ctas = (slice.primary.ctas ?? [])
    .filter((cta) => isFilled.link(cta.cta_link))
    .sort((a, b) => Number(Boolean(b.cta_primary)) - Number(Boolean(a.cta_primary)));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded
        as="div"
        yPadding="lg"
        className="bg-white text-slate-900"
        collapsible={false}
      >
        <div className="grid justify-items-center text-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1 shadow-lg shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-500/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
              </span>
              {slice.primary.badge_label || "Live now"}
            </span>
            <span className="px-3 py-1 text-xs font-semibold text-slate-700">
              {slice.primary.badge_subtext || "Used by SaaS & AI leaders"}
            </span>
          </div>

          <div className="mt-10 max-w-4xl text-balance">
            <PrismicRichText
              field={slice.primary.heading}
              components={{
                heading1: ({ children }) => (
                  <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                    {children}
                  </h1>
                ),
              }}
            />
          </div>

          <div className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => <p className="m-0">{children}</p>,
              }}
            />
          </div>

          {ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {ctas.map((cta, index) => {
                const label = cta.cta_label || "Learn more";
                const isPrimary = Boolean(cta.cta_primary);

                return (
                  <PrismicNextLink
                    key={`${label}-${index}`}
                    field={cta.cta_link}
                    className={[
                      "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
                      "transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900",
                      isPrimary
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-900/25 hover:bg-slate-800"
                        : "border border-slate-200 bg-white text-slate-900 shadow-sm hover:bg-slate-50",
                    ].join(" ")}
                  >
                    {label}
                  </PrismicNextLink>
                );
              })}
            </div>
          )}

          {isFilled.image(slice.primary.dashboard_image) && (
            <div className="mt-14 w-full max-w-6xl">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15 ring-1 ring-slate-900/5">
                <PrismicNextImage
                  field={slice.primary.dashboard_image}
                  alt=""
                  className="h-auto w-full"
                  sizes="(min-width: 1024px) 1100px, 100vw"
                  priority={true}
                />
              </div>
            </div>
          )}
        </div>
      </Bounded>
    </section>
  );
};

export default HeroBanner;
