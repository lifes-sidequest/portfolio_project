import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("the loader runs once per tab and pauses greeting work while the page is hidden", async () => {
  const [layout, loader, styles] = await Promise.all([
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/_components/site-loader.tsx", root), "utf8"),
    readFile(new URL("app/loader.css", root), "utf8"),
  ]);

  assert.match(layout, /portfolio-loader-complete/);
  assert.match(layout, /dataset\.loaderComplete/);
  assert.match(loader, /sessionStorage\.setItem\(loaderSessionKey/);
  assert.match(loader, /visibilitychange/);
  assert.match(loader, /document\.hidden/);
  assert.match(loader, /createGreetingQueue/);
  assert.match(styles, /\[data-loader-complete="true"\] \.site-loader\{display:none\}/);
  assert.doesNotMatch(styles, /site-greeting-(?:in|out)[^{]*\{[^}]*filter:/);
});

test("the loader uses the active theme surface and reveals the page from the center", async () => {
  const [loader, styles] = await Promise.all([
    readFile(new URL("app/_components/site-loader.tsx", root), "utf8"),
    readFile(new URL("app/loader.css", root), "utf8"),
  ]);

  assert.match(styles, /background:var\(--bg,#fff\)/);
  assert.match(styles, /@keyframes site-loader-circle-reveal/);
  assert.match(styles, /html\[data-loader-transition="circle-reveal"\]::view-transition-new\(root\)/);
  assert.match(styles, /clip-path:circle\(0 at 50% 50%\)/);
  assert.match(styles, /clip-path:circle\(150vmax at 50% 50%\)/);
  assert.match(loader, /startViewTransition/);
  assert.match(loader, /root\.dataset\.loaderTransition = "circle-reveal"/);
  assert.match(loader, /flushSync/);
  assert.doesNotMatch(styles, /mask-image|--loader-reveal|@property --loader-reveal/);
  assert.doesNotMatch(loader, /document\.documentElement\.dataset\.loaderComplete = "true";\s*setIsLeaving\(true\)/);
});

test("the loader always starts with Hallo and never includes the Russian greeting", async () => {
  const loader = await readFile(new URL("app/_components/site-loader.tsx", root), "utf8");

  assert.match(loader, /const greetings = \[\s*\{ text: "Hallo!", language: "de" \}/);
  assert.doesNotMatch(loader, /Привет/);
});

test("For Agents uses one compact external-link icon format beside every page link", async () => {
  const [page, styles] = await Promise.all([
    readFile(new URL("app/for-agents/agent-profile-page.tsx", root), "utf8"),
    readFile(new URL("app/for-agents/agent-profile.css", root), "utf8"),
  ]);

  assert.doesNotMatch(page, /<span>→<\/span>/);
  assert.equal((page.match(/<span aria-hidden="true">↗<\/span>/g) ?? []).length, 4);
  assert.match(styles, /\.agent-profile-page\s*\{[^}]*background:\s*var\(--bg,#fff\)/s);
  assert.match(styles, /\.agent-profile-links li\s*\{[^}]*justify-content:\s*flex-start/s);
  assert.match(styles, /\.agent-profile-links li span\s*\{[^}]*font-size:\s*16px[^}]*line-height:\s*1/s);
});

test("the custom cursor stays above the agent-mode switch but below the loader", async () => {
  const [siteStyles, switchStyles, loaderStyles] = await Promise.all([
    readFile(new URL("styles/site.css", root), "utf8"),
    readFile(new URL("app/agent-mode-switch.css", root), "utf8"),
    readFile(new URL("app/loader.css", root), "utf8"),
  ]);

  const cursor = Number(siteStyles.match(/\.custom-cursor\{[^}]*z-index:(\d+)/)?.[1]);
  const agentSwitch = Number(switchStyles.match(/\.agent-mode-switch\s*\{[^}]*z-index:\s*(\d+)/s)?.[1]);
  const loader = Number(loaderStyles.match(/\.site-loader\{[^}]*z-index:(\d+)/)?.[1]);

  assert.ok(cursor > agentSwitch);
  assert.ok(cursor < loader);
});

test("the Links contact block never receives a delayed scroll-reveal hiding state", async () => {
  const [links, folder] = await Promise.all([
    readFile(new URL("app/links/index-page.tsx", root), "utf8"),
    readFile(new URL("app/_components/social-folder.tsx", root), "utf8"),
  ]);

  assert.doesNotMatch(links, /className="contact-copy scroll-reveal"/);
  assert.match(links, /reveal=\{false\}/);
  assert.match(folder, /reveal\?: boolean/);
  assert.match(folder, /reveal \? "social-folder scroll-reveal" : "social-folder"/);
});
