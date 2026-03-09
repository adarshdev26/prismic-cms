import "./globals.css";

import { asText, isFilled } from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink, PrismicPreview } from "@prismicio/next";

import { createClient, repositoryName } from "@/prismicio";
import { Bounded } from "@/components/Bounded";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans overflow-x-hidden antialiased">
        <Header />
        {children}
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const navigation = await client.getSingle("navigation");

  const logo = navigation.data.logo;
  const ctaLabel = navigation.data.cta_label;
  const ctaLink = navigation.data.cta_link;

  return (
    <Bounded as="header" yPadding="sm" className="py-6 md:py-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur md:px-6">
          <PrismicNextLink
            href="/"
            aria-label="Home"
            className="flex items-center gap-3 font-semibold tracking-tight text-slate-900"
          >
            {isFilled.image(logo) ? (
              <>
                <PrismicNextImage
                  field={logo}
                  alt=""
                  className="h-7 w-auto"
                  sizes="(min-width: 768px) 120px, 96px"
                />
                <span className="sr-only">
                  <PrismicText field={settings.data.siteTitle} />
                </span>
              </>
            ) : (
              <span className="text-lg">
                <PrismicText field={settings.data.siteTitle} />
              </span>
            )}
          </PrismicNextLink>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm font-medium text-slate-700">
              {navigation.data?.links.map((item) => (
                <li key={asText(item.label)}>
                  <PrismicNextLink
                    field={item.link}
                    className="rounded-md px-2 py-1 transition-colors hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
                  >
                    <PrismicText field={item.label} />
                  </PrismicNextLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {isFilled.link(ctaLink) && (
              <PrismicNextLink
                field={ctaLink}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/25 ring-1 ring-slate-900/10 transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              >
                {ctaLabel || "Get Started"}
              </PrismicNextLink>
            )}

            <details className="relative md:hidden">
              <summary className="list-none rounded-full p-2 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900">
                <span className="sr-only">Open menu</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </summary>

              <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                <nav aria-label="Mobile">
                  <ul className="flex flex-col">
                    {navigation.data?.links.map((item) => (
                      <li key={asText(item.label)}>
                        <PrismicNextLink
                          field={item.link}
                          className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <PrismicText field={item.label} />
                        </PrismicNextLink>
                      </li>
                    ))}
                    {isFilled.link(ctaLink) && (
                      <li className="mt-1 border-t border-slate-200 pt-2">
                        <PrismicNextLink
                          field={ctaLink}
                          className="block rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-slate-800"
                        >
                          {ctaLabel || "Get Started"}
                        </PrismicNextLink>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
