"use client";
import { useState, useEffect } from "react";
import { MdOutlineTimer } from 'react-icons/md';
import { PiSquaresFourFill } from 'react-icons/pi';
import { MdQuiz } from 'react-icons/md';

export default function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    try {
      const savedQuestions = localStorage.getItem('quizQuestions');
      let questionsData;
      if (savedQuestions) {
        questionsData = JSON.parse(savedQuestions);
      } else {
        const res = await fetch("/questions.json");
        const data = await res.json();
        questionsData = [...data].sort(() => Math.random() - 0.5);
        localStorage.setItem('quizQuestions', JSON.stringify(questionsData));
      }
      setQuestions(questionsData);
      setAnswers(new Array(questionsData.length).fill(""));

      // Load saved state
      const savedAnswers = localStorage.getItem('quizAnswers');
      if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);
        if (parsedAnswers.length === questionsData.length) {
          setAnswers(parsedAnswers);
        }
      }
      const savedCurrent = localStorage.getItem('quizCurrent');
      if (savedCurrent && parseInt(savedCurrent) < questionsData.length) {
        setCurrent(parseInt(savedCurrent));
      }
      const savedTimeLeft = localStorage.getItem('quizTimeLeft');
      if (savedTimeLeft) {
        setTimeLeft(parseInt(savedTimeLeft));
      }
      const savedStarted = localStorage.getItem('quizStarted');
      if (savedStarted) {
        setStarted(savedStarted === 'true');
      }
      const savedShowScore = localStorage.getItem('quizShowScore');
      if (savedShowScore) {
        setShowScore(savedShowScore === 'true');
      }
      const savedScore = localStorage.getItem('quizScore');
      if (savedScore) {
        setScore(parseInt(savedScore));
      }
    } catch (error) {
      console.error("Failed to load questions:", error);
    }
  }

  useEffect(() => {
    if (!started || showScore) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showScore, started]);

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('quizCurrent', current.toString());
  }, [current]);

  useEffect(() => {
    localStorage.setItem('quizTimeLeft', timeLeft.toString());
  }, [timeLeft]);

  useEffect(() => {
    localStorage.setItem('quizStarted', started.toString());
  }, [started]);

  useEffect(() => {
    localStorage.setItem('quizShowScore', showScore.toString());
  }, [showScore]);

  useEffect(() => {
    localStorage.setItem('quizScore', score.toString());
  }, [score]);

  const handleNext = () => {
    if (current + 1 < questions.length) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSelect = (option) => {
    const updated = [...answers];
    updated[current] = option;
    setAnswers(updated);
  };

  const handleSubmit = () => {
    const totalScore = answers.reduce(
      (acc, ans, idx) => acc + (ans === questions[idx]?.answer ? 1 : 0),
      0
    );
    setScore(totalScore);
    setShowScore(true);
  };

  const startQuiz = () => {
    setStarted(true);
    setTimeLeft(600);
    if (answers.length === 0 && questions.length > 0) {
      setAnswers(new Array(questions.length).fill(""));
    }
  };

  const restartQuiz = () => {
    localStorage.removeItem('quizQuestions');
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizCurrent');
    localStorage.removeItem('quizTimeLeft');
    localStorage.removeItem('quizStarted');
    localStorage.removeItem('quizShowScore');
    localStorage.removeItem('quizScore');
    setCurrent(0);
    setAnswers(new Array(questions.length).fill(""));
    setScore(0);
    setShowScore(false);
    setTimeLeft(600);
    setStarted(true);
  };

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  if (!started) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="bg-white rounded-2xl p-8 w-[420px] text-center">
          <h1 className="flex gap-x-2 text-3xl font-bold mb-6"><MdQuiz className="text-blue-600" /> Welcome to the Quiz!</h1>
          <h2 className="text-lg font-semibold pb-4">You are required to answer {questions.length} questions under {formatTime(timeLeft)} mins, Good luck Champ!</h2>
          <button
            onClick={startQuiz}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-lg"
          >
            Start Quiz
          </button>
        </div>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        Loading...
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-white rounded-2xl w-full max-w-3xl mx-4 text-center">

        {!showScore && (
          <div className="pt-8 px-8 shadow-lg w-full flex justify-between items-center text-gray-600 font-medium mb-6">
            <h1 className="flex text-xl font-bold mb-4"><PiSquaresFourFill/> Quiz</h1>
            <span>
              Question {current + 1} / {questions.length}
            </span>
            <span className="flex gap-x-1 text-red-500 font-semibold"><MdOutlineTimer/> {formatTime(timeLeft)}</span>
          </div>
        )}

        {showScore ? (
          <div className="p-8">
            <h2 className="text-xl mb-6">
              You scored {score} out of {questions.length}
            </h2>

            {questions.map((q, idx) => (
              <div key={idx} className="mb-6 text-left">
                <h3 className="font-semibold mb-2">{q.question}</h3>
                {q.options.map((option, i) => {
                  let btnClass = "px-3 py-2 border rounded w-full text-left mb-2 ";
                  if (option === q.answer) {
                    btnClass += "bg-green-200 border-green-600";
                  } else if (answers[idx] === option && option !== q.answer) {
                    btnClass += "bg-red-200 border-red-600";
                  } else {
                    btnClass += "bg-gray-50";
                  }
                  return (
                    <div key={i} className={btnClass}>
                      <span className="font-bold">{String.fromCharCode(65 + i)}.</span> {option}
                    </div>
                  );
                })}
              </div>
            ))}

            <button
              onClick={restartQuiz}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
              Retake Quiz
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-lg mb-4">{questions[current].question}</h2>
            <div className="px-4 flex flex-col space-y-2 mb-4">
              {questions[current].options.map((option, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-2 border rounded flex items-center gap-x-2 ${
                    answers[current] === option
                      ? "bg-blue-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <span className="font-bold">{String.fromCharCode(65 + idx)}.</span> {option}
                </button>
              ))}
            </div>

            <div className="px-4 gap-x-2 flex flex-wrap justify-end mb-6">
              <button
                onClick={handlePrev}
                disabled={current === 0}
                className={`px-4 py-2 rounded ${
                  current === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-500 text-white"
                }`}
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={current === questions.length - 1}
                className={`px-4 py-2 rounded ${
                  current === questions.length - 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
              >
                Next
              </button>
            </div>

            <div className="px-4 pb-8 flex flex-wrap justify-start">
            <button
              onClick={handleSubmit}
              disabled={answers.every((a) => a === "")}
              className={`w-sm px-4 py-2 rounded ${
                answers.every((a) => a === "")
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
            >
              Submit
            </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
