# Twinkl React Tech Test

This repository contains a React-based application developed as part of the Twinkl React Tech Test. The app implements a post listing interface with features like infinite scrolling, post deletion, and a search bar. The project uses Vite as the development environment, Tailwind CSS for styling, Vitest for unit testing, and Cypress for end-to-end testing.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [GitHub Actions Workflow](#github-actions-workflow)

---

## Features

1. **Post Listing**: Fetch posts from an API and display them in a scrollable view.
2. **Infinite Scrolling**: Load more posts as you scroll to the bottom.
3. **Search**: Filter posts by title.
4. **Post Deletion**: Remove posts from the list dynamically.
5. **Responsive Design**: Styled with Tailwind CSS for mobile and desktop views.
6. **Testing**: Includes unit tests (Vitest) and end-to-end tests (Cypress).

---

## Installation

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone git@github.com:your-username/twinkl-react-tech-test.git
   cd twinkl-react-tech-test
   ```

2. Install dependencies:

   ```bash
    npm install
   ```

3. Create an .env file in the project root:

   ```plaintext
    VITE_PORT=3000
   ```

4. Start the dev server:
   ```plaintext
    npm run dev
   ```

## Running the Tests

### Unit Tests with Vitest

1. Run the unit tests:

   ```bash
   npm run test
   ```

### End-To-End Tests with Cypress

1. Run the application in dev mode:

   ```bash
   npm run dev

   ```

2. Run Cypress GUI

   ```bash
   npm run cypress
   ```

3. Run Cypress CLI
   ```bash
   npx cypress run
   ```

## GitHub Actions Workflow

A CI pipeline is included to automate testing and deployment

### Workflow

1. Install Dependencies: Installs project dependencies via npm install.
2. Run Tests: Executes both unit tests (Vitest) and end-to-end tests (Cypress).

To trigger the pipeline:

Push to the main branch.
Open a pull request to the main branch
