import { useEffect, useState } from 'react';
import { getProfile, getProjects, search } from './api';
import { type Profile, type Project } from './types';
import ProfileHero from './components/ProfileHero';
import ProjectCard from './components/ProjectCard';
import { Search, Loader, Briefcase, GraduationCap } from 'lucide-react';

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      setProjects(data.projects); // Initial projects
    } catch (error) {
      console.error('Failed to load profile', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      resetFilters();
      return;
    }

    // Use the search endpoint
    try {
      const results = await search(searchQuery);
      // Search returns { projects, skills, experience }
      // For the project list, we just show projects found.
      setProjects(results.projects || []);
      setActiveFilter(`Search: "${searchQuery}"`);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleSkillClick = async (skillName: string) => {
    setSearchQuery('');
    try {
      const results = await getProjects(skillName);
      setProjects(results);
      setActiveFilter(`Skill: ${skillName}`);
    } catch (error) {
      console.error("Filter failed", error);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setActiveFilter(null);
    if (profile) setProjects(profile.projects);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-darker flex items-center justify-center text-white">
        <Loader className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-darker flex items-center justify-center text-white">
        <p>Profile not found. Make sure the backend is running and seeded.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darker text-gray-100 font-sans selection:bg-primary selection:text-white">
      <ProfileHero profile={profile} />

      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">

        {/* Skills Section */}
        <section>
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-1 bg-primary rounded-full"></span>
            Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => handleSkillClick(skill.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeFilter === `Skill: ${skill.name}`
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-card border border-gray-800 hover:border-primary/50 text-gray-300 hover:text-white'
                  }`}
              >
                {skill.name}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-8 h-1 bg-secondary rounded-full"></span>
              Projects
            </h3>

            <form onSubmit={handleSearch} className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search projects, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-gray-800 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-600"
              />
            </form>
          </div>

          {activeFilter && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-gray-400 text-sm">Showing results for: <strong className="text-white">{activeFilter}</strong></span>
              <button onClick={resetFilters} className="text-xs text-primary hover:underline">Clear</button>
            </div>
          )}

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 bg-card/50 rounded-xl border border-gray-800 border-dashed">
              No projects found matching your criteria.
            </div>
          )}
        </section>

        {/* Experience & Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Experience */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Briefcase className="text-primary" />
              Experience
            </h3>
            <div className="space-y-6">
              {profile.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-800">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-darker border-2 border-primary"></div>
                  <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-primary font-medium">{exp.company}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(exp.startDate).getFullYear()} -
                      {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <GraduationCap className="text-secondary" />
              Education
            </h3>
            <div className="space-y-4">
              {profile.education.map((edu) => (
                <div key={edu.id} className="bg-card p-4 rounded-lg border border-gray-800">
                  <h4 className="text-white font-bold">{edu.school}</h4>
                  <p className="text-gray-400">{edu.degree}</p>
                  <p className="text-xs text-gray-500 mt-1">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

      </main>

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-gray-800 mt-12 bg-card">
        <p>© {new Date().getFullYear()} {profile.fullName}. Built with React, Tailwind & Node.</p>
        <p className="mt-2 text-xs opacity-50">Deployed for candidate assessment.</p>
      </footer>
    </div>
  );
}

export default App;
