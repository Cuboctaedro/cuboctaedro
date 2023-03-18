import { Source_Sans_Pro } from '@next/font/google';

const sourceSans = Source_Sans_Pro({
    subsets: ['latin'],
    variable: '--font-sourcesans',
    weight: ['200', '400', '700'],
    style: ['normal'],
});

export default sourceSans;
