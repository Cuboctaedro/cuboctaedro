import { Project } from '@/types/project';
import fs from 'fs';
import React from 'react';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import ProjectCard from '@/components/project-card';

interface ProjectsProps {
    projects: Array<Project>
}

function Projects({ projects }: ProjectsProps) {
    return (
        <>
            <Head>
                <title>Projects - Dimitris Kottas</title>
                <meta name="description" content="Web development and graphic design projects by Dimitris Kottas" />
            </Head>
            <div className="grid w-container-1 sm:w-container-2 lg:w-container-3 xl:w-container-4 gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto">
                {projects.map((project) => (
                    <ProjectCard key={project.data.title} project={project} />
                ))}
            </div>

        </>
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
