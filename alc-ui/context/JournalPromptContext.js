import React, { createContext, useState, useContext } from 'react';
import { PROMPTS } from '../constants/prompts';

const JournalPromptContext = createContext();

export function JournalPromptProvider({ children }) {
    const [promptIndex, setPromptIndex] = useState(() => Math.floor(Math.random() * PROMPTS.length));

    const value = {
        promptIndex,
        prompt: PROMPTS[promptIndex],
        setPromptIndex
    };

    return (
        <JournalPromptContext.Provider value={value}>
            {children}
        </JournalPromptContext.Provider>
    );
}

export function useJournalPrompt() {
    return useContext(JournalPromptContext);
}