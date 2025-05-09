# Simple Blog Project

A simple blog website built with Node.js and Express, using file-based storage.

## Features

- Create and view blog posts
- Responsive design using Bootstrap
- File-based storage (no database required)

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd blog-project
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

- `server.js` - Main application file
- `views/` - EJS templates
- `public/` - Static files (CSS, images)
- `data/` - JSON file storage for blog posts

## Technologies Used

- Node.js
- Express.js
- EJS (templating)
- Bootstrap 5
- UUID (for generating unique IDs) 