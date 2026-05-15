function TopicSelector({ onSelectTopic }) {
  const topics = ["HTML", "CSS", "JavaScript", "React", "SQL"];

  return (
    <div>
      <h2>Select Topic</h2>

      <div className="topic-container">
        {topics.map((t) => (
          <button
            key={t}
            className="topic-btn"
            onClick={() => onSelectTopic(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopicSelector;