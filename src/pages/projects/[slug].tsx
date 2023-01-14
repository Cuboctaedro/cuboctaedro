import { Project } from '@/types/project';
import fs from 'fs';
import React from 'react';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';

function ProjectPage({ slug, data, content }: Project) {
    return (
        <>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: Project }> => {
    const { slug } = context.params as { slug: string };

    const filecontent = fs.readFileSync(`content/projects/${slug}.md`, 'utf-8');
    const parsedContent = matter(filecontent);
    const { data, content } = parsedContent;
    return {
        props: {
            slug,
            data,
            content,
        } as Project,
    };
};

export default ProjectPage;
