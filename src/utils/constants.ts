function getRandomColor(): string {
    const randomValue = () => Math.floor(Math.random() * 256);
    const red = randomValue();
    const green = randomValue();
    const blue = randomValue();

    return `rgb(${red}, ${green}, ${blue})`;
}
export const LOADING_TEXT = {
    loading: "Loading Space",
    loaded: "Welcome",
};

export const CATEGORIES = [
    {
        categoryTitle: "Skills",
        cardPositionX: 0,
        cardColor: getRandomColor(),
    },
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
