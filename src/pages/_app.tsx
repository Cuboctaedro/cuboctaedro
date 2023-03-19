/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import SiteHeader from '@/components/header';
import hanken from '@/fonts/hanken';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className={`${hanken.variable} font-sans text-base leading-6 text-neutral-800`}>
            <div className="container mx-auto">
                <header className="pb-16">
                    <SiteHeader />
                </header>
                <Component {...pageProps} />
            </div>
        </div>
    );
}
