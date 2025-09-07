export const metadata = {
  title: "React Mini Projects",
};

import Link from "next/link";

export default function Home() {
  const projects = [
    {
      name: "BMI Calculator",
      path: "/bmi-calculator",
      desc: "Calculate BMI instantly based on height and weight."
    },
    {
      name: "Tic Tac Toe",
      path: "/tic-tac-toe",
      desc: "Play the classic two-player strategy game."
    },
    {
      name: "Password Generator",
      path: "/password-generator",
      desc: "Generate strong, secure, and customizable passwords."
    },
    {
      name: "Character Counter",
      path: "/character-counter",
      desc: "Count characters, words, and sentences in your text."
    },
    {
      name: "Quiz App",
      path: "/quiz-app",
      desc: "Test your knowledge with fun quizzes."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">
        React Mini Projects
      </h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl">
        {projects.map((project) => (
          <Link key={project.path} href={project.path}>
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {project.name}
              </h2>
              <p className="text-gray-600">{project.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
