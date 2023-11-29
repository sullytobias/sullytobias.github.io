import Section from "./components/section/section";
import Title from "./components/title/title";
import Paragraph from "./components/paragraph/paragraph";
import Button from "./components/button/button";
import Header from "./components/header/header";
import ScrollContainer from "./components/scrollContainer/scrollContainer";
import Image from "./components/image/image";
import ProgressBar from "./components/progressBar/progressBar";
import Card from "./components/card/card";
import Skills from "./components/skills/skills";
import Separator from "./components/separator/separator";
import Contact from "./components/contact/contact";

import Cursor from "./utils/jsx/cursor/cursor";

const P_WORKS = [
    {
        title: "Crypto",
        image: "assets/crypto.png",
        href: "https://sullivantobias.github.io/Crypto-Tracker/",
    },
    {
        title: "Solar System",
        image: "assets/solar.png",
        href: "https://sullivantobias.github.io/solar-system/",
    },
    {
        title: "React Firebase Chat",
        image: "assets/chat.png",
        href: "https://sullivantobias.github.io/login",
    },
    {
        title: "Weather",
        image: "assets/weather.png",
        href: "https://sullivantobias.github.io/weather-app/",
    },
    {
        title: "Lunar",
        image: "assets/lunar.png",
        href: "https://sullivantobias.github.io/moon-phase/",
    },
    {
        title: "Github",
        image: "assets/github.png",
        href: "https://sullivantobias.github.io/github-resume/",
    },
];

const PRO_WORKS = [
    {
        title: "Renault",
        image: "assets/renault.png",
        href: "https://www.renault.fr/",
    },
    {
        title: "Radley",
        image: "assets/radley.png",
        href: "https://www.radley.co.uk/",
    },
    {
        title: "Airbus",
        image: "assets/airbus.png",
        href: "https://www.airbus.com/en",
    },
];

const webIntegrationSkills = [
    { name: "HTLM5", image: "html5.svg" },
    { name: "CSS", image: "css3.svg" },
];

const backEndSkills = [{ name: "NodeJs", image: "nodejs.svg" }];

const cmSkills = [{ name: "NodeJs", image: "aem.svg" }];

const frontEndSkills = [
    { name: "JavaScript", image: "js.svg" },
    { name: "React", image: "react.svg" },
    { name: "Redux", image: "redux.svg" },
    { name: "MobX", image: "mobx.svg" },
    { name: "Handlebar", image: "handlebars.svg" },
];

const otherSkills = [
    { name: "TS", image: "ts.svg" },
    { name: "GraphQL", image: "graphql.svg" },
    { name: "Jest", image: "jest.svg" },
    { name: "NextJS", image: "nextjs.svg" },
    { name: "MongoDB", image: "mongodb.svg" },
    { name: "GSAP", image: "gsap.svg" },
    { name: "ThreeJS", image: "threejs.svg" },
    { name: "OpenAI", image: "openai.svg" },
    { name: "Lightroom", image: "lightroom.svg" },
];

import "./App.scss";

function App() {
    return (
        <div className="App">
            <ProgressBar />
            <Header />
            <Cursor />
            <Section anchor="home" className="App__introduction">
                <div>
                    <Title
                        noWrapped
                        animationTime={2}
                        delay={0.3}
                        text="Hello 🫡"
                    />
                    <Title
                        noWrapped
                        animationTime={2}
                        delay={0.6}
                        text="I am Sullivan Tobias"
                    />
                    <Paragraph
                        animationTime={2}
                        delay={1}
                        text="I build multiple kind of things"
                    />
                    <Button anchor="about" delay={2} text="Get To Know Me" />
                    <Button anchor="contact" delay={2} text="Contact" />
                </div>
                <div className="Portfolio__image">
                    <ScrollContainer duration={0.5}>
                        <Image src="assets/portfolio.png" />
                    </ScrollContainer>
                </div>
            </Section>
            <Separator />
            <ScrollContainer>
                <Section anchor="about" title="About me">
                    <Title text="I am deeply passionate about crafting intuitive and visually appealing user interfaces" />
                    <Title text="With a fervor for staying on the cutting edge, I am enthusiastic about embracing new technologies and coding practices" />
                </Section>
            </ScrollContainer>
            <Separator />
            <ScrollContainer>
                <Section anchor="works" title="Works">
                    {PRO_WORKS.map(({ title, image, href }, index) => (
                        <Card
                            to={href}
                            key={index}
                            title={title}
                            imageUrl={image}
                        />
                    ))}
                    <Separator />
                    {P_WORKS.map(({ title, image, href }, index) => (
                        <Card
                            to={href}
                            key={index}
                            title={title}
                            imageUrl={image}
                        />
                    ))}
                </Section>
            </ScrollContainer>
            <Separator />
            <Section anchor="skills" className="Skills__section" title="Skills">
                <div className="Container">
                    <h1>Web Integration</h1>
                    <Skills skills={webIntegrationSkills} />
                </div>
                <div className="Container">
                    <h1>Front-End</h1>
                    <Skills skills={frontEndSkills} />
                </div>
                <div className="Container">
                    <h1>Back-End</h1>
                    <Skills skills={backEndSkills} />
                </div>
                <div className="Container">
                    <h1>Content Management</h1>
                    <Skills skills={cmSkills} />
                </div>
                <div className="Container">
                    <h1>Others</h1>
                    <Skills skills={otherSkills} />
                </div>
            </Section>
            <Separator />
            <ScrollContainer>
                <Section anchor="contact">
                    <Contact />
                </Section>
            </ScrollContainer>
        </div>
    );
}

export default App;
