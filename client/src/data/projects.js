import GatherHub from "../assets/Updated_GatherHub_Logo_Together_Here.png";
import ServerlessTaskTracker from "../assets/serverless-task-tracker.png";
import QubeePlatform from "../assets/qubee-platform.svg";
import EcomPlatform from "../assets/ecom-platform.svg";
import EvergreenPlaceholder from "../assets/evergreen-placeholder.svg";

export const projects = [
  {
    title: "Qubee",
    context: "Current contract",
    summary:
      "Full-stack cloud storage and media-processing platform for teams.",
    problem:
      "Teams needed reliable cloud storage, media workflows, permissions, uploads, processing, and third-party integrations in one production platform.",
    role:
      "Owned frontend, backend, database modeling, async workers, AWS infrastructure, deployments, operational debugging, and integrations.",
    outcome:
      "Maintained a production React, Node.js, GraphQL, MongoDB/DocumentDB, Redis, SQS, ECS, Lambda, S3, and CloudFront architecture.",
    image: QubeePlatform,
    tags: [
      "React",
      "Node.js",
      "GraphQL",
      "AWS",
      "MongoDB",
      "Redis",
      "SQS",
      "ECS",
      "Lambda",
      "S3",
    ],
  },
  {
    title: "E-commerce Starter Kit",
    context: "Client product",
    summary:
      "Production-ready full-stack e-commerce starter kit for client launches.",
    problem:
      "Small teams and founders lose weeks rebuilding auth, product catalogs, carts, checkout, admin workflows, and API docs for each commerce project.",
    role:
      "Designed a reusable NestJS API and Next.js storefront architecture with TypeScript, PostgreSQL, Prisma, role-based auth, checkout, admin tools, and Swagger docs.",
    outcome:
      "Packaged a client-ready starter kit that reduces boilerplate and gives buyers a maintainable full-stack foundation.",
    image: EcomPlatform,
    gitHub: "https://github.com/mikegoat1/ecom-starter-kit",
    tags: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Swagger",
      "Tailwind",
    ],
  },
  {
    title: "The Event",
    summary:
      "Event management app for creation, RSVP, attendee workflows, and updates.",
    problem:
      "Event organizers needed a single place to create events, manage attendees, and keep participants updated.",
    role:
      "Built the React and Node.js/MongoDB application flow, authentication, event creation, and attendee management experience.",
    outcome:
      "Delivered a live event platform with secure auth, event creation, RSVP flows, and a focused management interface.",
    image: GatherHub,
    link: "https://eventmanagementsystem-peach.vercel.app",
    gitHub: "https://github.com/mikegoat1/The-Eventers",
    tags: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "JWT",
      "Next.js",
    ],
  },
  {
    title: "Serverless Task Tracker",
    summary:
      "AWS serverless CRUD app with Lambda, API Gateway, DynamoDB, and S3.",
    problem:
      "The app needed a low-ops task workflow with reliable CRUD APIs, static hosting, and cloud monitoring without managing servers.",
    role:
      "Built the static frontend, Lambda-backed API, DynamoDB persistence, S3 hosting, API Gateway routes, and CloudWatch monitoring.",
    outcome:
      "Delivered a working serverless task tracker that demonstrates production AWS service composition and operational visibility.",
    image: ServerlessTaskTracker,
    link: "https://task-tracker-ui-michaeljohnson.s3.us-east-1.amazonaws.com/index.html",
    gitHub: "https://github.com/mikegoat1/Severless_Task_Tracker",
    tags: [
      "AWS Lambda",
      "API Gateway",
      "DynamoDB",
      "S3",
      "CloudWatch",
      "Python",
      "JavaScript",
    ],
  },
  {
    title: "Evergreen Grounds",
    summary: "Custom WordPress block theme for a local landscaping business — native Site Editor, design tokens via theme.json, and custom post types for services, projects, and testimonials.",
    description:
      "Custom WordPress block theme for a local landscaping business. Built with the native Site Editor (no page builder), a design-token system in theme.json, and four custom post types — service, project, testimonial, FAQ — with WP-CLI seed scripts for reproducible demo content.",
    image: EvergreenPlaceholder,
    gitHub: "https://github.com/mikegoat1/evergreen-grounds-theme",
    tags: ["WordPress", "PHP", "Gutenberg", "theme.json", "WP-CLI", "Block Theme"],
  },
];
