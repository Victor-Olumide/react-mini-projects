# React Mini Projects

A collection of interactive mini-projects built with [Next.js](https://nextjs.org) and React, showcasing various functionalities and UI components. This project includes several small applications such as a BMI Calculator, Tic Tac Toe game, Password Generator, Character Counter, and a Quiz App.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page with links to all mini-projects.

You can start editing any project by modifying the corresponding page in `src/app/[project-name]/page.jsx`. The page auto-updates as you edit the file.

This project uses [Tailwind CSS](https://tailwindcss.com) for styling and [React Icons](https://react-icons.github.io/react-icons/) for icons.

## Mini Projects

- **BMI Calculator** ![BMI Calculator](/public/bmi-calc.png) - Calculate your Body Mass Index (BMI) based on height and weight inputs.
- **Tic Tac Toe** ![Tic Tac Toe](/public/tictactoe.png) - Play the classic two-player strategy game with a clean, responsive interface.
- **Password Generator** ![Password Generator](/public/passgen.png) - Generate strong, secure passwords with customizable options like length and character types.
- **Character Counter** ![Character Counter](/public/char-counter.png) - Count characters, words, and sentences in your text with real-time updates.
- **Quiz App** ![Quiz App](/public/quiz.png) - Test your knowledge with interactive quizzes featuring multiple-choice questions.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

```
├── public/
│   ├── bmi-calc.png
│   ├── char-counter.png
│   ├── fruit.jpg
│   ├── passgen.png
│   ├── questions.json
│   ├── quiz.png
│   ├── security.jpg
│   ├── tictactoe.png
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   ├── page.jsx          # Homepage
│   │   ├── bmi-calculator/
│   │   │   └── page.jsx
│   │   ├── character-counter/
│   │   │   └── page.jsx
│   │   ├── password-generator/
│   │   │   └── page.jsx
│   │   ├── quiz-app/
│   │   │   └── page.jsx
│   │   └── tic-tac-toe/
│   │       └── page.jsx
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.js
├── package.json
├── postcss.config.mjs
└── README.md
```
