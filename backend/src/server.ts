import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Get Profile (assumes single profile for now, or fetch by ID if needed)
// For this playground, we return the first profile found or a specific ID.
app.get('/profile', async (req, res) => {
    try {
        const profile = await prisma.profile.findFirst({
            include: {
                skills: true,
                projects: true,
                experience: true,
                education: true,
                links: true,
            },
        });
        if (!profile) return res.status(404).json({ error: 'Profile not found' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update Profile
app.put('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updated = await prisma.profile.update({
            where: { id: Number(id) },
            data: {
                ...data,
                // Handle nested updates if necessary, but skipping for basic 'update profile info'
            },
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// Get Projects (with filters)
app.get('/projects', async (req, res) => {
    const { skill } = req.query;
    try {
        const whereClause: any = {};

        // Naive text match for skill in techStack or querying related Skill model?
        // Requirement says: GET /projects?skill=python
        // Since techStack is a string, we can search it. 
        // OR we could look up the profile's projects where the profile has that skill? 
        // Usually it means "projects that use this skill".
        if (skill) {
            whereClause.techStack = {
                contains: String(skill), // Case sensitive usually in SQLite, but let's try
            };
        }

        const projects = await prisma.project.findMany({
            where: whereClause,
        });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get Top Skills (just listing all for now, or sorted by some metric if we had one)
app.get('/skills/top', async (req, res) => {
    try {
        const skills = await prisma.skill.findMany({
            take: 10,
        });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Search Endpoint
app.get('/search', async (req, res) => {
    const { q } = req.query;
    if (!q) return res.json([]);

    const query = String(q);

    try {
        // Search projects and skills
        const [statsProjects, statsSkills, statsExperience] = await Promise.all([
            prisma.project.findMany({
                where: {
                    OR: [
                        { title: { contains: query } },
                        { description: { contains: query } },
                        { techStack: { contains: query } }
                    ]
                }
            }),
            prisma.skill.findMany({
                where: { name: { contains: query } }
            }),
            prisma.workExperience.findMany({
                where: {
                    OR: [
                        { company: { contains: query } },
                        { role: { contains: query } },
                        { description: { contains: query } }
                    ]
                }
            })
        ]);

        res.json({
            projects: statsProjects,
            skills: statsSkills,
            experience: statsExperience
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
