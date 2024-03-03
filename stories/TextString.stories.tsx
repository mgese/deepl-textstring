import { Meta, StoryFn } from '@storybook/react';
import { useMemo, useState } from 'react';
import { Textstring, TextstringProvider } from '../src';
import React from 'react';
import { TargetLanguageCode } from 'deepl-node';

const TEXTSTRINGS = {
    txt_default: 'Hallo Welt.',
    txt_with_html: "<button onclick='alert(`Test`)'>Test</button>",
    txt_with_replacements: 'Guten ##time##!',
    txt_with_styles: 'Ein Text mit Styles.'
};

export default {
    title: 'Textstring/Textstring',
    component: Textstring,
    args: {}
} as Meta<typeof Textstring>;

const Template: StoryFn<typeof Textstring> = ({ ...args }) => {
    const [language, setLanguage] = useState<TargetLanguageCode>('de');

    return (
        <>
            <TextstringProvider
                language={language}
                textstrings={TEXTSTRINGS}
                apiKey={''}
            >
                <Textstring {...args} />
            </TextstringProvider>
            <p>select language:</p>
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setLanguage('de')}>German</button>
                <button onClick={() => setLanguage('en-GB')}>English</button>
                <button onClick={() => setLanguage('nl')}>Dutch</button>
            </div>
        </>
    );
};

const TextstringWithReplacementTemplate: StoryFn<typeof Textstring> = () => {
    const [time, setTime] = useState('##time##');
    const [language, setLanguage] = useState<TargetLanguageCode>('de');

    return useMemo(() => {
        return (
            <>
                <TextstringProvider language={language} textstrings={TEXTSTRINGS} apiKey={''}>
                    <Textstring
                        childrenTagName="h1"
                        textstring={{
                            fallback: 'Guten ##time##',
                            name: 'txt_with_replacements'
                        }}
                        replacements={{ '##time##': time }}
                    />
                    <i>'##time##' will be replaced</i>
                    <p>select time:</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => setTime('morning')}>Morning</button>
                        <button onClick={() => setTime('afternoon')}>Afternoon</button>
                        <button onClick={() => setTime('evening')}>Evening</button>
                    </div>
                </TextstringProvider>
                <p>select language:</p>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setLanguage('de')}>German</button>
                    <button onClick={() => setLanguage('en-GB')}>English</button>
                    <button onClick={() => setLanguage('nl')}>Dutch</button>
                </div>
            </>
        );
    }, [time]);
};

export const General = Template.bind({});

export const WithHTML = Template.bind({});

export const TextstringWithReplacement = TextstringWithReplacementTemplate.bind({});

export const TextstringWithStyles = Template.bind({});

WithHTML.args = {
    textstring: {
        fallback: "<button onclick='alert(`Test`)'>Test</button>",
        name: 'txt_with_html'
    },
    isTextstringHTML: true
};

General.args = {
    childrenTagName: 'h1',
    textstring: {
        fallback: 'Hallo Welt.',
        name: 'txt_default'
    }
};

TextstringWithStyles.args = {
    childrenTagName: 'h1',
    childrenStyles: { color: 'rebeccapurple' },
    textstring: {
        fallback: 'Ein Text mit Styles.',
        name: 'txt_with_styles'
    }
};
