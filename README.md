# React Quiz App

This project is a React-based quiz application that allows users to take quizzes by answering multiple-choice questions. It fetches questions from a fake API and presents them one by one, tracking progress and providing feedback along the way.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [How to Run](#how-to-run)
- [Technologies Used](#technologies-used)
- [Learning Summary](#learning-summary)

## Features

- **Managing State with `useReducer`:** Utilized `useReducer` to manage complex state logic, making it easier to handle various actions and transitions within the application.
- **Fetching Questions from a Fake API:** Implemented functionality to fetch questions from a fake API, allowing users to experience a dynamic quiz environment.
- **Handling Loading and Error States:** Managed loading and error states gracefully to provide a smooth user experience even when dealing with asynchronous operations.
- **Displaying Quiz Progress:** Implemented features to display the current question number and overall progress throughout the quiz.
- **Setting Up Timer with `useEffect`:** Utilized `useEffect` to set up a timer for each question, ensuring a time-limited quiz experience.

## Project Structure

- **src/components:** Contains reusable React components used throughout the application.
- **src/hooks:** Houses custom hooks, including state management and side effect hooks.
- **src/utils:** Includes utility functions for handling API requests and data manipulation.

## How to Run

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server with `npm start`.

## Technologies Used

- React
- JavaScript (ES6+)
- HTML/CSS
- Hooks (useReducer, useEffect)

## Learning Summary

Throughout this project, I gained a deeper understanding of state management in React, especially when dealing with complex state transitions. Additionally, I honed my skills in handling asynchronous operations and side effects effectively using hooks like `useEffect`.

For a more detailed comparison between `useState` and `useReducer`, refer to the section summary provided in the course materials.
