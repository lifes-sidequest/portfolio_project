export type ProjectStatus = "online" | "offline" | "coming-soon" | "in-production";

type PortfolioProject = {
  title: string;
  titleDe: string;
  client: string;
  image: string | null;
  darkImage: string | null;
  poster: string | null;
  darkPoster: string | null;
  href: string;
  status: ProjectStatus;
};

export const projects: readonly PortfolioProject[] = [
  {
    title: "Kaspi.kz home page rework",
    titleDe: "Überarbeitung der Kaspi.kz-Startseite",
    client: "Kaspi.kz, Super-App",
    image: "/images/projects/kaspi-home/home-page.mp4",
    darkImage: "/images/projects/kaspi-home/home-page-dark.mp4",
    poster: "/images/projects/kaspi-home/kaspi-home-poster-light.jpg",
    darkPoster: "/images/projects/kaspi-home/kaspi-home-poster-dark.jpg",
    href: "/projects/kaspi-home",
    status: "online",
  },
  {
    title: "Car Parts",
    titleDe: "Autoteile",
    client: "Kaspi.kz, E-commerce",
    image: "/images/projects/car-parts/car-parts-light.webm",
    darkImage: "/images/projects/car-parts/car-parts-dark.webm",
    poster: "/images/projects/car-parts/car-parts-poster-light.jpg",
    darkPoster: "/images/projects/car-parts/car-parts-poster-dark.jpg",
    href: "/projects/car-parts",
    status: "online",
  },
  {
    title: "Kaspi courier",
    titleDe: "Kaspi Kurier",
    client: "Kaspi.kz, Logistic app",
    image: null,
    darkImage: null,
    poster: null,
    darkPoster: null,
    href: "/projects/kaspi-courier",
    status: "in-production",
  },
];
