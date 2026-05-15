import { useState, useEffect } from "react";
import TopicSelector from "./components/TopicSelector";
import Quiz from "./components/Quiz";
import "./styles.css";

function App() {
  const [topic, setTopic] = useState(null);
  const [score, setScore] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [history, setHistory] = useState([]);

  // Load history
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizHistory")) || [];
    setHistory(saved);
  }, []);

  // After quiz
  const handleFinish = (finalScore, reviewData) => {
    setScore(finalScore);
    setAnswers(reviewData);

    const percentage = Math.round((finalScore / 3) * 100);

    const newEntry = {
      topic,
      score: finalScore,
      percentage
    };

    const updatedHistory = [...history, newEntry];
    setHistory(updatedHistory);

    localStorage.setItem("quizHistory", JSON.stringify(updatedHistory));
  };

  // Restart
  const handleRestart = () => {
    setTopic(null);
    setScore(null);
    setAnswers([]);
  };

  // Clear history
  const handleClearHistory = () => {
    localStorage.removeItem("quizHistory");
    setHistory([]);
  };

  return (
    <div>
      <h1 className="title">Smart Interview Preparation Platform</h1>

      {/* PREVIOUS ATTEMPTS */}
      {history.length > 0 && (
        <div className="card">
          <h2>📊 Previous Attempts</h2>

          {history.map((item, i) => (
            <p key={i}>
              {item.topic} - {item.score}/3 ({item.percentage}%)
            </p>
          ))}

          <button className="next-btn" onClick={handleClearHistory}>
            Clear History
          </button>
        </div>
      )}

      {/* TOPIC SELECT */}
      {!topic ? (
        <div className="card">
          <TopicSelector onSelectTopic={setTopic} />
        </div>
      ) : score === null ? (
        <Quiz topic={topic} onFinish={handleFinish} />
      ) : (
        /* RESULT SECTION */
        <div className="card">
          <h2>🎉 Quiz Completed</h2>

          <h3>Score: {score}/3</h3>

          <h3>Percentage: {Math.round((score / 3) * 100)}%</h3>

          {/* CLEAN PERFORMANCE MESSAGE */}
          <h4>
            {score === 3
              ? "Excellent 🚀"
              : score === 2
              ? "Good 👍"
              : "Need Improvement 📚"}
          </h4>

          {/* REVIEW */}
          <h2>📊 Review</h2>

          {answers.map((item, index) => (
            <div key={index}>
              <p><b>Q:</b> {item.question}</p>

              <p>
                <b>Your Answer:</b>{" "}
                <span style={{ color: item.isCorrect ? "green" : "red" }}>
                  {item.selected || "Not Answered"}
                </span>
              </p>

              {!item.isCorrect && (
                <p style={{ color: "green" }}>
                  <b>Correct Answer:</b> {item.correct}
                </p>
              )}

              <p>{item.isCorrect ? "✅ Correct" : "❌ Wrong"}</p>

              <hr />
            </div>
          ))}

          <button className="next-btn" onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

export default App;