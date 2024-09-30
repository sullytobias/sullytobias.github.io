type CategoryTitle = "CONTACTS" | "SKILLS" | "PROJECTS";

interface Category {
    cardColor: string;
    cardPositionX: number;
    categoryTitle: CategoryTitle;
}

export type ProjectCategory = "professional" | "personal";

export const colorPalette = {
    silverLakeBlue: "#6290C3",
    mintGreen: "#c2e7da",
    honeydrew: "#f1ffe7",
    yaleBlue: "#0D3B66",
    lime: "#baff29",
    black: "#000",
    white: "#fff",
};

export const LOADING_TEXT = {
    loading: "Loading Space",
    loaded: "Welcome",
};

export const PROJECT_CATEGORIES = {
    professional: {
        color: colorPalette.silverLakeBlue,
        title: "Professional Projects",
    },
    personal: {
        color: colorPalette.white,
        title: "Personal Projects",
    },
};

export const CATEGORIES: Category[] = [
    {
        categoryTitle: "PROJECTS",
        cardPositionX: 0,
        cardColor: colorPalette.mintGreen,
    },
    {
        categoryTitle: "SKILLS",
        cardPositionX: -8,
        cardColor: colorPalette.yaleBlue,
    },
    {
        categoryTitle: "CONTACTS",
        cardPositionX: 8,
        cardColor: colorPalette.silverLakeBlue,
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
