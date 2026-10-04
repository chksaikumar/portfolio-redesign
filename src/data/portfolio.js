// Single source of truth for all portfolio content.

export const profile = {
  name: "Sai Kumar Chinthakayala",
  firstName: "Sai Kumar",
  lastName: "Chinthakayala",
  role: "Full-Stack Developer",
  roleAI: "Agentic AI Engineer",
  tagline:
    "I build production-ready web applications and practical AI systems that turn repetitive engineering work into reliable, reusable workflows.",
  location: "Newark, Delaware, United States",
  email: "chksaikumar@gmail.com",
  linkedin: "https://www.linkedin.com/in/chksaikumar/",
  github: "https://github.com/chksaikumar",
  portrait: "/assets/portrait.png",
  badge: "Open to full-stack and AI roles",
  stats: [
    { value: "6+", label: "years in software delivery" },
    { value: "AI + MCP", label: "agents, skills and LLM apps" },
    { value: "Java", label: "Spring Boot microservices" },
    { value: "React", label: "production frontends" },
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  heading: "Engineer by craft, automator by instinct",
  story: [
    {
      title: "Full-stack across the board",
      body: "6+ years building end to end: Python backends with Django, Flask and FastAPI, React frontends, REST APIs, PostgreSQL and MySQL, Docker containers and AWS deployments. I care about clean, maintainable code that survives contact with production.",
    },
    {
      title: "Hands-on with AI agents, daily",
      body: "Day to day I work hands-on with AI agents. I create new agents, build reusable skills for them, and automate repetitive engineering work like code analysis, debugging, test generation and documentation. It made my own work faster and easier, and I bring the same automation mindset to everything I build.",
    },
    {
      title: "Currently at JPMorganChase",
      body: "Java Full-Stack Developer (Contract) in Newark, Delaware. I build new features, support production systems and manage CI/CD pipelines on Java and Spring Boot.",
    },
  ],
  workflow: [
    { title: "Analyze", body: "Read the system before touching it. Code analysis agents do the first pass." },
    { title: "Automate", body: "Turn repetition into reusable skills, tests and docs generated, not hand-written." },
    { title: "Ship", body: "CI/CD pipelines, production support and features that hold up under real traffic." },
  ],
  chips: [
    "Python", "Java", "Spring Boot", "React", "Django", "Flask", "FastAPI",
    "PostgreSQL", "MySQL", "Docker", "AWS", "REST APIs", "Microservices",
  ],
};

export const experiences = [
  {
    company: "JPMorganChase",
    role: "Java Full-Stack Developer",
    type: "Contract",
    location: "Newark, Delaware",
    period: "2024 - Present",
    points: [
      "Build new features and support production systems on Java and Spring Boot.",
      "Manage CI/CD pipelines and keep releases reliable.",
      "Create AI agents and reusable skills that automate code analysis, debugging, test generation and documentation.",
    ],
    highlight: true,
    gitGraph: {
      branches: ["main", "feature/ai-agent", "hotfix/prod-fix"],
    },
  },
  {
    company: "Coderapper",
    role: "Full-Stack Developer",
    type: "Full-time",
    location: "Remote",
    period: "2022 - 2024",
    points: [
      "Built a chat agent inside the Shopify application using GPT endpoints to handle customer queries.",
      "Shipped full-stack features across React frontends and Python backends.",
      "Worked with REST APIs, databases and cloud deployments end to end.",
    ],
  },
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    type: "Contract",
    location: "Remote",
    period: "2020 - 2022",
    points: [
      "Delivered web applications for clients across e-commerce, media and tooling.",
      "Python backends (Django, Flask) and React frontends, deployed with Docker on AWS.",
    ],
  },
];

export const aiSkills = [
  "Agentic AI Development",
  "AI Agents",
  "Model Context Protocol (MCP)",
  "LLM Applications",
  "Prompt Engineering",
  "Generative AI",
  "Retrieval-Augmented Generation (RAG)",
  "LangChain",
  "Large Language Models (LLM)",
];

export const stackSkills = [
  "Python", "Java", "Spring Boot", "React", "JavaScript", "TypeScript",
  "Django", "Flask", "FastAPI", "Node.js", "REST APIs", "Microservices",
  "PostgreSQL", "MySQL", "MongoDB", "Docker", "Kubernetes", "AWS",
  "CI/CD", "Git", "SharePoint",
];

export const certifications = [
  { title: "Claude Code 101", issuer: "Anthropic", date: "Aug 2026" },
  { title: "Introduction to Model Context Protocol", issuer: "Anthropic", date: "Jul 2026" },
  { title: "Claude 101", issuer: "Anthropic", date: "Jul 2026" },
  { title: "AI Fluency Framework & Foundations", issuer: "Anthropic", date: "Jul 2026" },
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "May 2025" },
  { title: "Overview of Web GIS Technology", issuer: "IIRS / ISRO", date: "Jul 2021" },
  { title: "Version Control with Git", issuer: "Coursera", date: "Jun 2021" },
  { title: "CSS Essential Training", issuer: "LinkedIn Learning", date: "Mar 2021" },
  { title: "HTML Essential Training", issuer: "LinkedIn Learning", date: "Mar 2021" },
  { title: "Developers Guide to Python 3 Programming", issuer: "EDUONIX", date: "May 2020" },
  { title: "Crash Course on Python", issuer: "Google / Coursera", date: "Apr 2020" },
  { title: "The Complete Web Developer in 2020: Zero to Mastery", issuer: "Udemy", date: "Jun 2020" },
  { title: "Python for Beginners", issuer: "Udemy", date: "Jul 2019" },
];

