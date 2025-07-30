import { createContext, useState, useContext } from 'react';
import { PROMPTS } from '../constants/prompts';

const JournalPromptContext = createContext();

export function JournalPromptProvider({ children }) {
    let safePrompts;

    if (Array.isArray(PROMPTS) && PROMPTS.length > 0) {
        safePrompts = PROMPTS;
    } else {
        safePrompts = ['Write anything on your mind...'];
    }

    const [promptIndex, setPromptIndex] = useState(() => Math.floor(Math.random() * PROMPTS.length));

    const value = {
        promptIndex,
        prompt: safePrompts[promptIndex],
        setPromptIndex
    };

    return (
        <JournalPromptContext.Provider value={value}>
            {children}
        </JournalPromptContext.Provider>
    );
}

export function useJournalPrompt() {
    const context = useContext(JournalPromptContext);
    if (!context) {
        throw new Error("useJournalPrompt must be used within a JournalPromptProvider");
    }
    return context;
}