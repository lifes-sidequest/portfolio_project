import type { Metadata } from "next";
import "./globals.css";
import "./loader.css";
import "./agent-mode-switch.css";
import { RevealController } from "./_components/reveal-controller";
import { SiteClockProvider } from "./_components/site-clock";
import { CustomCursor } from "./_components/custom-cursor";
import { SitePreferencesProvider } from "./_components/site-preferences";
import { SiteLoader } from "./_components/site-loader";
import { AgentModeSwitch } from "./_components/agent-mode-switch";

export const metadata: Metadata = {
  title: "Aziz Baratov — Product Designer",
  description: "Product Designer at Kaspi.kz, based in Berlin. Selected product design work and case studies.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var d=document.documentElement;var t=localStorage.getItem('portfolio-theme');var l=localStorage.getItem('portfolio-language');if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';d.dataset.theme=t;d.lang=l==='de'?'de':'en';if(sessionStorage.getItem('portfolio-loader-complete')==='true')d.dataset.loaderComplete='true'}catch(e){}})()` }} />
      </head>
      <body>
        <SiteLoader />
        <SitePreferencesProvider>
          <AgentModeSwitch />
          <SiteClockProvider>
            <RevealController />
            {children}
            <CustomCursor />
          </SiteClockProvider>
        </SitePreferencesProvider>
      </body>
    </html>
  );
}
