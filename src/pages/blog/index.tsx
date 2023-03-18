import { Post } from '@/types/post';
import fs from 'fs';
import React from 'react';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import Head from 'next/head';

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
            <div>content</div>
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
            data,
            content,
        };
    });

    posts.sort((a, b) => (a.data.date.getTime() - b.data.date.getTime()));

    return {
        props: {
            posts,
        },
    };
};

export default Blog;
