type CategoryTitle = "Contacts" | "Skills" | "Projects";

interface Category {
    cardColor: string;
    cardPositionX: number;
    categoryTitle: CategoryTitle;
}

export type ProjectCategory = "professional" | "personal";

const getRandomColor = (): string =>
    `rgb(${Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * 256)
    ).join(", ")})`;

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
    { categoryTitle: "Skills", cardPositionX: 0, cardColor: getRandomColor() },
    {
        categoryTitle: "Projects",
        cardPositionX: -7,
        cardColor: getRandomColor(),
    },
    {
        categoryTitle: "Contacts",
        cardPositionX: 7,
        cardColor: getRandomColor(),
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
