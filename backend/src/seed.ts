import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.link.deleteMany();
  await prisma.education.deleteMany();
  await prisma.workExperience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  const profile = await prisma.profile.create({
    data: {
      fullName: 'Angad Aheer',
      title: 'AI & Data Science Undergraduate',
      bio: 'Aspiring developer with expertise in AI/ML and Full Stack Web Development. Passionate about building data-driven solutions.',
      email: 'ahirangad66@gmail.com',
      location: 'Delhi, India',
      skills: {
        create: [
          // Languages
          { name: 'Python', category: 'Language' },
          { name: 'C/C++', category: 'Language' },
          { name: 'SQL', category: 'Language' },
          { name: 'JavaScript', category: 'Language' },
          { name: 'HTML', category: 'Language' },
          { name: 'CSS', category: 'Language' },
          // Libraries & Frameworks
          { name: 'React', category: 'Framework' },
          { name: 'TensorFlow', category: 'ML/DL' },
          { name: 'Keras', category: 'ML/DL' },
          { name: 'PyTorch', category: 'ML/DL' },
          { name: 'Scikit-learn', category: 'ML/DL' },
          { name: 'Pandas', category: 'Data Analysis' },
          { name: 'NumPy', category: 'Data Analysis' },
          { name: 'Matplotlib', category: 'Data Analysis' },
          { name: 'Streamlit', category: 'Framework' },
          { name: 'NLTK', category: 'ML/DL' },
          // Tools
          { name: 'Git', category: 'Tool' },
          { name: 'GitHub', category: 'Tool' },
          { name: 'VS Code', category: 'Tool' },
          { name: 'Jupyter Notebook', category: 'Tool' },
        ],
      },
      projects: {
        create: [
          {
            title: 'AgriNova',
            description: 'A web application to assist farmers by integrating ML, DL and data-driven solutions. Detects plant diseases using CNN, suggests crops/fertilizers based on environment, and provides real-time weather using OpenWeatherMap API.',
            techStack: 'Python, Streamlit, TensorFlow, Scikit-learn, Matplotlib',
            repoUrl: 'https://github.com/angad-1407', // Placeholder based on github handle
            demoUrl: 'https://agrinova-ecspappfaiebprgcbjeynmi.streamlit.app/',
          },
          {
            title: 'PixelPlayground',
            description: 'A collection of 3 front-end projects: Tic-Tac-Toe Game, Book List App, and Pulsify song app. Implemented Object Oriented Programming and deployed on Github and Netlify.',
            techStack: 'HTML, CSS, JavaScript, Netlify, Git',
            repoUrl: 'https://github.com/angad-1407',
            demoUrl: 'https://angad-1407.github.io/PixelPlayground/',
          },
          {
            title: 'Skin Disease Classification',
            description: 'Built initial dataset with augmentation and analyzed different pretrained model architectures. Currently working on improving accuracy on MobileNET model using hypertuning.',
            techStack: 'Keras, TensorFlow, Scikit-Learn, Pandas, NumPy',
            repoUrl: null,
            demoUrl: null,
          },
        ],
      },
      experience: {
        create: [
          {
            company: 'Training and Placement Cell, NIT Delhi',
            role: 'Database Head',
            startDate: new Date('2024-09-01'),
            description: 'Currently managing and updating recruiter and company databases using Excel.',
          },
          {
            company: 'Social Reform Cell, NIT Delhi',
            role: 'Executive Member',
            startDate: new Date('2023-09-01'),
            description: 'Contributing to event planning and poster designing for social initiatives.',
          },
        ],
      },
      education: {
        create: [
          {
            school: 'National Institute of Technology Delhi',
            degree: 'B.Tech AI & Data Science',
            year: '2023 - 2027',
          },
          {
            school: 'Govt. Sr. Sec. School, Rajendra Marg, Bhilwara',
            degree: 'Senior Secondary (Class XII)',
            year: '2021 - 2022',
          },
        ],
      },
      links: {
        create: [
          { platform: 'GitHub', url: 'https://github.com/angad-1407' },
          { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/angad-aheer-895630317/' },
          { platform: 'Leetcode', url: 'https://leetcode.com/u/angad_aheer/' },
          { platform: 'Portfolio', url: 'https://angad-1407.github.io/Angad-portfolio/' }
        ],
      },
    },
  });

  console.log('Seed data created:', profile);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
