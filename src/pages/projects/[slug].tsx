/* eslint-disable react/no-danger */
import { Project } from '@/types/project';
import fs from 'fs';
import React from 'react';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
// eslint-disable-next-line import/no-extraneous-dependencies
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

function ProjectPage({ data, content }: Project) {
    return (
        <>
            <Head>
                <title>{`${data.title} - Dimitris Kottas`}</title>
                <meta name="description" content={`${data.description} - Project by Dimitris Kottas`} />
            </Head>
            <div>
                <h1>{data.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: content }} />
                <div>
                    {data.gallery.map((picture) => (
                        <figure key={picture.filename} className="relative w-96 h-96">
                            <Image
                                src={`/images/${picture.filename}`}
                                alt={picture.caption}
                                fill
                                className="w-full object-contain"
                            />
                            <figcaption className="h-8">{picture.caption}</figcaption>
                        </figure>
                    ))}
                </div>
            </div>
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
            content: md.render(content),
        } as Project,
    };
};

export const getStaticPaths = async () => {
    const files = fs.readdirSync('content/projects');

    const projectPaths = files.map((file) => {
        const slug = file.replace('.md', '');
        return { params: { slug } };
    });

    return {
        paths: projectPaths,
        fallback: false, // can also be true or 'blocking'
    };
};

export default ProjectPage;
