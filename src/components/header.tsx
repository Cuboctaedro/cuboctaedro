import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function SiteHeader() {
    const router = useRouter();

    return (
        <nav className="w-container-1 sm:w-container-2 lg:w-container-3 xl:w-container-4 mx-auto flex pt-2 flex-wrap">
            <div className="w-container-1 flex-none">
                {router.pathname === '/' && (
                    <h1 className="font-bold">Dimitris Kottas</h1>
                )}
                {router.pathname !== '/' && (
                    <Link href="/" className="font-bold text-neutral-800 hover:text-neutral-500 transition-colors">Dimitris Kottas</Link>
                )}
            </div>
            <ul className="w-container-1 lg:w-container-2 xl:w-container-3 flex items-center justify-start lg:justify-end gap-6 flex-none">
                <li className={`border-solid border-neutral-800 ${router.pathname === '/projects' ? 'border-b' : ''}`}>
                    <Link href="/projects" className="text-neutral-800 hover:text-neutral-500 transition-colors">Projects</Link>
                </li>
                <li className={`border-solid border-neutral-800 ${router.pathname === '/blog' ? 'border-b' : ''}`}>
                    <Link href="/blog" className="text-neutral-800 hover:text-neutral-500 transition-colors">Blog</Link>
                </li>
                <li className={`border-solid border-neutral-800 ${router.pathname === '/about' ? 'border-b' : ''}`}>
                    <Link href="/about" className="text-neutral-800 hover:text-neutral-500 transition-colors">About</Link>
                </li>
                <li className={`border-solid border-neutral-800 ${router.pathname === '/contact' ? 'border-b' : ''}`}>
                    <Link href="/contact" className="text-neutral-800 hover:text-neutral-500 transition-colors">Contact</Link>
                </li>
            </ul>
        </nav>
    );
}

export default SiteHeader;
