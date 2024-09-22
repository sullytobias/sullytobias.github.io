type Category = {
    cardColor: string;
    cardPositionX: number;
    categoryTitle: "Contacts" | "Skills" | "Projects";
};

const getRandomColor = (): string =>
    `rgb(${[...Array(3)]
        .map(() => Math.floor(Math.random() * 256))
        .join(", ")})`;

export const LOADING_TEXT = {
    loading: "Loading Space",
    loaded: "Welcome",
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