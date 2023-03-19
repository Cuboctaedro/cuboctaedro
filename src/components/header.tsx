import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SiteHeader() {
    const router = useRouter();

    return (
        <nav className="w-container-1 sm:w-container-2 lg:w-container-3 xl:w-container-4 mx-auto flex pt-2 flex-wrap">
            <div className="w-container-1 flex-none px-4">
                {router.pathname === '/' && (
                    <h1 className="font-bold">Dimitris Kottas</h1>
                )}
                {router.pathname !== '/' && (
                    <Link href="/" className="font-bold text-neutral-800 hover:text-neutral-500 transition-colors">Dimitris Kottas</Link>
                )}
            </div>
            <ul className="w-container-1 lg:w-container-2 xl:w-container-3 flex items-center justify-start lg:justify-end gap-6 flex-none px-4">
                <li>
                    <Link href="/projects" className={`hover:text-red-700 transition-colors ${router.pathname.includes('/projects') ? 'text-black' : 'text-neutral-700'}`}>projects</Link>
                </li>
                <li>
                    <Link href="/blog" className={`hover:text-red-700 transition-colors ${router.pathname.includes('/blog') ? 'text-black' : 'text-neutral-700'}`}>blog</Link>
                </li>
                <li>
                    <Link href="/about" className={`hover:text-red-700 transition-colors ${router.pathname.includes('/about') ? 'text-black' : 'text-neutral-700'}`}>about</Link>
                </li>
                <li>
                    <Link href="/contact" className={`hover:text-red-700 transition-colors ${router.pathname.includes('/contact') ? 'text-black' : 'text-neutral-700'}`}>contact</Link>
                </li>
            </ul>
        </nav>
    );
}

export default SiteHeader;
