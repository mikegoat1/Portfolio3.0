import Ticket from "../assets/ticket-scalper.png";
import Flicc from "../assets/FLICCPICKER.png";
import Lemon from "../assets/Logo.png";
import GatherHub from "../assets/Updated_GatherHub_Logo_Together_Here.png";
import ServerlessTaskTracker from "../assets/serverless-task-tracker.png";

export const projects = [
  {
    title: "The Event",
    description:
      "The Event Management System is a platform for organizing and managing events, enabling users to create events, RSVP, and receive updates with features like real-time chat, event analytics, and a calendar with reminders. Built with Node.js, MongoDB, React, and deployed on Heroku, it offers secure authentication, seamless event creation, and an intuitive interface for managing attendees.",
    image: GatherHub,
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
    title: "Little Lemon",
    description:
      "Little Lemon is a React-based website for a fictional restaurant, featuring a user-friendly interface to explore the menu, learn about the restaurant, and make table reservations seamlessly",
    image: Lemon,
    gitHub: "https://github.com/mikegoat1/Little-Lemon",
    tags: ["React", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Flick Picker",
    description:
      "Ticket-Scalper is a ticket search platform that dynamically aggregates sports, concert, and theater ticket listings from over 60 ticketing sites, offering a seamless and comprehensive browsing experience.",
    image: Flicc,
    link: "https://mikegoat1.github.io/FliccPicker/",
    gitHub: "https://github.com/mikegoat1/FliccPicker",
    tags: ["HTML5", "CSS3", "jQuery", "Ajax"],
  },
  {
    title: "Ticket Scalper",
    description:
      "Ticket-Scalper is a ticket search platform that dynamically aggregates sports, concert, and theater ticket listings from over 60 ticketing sites, offering a seamless and comprehensive browsing experience.",
    image: Ticket,
    link: "https://ticket-scalper-tdck.onrender.com",
    gitHub: "https://github.com/mikegoat1/Ticket-Scalper",
    tags: [
      "Handlebars",
      "Sequelize",
      "CSS3",
      "Sequelize",
      "Javascript",
      "Express-session",
      "DotEnv",
    ],
  },
  {
    title: "Serverless Task Tracker",
    description:
      "Serverless Task Tracker is a CRUD task management app built on AWS Lambda, API Gateway, DynamoDB, and S3, with CloudWatch monitoring. The static frontend lets users create, view, update, and delete tasks while the backend runs without server management.",
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
];
