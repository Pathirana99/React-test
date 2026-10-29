/**
 * Portfolio Content Data
 * 
 * Edit your personal information, profile image, projects, skills, and links here.
 */

export const personalInfo = {
  name: "Sunith",
  brandName: "Sunith.dev",
  role: "Full-Stack Developer",
  location: "Galle, SriLanka",
  experienceYears: "3+ Years Exp",
  
  /**
   * Profile Image:
   * Single image file located at public/profile.jpg
   */
  avatarUrl: "/profile.jpg",
  
  status: "Available for Full-Stack & Software Engineering Roles",
  headline: "Sunith P Pathirana",
  headlineGradient: "Software Engineer",
  bio: "Passionate Full-Stack Developer with solid industry and personal project experience, building scalable web applications, robust backend services, and modern interactive digital experiences.",
  contactTitle: "Get in touch",
  contactSubtitle: "Have a project in mind or want to discuss engineering opportunities? Drop a message below or reach out directly.",
  footerCopyright: "Sunith P Pathirana. All rights reserved."
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" }
];

export const socialLinks = {
  github: "https://github.com/Pathirana99",
  linkedin: "https://www.linkedin.com/in/sunith-p-pathirana-323b712a0",
  email: "mailto:sunithkaushalya.pp@gmail.com"
};

export const highlights = [
  {
    id: "systems",
    icon: "Cpu",
    title: "Systems Architecture",
    description: "Designing scalable cloud-native services with Go, Rust, and container orchestration."
  },
  {
    id: "frontend",
    icon: "Layers",
    title: "Frontend Polish",
    description: "Crafting high-performance user interfaces with React, Vite, and modern responsive design systems."
  },
  {
    id: "devops",
    icon: "Globe",
    title: "Reliability & CI/CD",
    description: "Automating testing pipelines and frictionless deployments via GitHub Actions."
  }
];

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "frontend", label: "Frontend" },
  { id: "ai", label: "AI" }
];

export const projects = [
  {
    id: 1,
    title: "Neural Cloud Orchestrator",
    category: "backend",
    image: "/projects/neural-cloud.jpg",
    description: "High-throughput microservices architecture built with Go and Kubernetes for dynamic serverless scaling.",
    tech: ["Go", "Kubernetes", "Docker", "gRPC"],
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    id: 2,
    title: "iOS-Grade Design System",
    category: "frontend",
    image: "/projects/ios-design.jpg",
    description: "A modern component library featuring accessible design tokens, micro-interactions, and responsive layout primitives.",
    tech: ["React", "Tailwind CSS", "Vite", "Framer Motion"],
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    id: 3,
    title: "Distributed KV Store",
    category: "backend",
    image: "/projects/distributed-kv.jpg",
    description: "Fault-tolerant distributed key-value storage engine implementing Raft consensus protocol from scratch.",
    tech: ["Rust", "Raft", "Distributed Systems", "Tokio"],
    github: "https://github.com",
    live: "https://example.com"
  },
  {
    id: 4,
    title: "AI Code Review Assistant",
    category: "ai",
    image: "/projects/ai-code-review.jpg",
    description: "LLM-powered static analysis tool that automatically detects security vulnerabilities and architectural smells.",
    tech: ["Python", "FastAPI", "OpenAI API", "TypeScript"],
    github: "https://github.com",
    live: "https://example.com"
  }
];

export const skills = [
  { id: "react", name: "React" },
  { id: "node", name: "Node.js" },
  { id: "springboot", name: "Spring Boot" },
  { id: "nextjs", name: "Next.js" },
  { id: "nestjs", name: "Nest.js" },
  { id: "medusajs", name: "Medusa.js" },
  { id: "java", name: "Java" },
  { id: "javascript", name: "JavaScript" },
  { id: "typescript", name: "TypeScript" },
  { id: "c", name: "C" },
  { id: "docker", name: "Docker" },
  { id: "mysql", name: "MySQL" },
  { id: "postgresql", name: "PostgreSQL" },
  { id: "cicd", name: "CI/CD" },
  { id: "git", name: "Git" },
  { id: "tailwindcss", name: "Tailwind CSS" },
  { id: "pwa", name: "PWA" }
];

export const experience = [
  {
    id: 1,
    role: "Software Engineer",
    company: "E-Life America(US)",
    period: "Present",
    description: "####################################",
    technologies: ["##########"]
  },
  {
    id: 2,
    role: "Associate Software Engineer",
    company: "iTerminal Technologies",
    period: "2026",
    description: "#######################################################################################################.",
    technologies: ["Medusa", "AWS", "CI/CD"]
  },
  {
    id: 3,
    role: "Software Engineer Intern",
    company: "iTerminal Technologies",
    period: "2025 - 2026",
    description: "#######################################################################################################.",
    technologies: ["JavaScript", "TypeScript", "MySQL", "PostgreSQL", "Docker", "Git","Spring-Boot", "React", "TailwindCss", "Next.js", "Nest.js"]
  }
];

export const education = [
  {
    id: 1,
    degree: "Degree / Bachelor of Science(Computer Science)",
    institution: "University of Ruhuna (SriLanka)",
    period: "Graduated",
    description: "#####################################################"
  }
];

