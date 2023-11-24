import "./App.scss";
import Title from "./components/title/title";
import Cursor from "./utils/jsx/cursor/cursor";

function App() {
    return (
        <div>
            <Cursor />
            <Title text="My Portfolio" />
        </div>
    );
}

export default App;
