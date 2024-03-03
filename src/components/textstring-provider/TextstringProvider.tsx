import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { TargetLanguageCode, Translator } from 'deepl-node';

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
     * The deepl API key.
     */
    apiKey: string;
    /**
     * The language that should be used.
     */
    language: TargetLanguageCode;
    /**
     * The name of the library.
     */
    textstrings: TextstringValue;
};

const TextstringProvider: FC<TextstringProviderProps> = ({
    children,
    language,
    textstrings,
    apiKey
}) => {
    const [textstringValues, setTextstringValues] = useState<TextstringValue>({});

    const translator = new Translator(apiKey);

    useEffect(() => {
        const loadTextstrings = () => {
            const translated: TextstringValue = {};

            for (const [key, value] of Object.entries(textstrings)) {
                translator.translateText(value, null, language).then(result => {
                    translated[key] = result.text;
                });
            }

            setTextstringValues(translated);
        };

        loadTextstrings();
    }, [language]);

    return (
        <TextstringContext.Provider value={textstringValues}>{children}</TextstringContext.Provider>
    );
};

TextstringProvider.displayName = 'TextstringProvider';

export default TextstringProvider;
