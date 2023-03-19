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
import Heading from '@/components/heading';
import Link from 'next/link';

const md = new MarkdownIt();

function ProjectPage({ data, content }: Project) {
    return (
        <>
            <Head>
                <title>{`${data.title} - Dimitris Kottas`}</title>
                <meta name="description" content={`${data.description} - Project by Dimitris Kottas`} />
            </Head>
            <article className="w-container-1 sm:w-container-2 lg:w-container-3 xl:w-container-4 mx-auto px-4 ">
                <Heading title={data.title} />
                <div className="flex flex-wrap gap-8 pt-8">
                    <div className="w-column-1">
                        <div className="generated" dangerouslySetInnerHTML={{ __html: content }} />
                        {typeof data.link !== 'undefined' && (
                            <Link href={data.link} target="_blank" className="mt-8 px-8 py-4 inline-flex items-center justify-center bg-neutral-800 text-white hover:bg-red-700 transition-colors uppercase tracking-wide text-sm">Visit the website</Link>
                        )}
                    </div>

                    <div className="w-column-1 lg:w-column-2 xl:w-column-3">
                        {data.gallery.map((picture) => (
                            <figure key={picture.filename} className="relative w-column-1 lg:w-column-2 xl:w-column-3 h-column-1 lg:h-column-2 xl:h-column-3 mb-8">
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
            </article>
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
