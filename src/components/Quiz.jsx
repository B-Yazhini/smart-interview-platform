import { useState, useEffect } from "react";
import { questions } from "../data/questions";

function Quiz({ topic, onFinish }) {
  const data = questions[topic];

  const [q, setQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [time, setTime] = useState(30);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [q]);

  const handleNext = () => {
    const current = data[q];
    const isCorrect = selected === current.answer;

    const newEntry = {
      question: current.question,
      selected,
      correct: current.answer,
      isCorrect
    };

    const updatedAnswers = [...answers, newEntry];
    setAnswers(updatedAnswers);

    let newScore = score;
    if (isCorrect) newScore++;

    setScore(newScore);
    setSelected("");

    if (q + 1 < data.length) {
      setQ(q + 1);
      setTime(30);
    } else {
      onFinish(newScore, updatedAnswers);
    }
  };

  return (
    <div className="card">
      <h2>{topic} Quiz</h2>

      {/* Question tracker */}
      <h4>
        Question {q + 1} of {data.length}
      </h4>

      <div className="timer">⏱ {time}s</div>

      <h3>{data[q].question}</h3>

      <div className="options-container">
        {data[q].options.map((opt) => (
          <button
            key={opt}
            className={`option-btn ${selected === opt ? "selected" : ""}`}
            onClick={() => setSelected(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        className="next-btn"
        onClick={handleNext}
        disabled={!selected}
        style={{
          opacity: selected ? 1 : 0.5,
          cursor: selected ? "pointer" : "not-allowed"
        }}
      >
        {q === data.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}

export default Quiz;