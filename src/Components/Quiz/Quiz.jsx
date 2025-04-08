import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);


  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const option_Arr = [option1, option2, option3, option4];

  const question = data[index];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_Arr[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index < data.length - 1) {
        setIndex(prev => prev + 1);
        setLock(false);
        option_Arr.forEach(option => {
          option.current.classList.remove("correct", "wrong");
        });
      } else {
        setShowResult(true);
      }
    }
  };
  

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
  
      {showResult ? (
        <>
          <h2>Quiz Completed 🎉</h2>
          <p>You scored {score} out of {data.length}</p>
          <button onClick={() => {
            setIndex(0);
            setScore(0);
            setLock(false);
            setShowResult(false);
            option_Arr.forEach(option => {
              option.current.classList.remove("correct", "wrong");
            });
          }}>Restart Quiz</button>
        </>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {data.length} questions</div>
        </>
      )}
    </div>
  )
}
  
export default Quiz;
