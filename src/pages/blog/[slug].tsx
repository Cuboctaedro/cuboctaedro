/* eslint-disable react/no-danger */
import { Post } from '@/types/post';
import fs from 'fs';
import React from 'react';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import Head from 'next/head';
// eslint-disable-next-line import/no-extraneous-dependencies
import MarkdownIt from 'markdown-it';
import Heading from '@/components/heading';

const md = new MarkdownIt();

function PostPage({ data, content }: Post) {
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
                        <div className="">{new Date(data.date).toDateString()}</div>
                    </div>

                    <div className="w-column-1 lg:w-column-2 xl:w-column-3">
                        <div className="generated" dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </div>
            </article>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context): Promise<{ props: Post }> => {
    const { slug } = context.params as { slug: string };

    const filecontent = fs.readFileSync(`content/blog/${slug}.md`, 'utf-8');
    const parsedContent = matter(filecontent);
    const { data, content } = parsedContent;
    return {
        props: {
            slug,
            data: {
                title: data.title,
                date: data.date.getTime(),
                description: data.description,
            },
            content: md.render(content),
        } as Post,
    };
};

export const getStaticPaths = async () => {
    const files = fs.readdirSync('content/blog');

    const blogPaths = files.map((file) => {
        const slug = file.replace('.md', '');
        return { params: { slug } };
    });

    return {
        paths: blogPaths,
        fallback: false, // can also be true or 'blocking'
    };
};

export default PostPage;
