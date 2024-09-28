import { createContext, useState, FC, useContext } from "react";

type SoundContextType = {
    isBackgroundPlaying: boolean;
    isFxPlaying: boolean;
    toggleBackgroundSound: () => void;
    toggleFxSound: () => void;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: FC = ({ children }) => {
    const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(true);
    const [isFxPlaying, setIsFxPlaying] = useState(true);

    const toggleBackgroundSound = () =>
        setIsBackgroundPlaying(!isBackgroundPlaying);
    const toggleFxSound = () => setIsFxPlaying(!isFxPlaying);

    return (
        <SoundContext.Provider
            value={{
                isBackgroundPlaying,
                isFxPlaying,
                toggleBackgroundSound,
                toggleFxSound,
            }}
        >
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = (): SoundContextType => {
    const context = useContext(SoundContext);

    if (!context)
        throw new Error("useSound must be used within a SoundProvider");

    return context;
};
