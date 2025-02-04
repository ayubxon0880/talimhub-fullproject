import React, { useState, useEffect } from 'react';

const Listening = () => {
  const [testData, setTestData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8081/api/v1/listening/listening-tests');
      const data = await response.json();
      setTestData(data);
    };

    fetchData();

    // Timerni boshlash
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        // Keyingi savolga o'tish
        if (currentQuestion < testData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setTimeRemaining(30);
        }
      }
    }, 1000);

    return () => clearInterval(timer); // Timerni to'xtatish
  }, [timeRemaining, currentQuestion]);

  return (
    <div>
      <h2>IELTS Listening Test</h2>
      <p>Time remaining: {timeRemaining}s</p>

      {testData.length > 0 && (
        <div>
          <h3>{testData[currentQuestion].question}</h3>
          <audio controls>
            <source src={testData[currentQuestion].audioUrl} type="audio/mp3" />
          </audio>
          <div>
            {testData[currentQuestion].options && testData[currentQuestion].options.split(',').map((option, idx) => (
              <div key={idx}>
                <input type="radio" name="answer" id={`option-${idx}`} />
                <label htmlFor={`option-${idx}`}>{option}</label>
              </div>
            ))}
          </div>
          <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Listening;
