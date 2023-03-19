import { Project } from '@/types/project';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
    project: Project
}

function ProjectCard({
    project,
}: ProjectCardProps) {
    return (
        <article className="pt-4">
            <Link href={`/projects/${project.slug}`}>
                <div className="relative w-72 h-72">
                    <Image
                        src={`/images/${project.data.featuredimage}`}
                        alt={project.data.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <h2 className="font-bold pt-2">{project.data.title}</h2>
                <p className="">{project.data.description}</p>
            </Link>
        </article>
    );
}

export default ProjectCard;
