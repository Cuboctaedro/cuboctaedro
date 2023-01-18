import { Project } from '@/types/project';
import fs from 'fs';
import React from 'react';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectsProps {
    projects: Array<Project>
}

function Projects({ projects }: ProjectsProps) {
    return (
        <div>
            {projects.map((project) => (
                <article key={project.data.title}>
                    <Link href={`/projects/${project.slug}`}>
                        <div>
                            {project.data.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>
                        <div className="relative w-56 h-56">
                            <Image
                                src={`/images/${project.data.featuredimage}`}
                                alt={project.data.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h2>{project.data.title}</h2>
                        <p>{project.data.description}</p>
                    </Link>
                </article>
            ))}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const files = fs.readdirSync('content/projects');

    const projects = files.map((file) => {
        const slug = file.replace('.md', '');
        const filecontent = fs.readFileSync(`content/projects/${file}`, 'utf-8');
        const parsedContent = matter(filecontent);
        const { data, content } = parsedContent;
        return {
            slug,
            data,
            content,
        };
    });

    projects.sort((a, b) => (a.data.order - b.data.order));

    return {
        props: {
            projects,
        },
    };
};

export default Projects;
