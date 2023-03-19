import { Post } from '@/types/post';
import React from 'react';
import Link from 'next/link';

interface PostSummaryProps {
    post: Post
}

function PostSummary({
    post,
}: PostSummaryProps) {
    return (
        <article>
            <p>{new Date(post.data.date).toDateString()}</p>
            <h2 className="font-bold pt-2">
                <Link href={`/blog/${post.slug}`}>
                    {post.data.title}
                </Link>
            </h2>
            <p className="">{post.data.description}</p>
        </article>
    );
}

export default PostSummary;