export const projects = [
  {
    title: "NetflixGemini",
    tag: "React + Gemini AI",
    description:
      "A Netflix-style streaming UI supercharged with Gemini AI for smart, conversational content discovery.",
    image: "/assets/netflixgemini.png",
    link: "https://github.com/chksaikumar/NetflixGPT",
    linkLabel: "View Code",
  },
  {
    title: "FoodOrdering",
    tag: "React + REST APIs",
    description:
      "A Swiggy-style food ordering app with live restaurant listings, search, ratings and cart flow.",
    image: "/assets/foodordering.png",
    link: "https://swiggy-kappa-two.vercel.app/",
    linkLabel: "Live Demo",
  },
  {
    title: "CRP Clothing",
    tag: "React E-commerce",
    description:
      "A complete clothing storefront with categories, cart and checkout-ready product flows.",
    image: "/assets/crp-clothing.png",
    link: "https://github.com/chksaikumar/crp-clothing-",
    linkLabel: "View Code",
  },
  {
    title: "GitHub Profile Viewer",
    tag: "React + GitHub API",
    description:
      "Search any GitHub user and get a clean, visual profile summary with repos and stats.",
    image: "/assets/github-viewer.png",
    link: "https://github.com/chksaikumar",
    linkLabel: "View Code",
  },
  {
    title: "Job Heist",
    tag: "MERN Job Portal",
    description:
      "A full-stack job portal with listings, applications and role-based flows on the MERN stack.",
    image: null,
    link: "https://github.com/chksaikumar/Job-Heist-FE",
    linkLabel: "View Code",
  },
  {
    title: "AI-Powered Recommendation Engine",
    tag: "Python + Scikit-learn",
    description:
      "ML recommendations with Pandas and Scikit-learn, served over a Flask REST API with a React frontend.",
    image: null,
    link: "https://github.com/chksaikumar",
    linkLabel: "View Code",
  },
];

export const emailjs = {
  serviceId: "service_ko3hmpt",
  templateId: "template_ahbmmqd",
  publicKey: "I6HAT5mUZH7WHabGE",
};

export const heroNodes = ["AI Agents", "APIs", "CI/CD", "MCP", "LLM"];

export const floatingLogos = ["ChatGPT", "Claude", "Claude Code", "GitHub Copilot"];

export const chatbotSuggestions = [
  "What is Sai's experience?",
  "What AI skills does he have?",
  "Show me his projects",
  "How do I contact him?",
];

export const chatbotKB = [
  {
    keys: ["experience", "work", "job", "jpmorgan", "jpmc", "coderapper", "freelance", "career", "background"],
    answer:
      "Sai has 6+ years as a Full-Stack Developer. He is currently a Java Full-Stack Developer (Contract) at JPMorganChase in Newark, Delaware, building features, supporting production systems and managing CI/CD pipelines on Java and Spring Boot. Before that he was at Coderapper, where he built a chat agent inside a Shopify app using GPT endpoints, plus freelance full-stack work.",
  },
  {
    keys: ["ai", "agent", "mcp", "llm", "rag", "langchain", "prompt", "skill"],
    answer:
      "His AI skills: Agentic AI Development, AI Agents, Model Context Protocol (MCP), LLM Applications, Prompt Engineering, Generative AI, RAG, LangChain and Large Language Models. Day to day he creates AI agents and reusable skills that automate code analysis, debugging, test generation and documentation.",
  },
  {
    keys: ["project", "work", "portfolio", "built", "app"],
    answer:
      "Six projects: NetflixGemini (React + Gemini AI), FoodOrdering (Swiggy-style React app, live demo), CRP Clothing (React e-commerce), GitHub Profile Viewer, Job Heist (MERN job portal) and an AI-Powered Recommendation Engine (Python, Scikit-learn, Flask + React). Scroll to Selected Work to see them.",
  },
  {
    keys: ["certification", "certificate", "course", "credential", "aws"],
    answer:
      "13 certifications, including four from Anthropic (Claude Code 101, Intro to MCP, Claude 101, AI Fluency), AWS Certified Cloud Practitioner, plus Python, Git, HTML/CSS and web development courses. See the Certifications section for the full flow.",
  },
  {
    keys: ["contact", "email", "reach", "hire", "linkedin", "github", "phone"],
    answer:
      "You can reach Sai at chksaikumar@gmail.com, on LinkedIn at linkedin.com/in/chksaikumar, or via the contact form on this page. He is open to full-stack and AI roles.",
  },
  {
    keys: ["education", "degree", "study", "college", "university"],
    answer:
      "Sai's education details are on his LinkedIn profile at linkedin.com/in/chksaikumar. His practical background spans Python backends, React frontends, databases, Docker and AWS.",
  },
  {
    keys: ["who", "about", "sai", "name", "introduce"],
    answer:
      "Sai Kumar Chinthakayala is a Full-Stack Developer and Agentic AI Engineer with 6+ years of experience, based in Newark, Delaware. He builds production-ready web apps and practical AI systems that turn repetitive engineering work into reliable, reusable workflows.",
  },
  {
    keys: ["stack", "technology", "technologies", "language", "framework"],
    answer:
      "Python, Java, Spring Boot, React, JavaScript, TypeScript, Django, Flask, FastAPI, Node.js, REST APIs, microservices, PostgreSQL, MySQL, MongoDB, Docker, Kubernetes, AWS, CI/CD and Git.",
  },
];

export const chatbotFallback =
  "I don't have that in my notes. Want me to draft an email to Sai so he can answer directly?";
