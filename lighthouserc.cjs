module.exports = {
  ci: {
    collect: {
      startServerCommand: "python3 -u -m http.server 3100 --directory out --bind 127.0.0.1",
      startServerReadyPattern: "Serving HTTP",
      startServerReadyTimeout: 15_000,
      chromeFlags: "--no-sandbox --headless --disable-dev-shm-usage",
      numberOfRuns: 3,
      url: [
        "http://127.0.0.1:3100/",
        "http://127.0.0.1:3100/about",
        "http://127.0.0.1:3100/inspiration",
        "http://127.0.0.1:3100/projects/car-parts",
      ],
      settings: {
        preset: "desktop",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.7 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 1 }],
        "total-blocking-time": ["error", { maxNumericValue: 200 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci/reports",
    },
  },
};
