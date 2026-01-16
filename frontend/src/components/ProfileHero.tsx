import React from 'react';
import { Github, Linkedin, Globe, Mail, MapPin, Twitter } from 'lucide-react';
import type { Profile } from '../types';

interface ProfileHeroProps {
    profile: Profile;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ profile }) => {
    const getIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'github': return <Github size={20} />;
            case 'linkedin': return <Linkedin size={20} />;
            case 'twitter': return <Twitter size={20} />;
            default: return <Globe size={20} />;
        }
    };

    return (
        <div className="bg-gradient-to-r from-card to-darker border-b border-gray-800 pb-12 pt-20 px-6">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-primary to-secondary p-1">
                        <div className="w-full h-full rounded-full bg-dark overflow-hidden flex items-center justify-center">
                            {profile.avatarUrl ? (
                                <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl font-bold text-gray-400">{profile.fullName.charAt(0)}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-center md:text-left flex-1">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">
                        {profile.fullName}
                    </h1>
                    <h2 className="text-xl text-primary font-medium mb-4">{profile.title}</h2>
                    <p className="text-gray-400 max-w-xl mx-auto md:mx-0 mb-6 leading-relaxed">
                        {profile.bio}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <MapPin size={16} />
                            {profile.location}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Mail size={16} />
                            <a href={`mailto:${profile.email}`} className="hover:text-primary transition-colors">{profile.email}</a>
                        </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-3">
                        {profile.links.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-white text-gray-400 transition-all transform hover:scale-110"
                            >
                                {getIcon(link.platform)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHero;
