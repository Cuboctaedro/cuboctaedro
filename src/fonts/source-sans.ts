import { Source_Sans_3 } from '@next/font/google';

const sourceSans = Source_Sans_3({
    subsets: ['latin'],
    variable: '--font-sourcesans',
    weight: ['200', '400', '700'],
    style: ['normal'],
});

export default sourceSans;
