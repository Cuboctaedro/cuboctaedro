import { Project } from '@/types/project';
import fs from 'fs';
import React from 'react';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';

interface ProjectsProps {
    projects: Array<Project>
}

function Projects({ projects }: ProjectsProps) {
    return (
        <div>
            {projects.map((project) => (
                <article key={project.data.title}>
                    <h2>{project.data.title}</h2>
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

    return {
        props: {
            projects,
        },
    };
};

export default Projects;
