import Section from "./components/section/section";
import Title from "./components/title/title";
import Paragraph from "./components/paragraph/paragraph";
import Button from "./components/button/button";
import Header from "./components/header/header";
import ScrollContainer from "./components/scrollContainer/scrollContainer";

import Cursor from "./utils/jsx/cursor/cursor";

import "./App.scss";

function App() {
    return (
        <div className="App">
            <Header />
            <Cursor />
            <Section>
                <div>
                    <Title animationTime={2} delay={0.3} text="Hello 🫡" />
                    <Title
                        animationTime={2}
                        delay={0.6}
                        text="I am Sullivan Tobias"
                    />
                    <Paragraph
                        animationTime={2}
                        delay={1}
                        text="I build multiple kind of things"
                    />
                    <Button delay={2} text="Get To Know Me" />
                    <Button delay={2} text="Contact" />
                </div>
            </Section>
            <Section>
                <ScrollContainer>
                    <Title text="qzdkqzn djoqezdnqjdbqzjdnjzoq" />
                </ScrollContainer>
            </Section>
        </div>
    );
}

export default App;
