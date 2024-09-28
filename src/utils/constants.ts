type CategoryTitle = "CONTACTS" | "SKILLS" | "PROJECTS";

interface Category {
    cardColor: string;
    cardPositionX: number;
    categoryTitle: CategoryTitle;
}

export type ProjectCategory = "professional" | "personal";

export const colorPalette = {
    coralRed: "#FF6B6B",
    mintGreen: "#6BCB77",
    skyBlue: "#4D96FF",
    brightPurple: "#F37CFF",
    lightGold: "#FFE156",
    black: "#000",
    white: "#fff",
};

export const LOADING_TEXT = {
    loading: "Loading Space",
    loaded: "Welcome",
};

export const PROJECT_CATEGORIES = {
    professional: {
        color: "#4CAF50",
        title: "Professional Projects",
    },
    personal: {
        color: "#2196F3",
        title: "Personal Projects",
    },
};

export const CATEGORIES: Category[] = [
    {
        categoryTitle: "SKILLS",
        cardPositionX: 0,
        cardColor: colorPalette.brightPurple,
    },
    {
        categoryTitle: "PROJECTS",
        cardPositionX: -7,
        cardColor: colorPalette.coralRed,
    },
    {
        categoryTitle: "CONTACTS",
        cardPositionX: 7,
        cardColor: colorPalette.mintGreen,
    },
];

interface Project {
    title: string;
    link: string;
    category: ProjectCategory;
}

export const projectsData: Project[] = [
    {
        title: "Renault",
        link: "https://www.renault.fr/",
        category: "professional",
    },
    {
        title: "Radley",
        link: "https://www.radley.co.uk/",
        category: "professional",
    },
    {
        title: "Airbus",
        link: "https://www.airbus.com/en",
        category: "professional",
    },
    {
        title: "Crypto",
        link: "https://sullivantobias.github.io/Crypto-Tracker/",
        category: "personal",
    },
    {
        title: "Solar System 3D",
        link: "https://sullytobias.github.io/geovisu/",
        category: "personal",
    },
    {
        title: "Solar System 2D",
        link: "https://sullivantobias.github.io/solar-system/",
        category: "personal",
    },
    {
        title: "React Firebase Chat",
        link: "https://sullivantobias.github.io/login",
        category: "personal",
    },
    {
        title: "Weather",
        link: "https://sullivantobias.github.io/weather-app/",
        category: "personal",
    },
    {
        title: "Lunar",
        link: "https://sullivantobias.github.io/moon-phase/",
        category: "personal",
    },
    {
        title: "Github",
        link: "https://sullivantobias.github.io/github-resume/",
        category: "personal",
    },
];
