import React from 'react';

interface HeadingProps {
    title: string
    level?: 1 | 2
}

function Heading({
    title,
    level,
}: HeadingProps) {
    if (level === 2) {
        return (
            <h2 className="text-4xl font-extralight pb-4 pt-2 border-t border-solid border-red-700">{title}</h2>
        );
    }
    return (
        <h1 className="text-4xl font-extralight pb-4 pt-2 border-t border-solid border-red-700">{title}</h1>
    );
}

Heading.defaultProps = {
    level: 1,
};

export default Heading;
