import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import type { Route } from "./+types/root";
import { Navbar } from "@/components/layout/nav.tsx";
import Footer from "@/components/footer.tsx";
import { APP_CONFIG } from "@/app-config";

import "@/app/fontiran.css";
import "@/app/global.css";
import "highlight.js/styles/github-dark.css";
import "katex/dist/katex.min.css";

export function meta({}: Route.MetaArgs) {
  return [
    { title: APP_CONFIG.TITLE },
    { name: "description", content: APP_CONFIG.DESCRIPTION },
    { property: "og:title", content: APP_CONFIG.TITLE },
    { property: "og:description", content: APP_CONFIG.DESCRIPTION },
    { property: "og:url", content: APP_CONFIG.BASE_URL },
    { property: "og:site_name", content: APP_CONFIG.TITLE },
    { property: "og:locale", content: "fa_IR" },
    { property: "og:type", content: "website" },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className="h-full bg-gradient-to-b from-cloudyMidnight-start to-cloudyMidnight-mid px-5"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased max-w-3xl mx-auto h-full bg-midnight text-textMain">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <>
      <main className="flex-auto min-w-0 flex flex-col h-full">
        <Navbar />
        <div className="flex-1 flex flex-col py-10">
          <Outlet />
        </div>
        <Footer />
      </main>
      <p
        className="pointer-events-none w-[1000px] h-[300px] fixed left-0 top-0 rotate-90 opacity-[0.01] font-normal text-[15rem] -translate-x-[510px] translate-y-[330px] leading-none"
        dir="ltr"
      >
        Berneti
      </p>
    </>
  );
}
