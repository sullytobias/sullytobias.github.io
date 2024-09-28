import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";

import { SoundProvider } from "./context/SoundContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SoundProvider>
            <App />
        </SoundProvider>
    </StrictMode>
);
