import React from 'react';
import type { Project } from '../types';
import { ExternalLink, Github, Code } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-card border border-gray-800 rounded-xl overflow-hidden hover:border-primary/50 transition-colors shadow-lg"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg text-primary">
                        <Code size={24} />
                    </div>
                    <div className="flex gap-2">
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                <Github size={20} />
                            </a>
                        )}
                        {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                <ExternalLink size={20} />
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.split(',').map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-gray-800 text-gray-300 border border-gray-700">
                            {tech.trim()}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
