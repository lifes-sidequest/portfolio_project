module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm start --port 3100 --hostname 127.0.0.1",
      startServerReadyPattern: "Ready",
      startServerReadyTimeout: 15_000,
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
