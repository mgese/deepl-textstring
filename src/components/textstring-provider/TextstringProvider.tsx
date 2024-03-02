import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';

export type TextstringValue = {
    [key: string]: string;
};

export const TextstringContext = createContext<TextstringValue>({});

export type TextstringProviderProps = {
    /**
     * The element that should use the library.
     */
    children?: ReactNode;
    /**
     * The language that should be used.
     */
    language: string;
    /**
     * The name of the library.
     */
    textstrings: { [key: string]: string };
};

const TextstringProvider: FC<TextstringProviderProps> = ({ children, language }) => {
    const [textstrings, setTextstrings] = useState<TextstringValue>({});

    useEffect(() => {
        // ToDo update Data if language is changed
        setTextstrings({"test":"test"})
    }, [language]);

    return <TextstringContext.Provider value={textstrings}>{children}</TextstringContext.Provider>;
};

TextstringProvider.displayName = 'TextstringProvider';

export default TextstringProvider;
