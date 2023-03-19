import { Post } from '@/types/post';
import fs from 'fs';
import React from 'react';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Heading from '@/components/heading';
import PostSummary from '@/components/post-summary';

interface PostsProps {
    posts: Array<Post>
}

function Blog({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Blog - Dimitris Kottas</title>
                <meta name="description" content="Blog by Dimitris Kottas" />
            </Head>
            <section className="w-container-1 sm:w-container-2 lg:w-container-3 xl:w-container-4 mx-auto px-4">
                <Heading title="Blog" />
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-8">
                    {posts.map((post) => (
                        <PostSummary post={post} />
                    ))}
                </div>
            </section>
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const files = fs.readdirSync('content/blog');

    const posts = files.map((file) => {
        const slug = file.replace('.md', '');
        const filecontent = fs.readFileSync(`content/blog/${file}`, 'utf-8');
        const parsedContent = matter(filecontent);
        const { data, content } = parsedContent;
        return {
            slug,
            data: {
                title: data.title,
                date: data.date.getTime(),
                description: data.description,
            },
            content,
        };
    });

    posts.sort((a, b) => (a.data.date - b.data.date));

    return {
        props: {
            posts,
        },
    };
};

export default Blog;
