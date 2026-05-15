function Dashboard({ user, history, onStart }) {
  return (
    <div className="card">
      <h2>Welcome, {user} 👋</h2>

      <h3>Previous Attempts</h3>

      {history.length === 0 ? (
        <p>No attempts yet</p>
      ) : (
        history.map((h, i) => (
          <p key={i}>
            {h.topic} → Score: {h.score}/3
          </p>
        ))
      )}

      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
}

export default Dashboard;