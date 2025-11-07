'use client';
import React, { useState } from 'react';
import { useGetQuizQuestions, useGetQuizResults } from '@/hooks/useCourses';

export default function QuizComponent({ data, onQuizCompleted }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  console.log(data, "quiz data");
  const { data: quizData, isLoading } = useGetQuizQuestions(data.quiz);

  const {
    mutate: submitAnswers,
    isLoading: submitAnswersLoading,
    data: submitAnswersData
  } = useGetQuizResults();

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (questionId, selectedOption) => {
    if (quizCompleted) return;

    setSelectedAnswers((prev) => {
      const existing = prev.find((ans) => ans.questionId === questionId);
      if (existing) {
        return prev.map((ans) =>
          ans.questionId === questionId ? { ...ans, selected: selectedOption } : ans
        );
      }
      return [...prev, { questionId, selected: selectedOption }];
    });
  };

  const calculateScore = () => {
    submitAnswers(
      {
        quizId: data.quiz,
        answers: selectedAnswers
      },
      {
        onSuccess: () => {
          setQuizCompleted(true);
          if (onQuizCompleted) {
            onQuizCompleted();
          }
        },
        onError: (err) => {
          console.error("Quiz submission error:", err);
        }
      }
    );
  };

  const getAnswerStatus = (questionId, option) => {
    const result = submitAnswersData?.results?.find(q => q.questionId === questionId);
    if (!result) return '';

    if (result.selected === option && result.isCorrect) return 'bg-green-100 border-green-500';
    if (result.selected === option && !result.isCorrect) return 'bg-red-100 border-red-500';
    return '';
  };

  if (!quizStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
        <button
          onClick={handleStartQuiz}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xl">Loading questions...</div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="mx-auto p-6 w-full">
        <h2 className="text-2xl font-bold mb-6">Quiz Completed!</h2>
        <div className="text-xl mb-8">
          Your Score: {submitAnswersData.scoreObtained} / {submitAnswersData.totalScore}
        </div>

        {submitAnswersData.results.map((q, index) => (
          <div key={q.questionId} className="bg-white border rounded-lg p-6 mb-6 shadow">
            <div className="text-lg font-semibold mb-3">
              {index + 1}. {q.question}
            </div>
            <div className="space-y-2">
              {quizData?.questions.find((qq) => qq.questionId === q.questionId)?.options.map((opt, idx) => {
                const optionText = typeof opt === 'object' ? opt.option : opt;
                const optionId = typeof opt === 'object' ? opt.id : idx;
                
                return (
                  <div
                    key={optionId}
                    className={`p-3 border rounded-lg ${
                      getAnswerStatus(q.questionId, optionText)
                    }`}
                  >
                    {optionText}
                  </div>
                );
              })}
            </div>
            {!q.isCorrect && (
              <div className="mt-3 text-sm text-gray-600">
                ✅ Correct Answer: <span className="font-medium">{q.correctAnswer}</span>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={() => {
            setQuizStarted(false);
            setSelectedAnswers([]);
            setQuizCompleted(false);
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 w-full ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{quizData?.quizTitle}</h2>
        <div className="text-lg font-medium">Total Score: {quizData?.totalScore}</div>
      </div>

      <div className="space-y-8">
        {quizData?.questions.map((question, index) => (
          <div key={question.questionId} className="bg-white rounded-lg p-6 ">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                {index + 1}. {question.question}
              </div>
              <div className="text-sm text-gray-600">Score: {question.score}</div>
            </div>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => {
                const optionText = typeof option === 'object' ? option.option : option;
                const optionId = typeof option === 'object' ? option.id : optionIndex;
                
                return (
                  <div
                    key={optionId}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedAnswers.find(ans => ans.questionId === question.questionId)?.selected === optionText
                        ? 'bg-blue-100 border-blue-500'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleAnswerSelect(question.questionId, optionText)}
                  >
                    {optionText}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={calculateScore}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
