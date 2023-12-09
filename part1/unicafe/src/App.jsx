import { useState } from 'react'
import './App.css';



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    const newGood = good + 1;
    const newTotal = total + 1;
    setGood(good + 1);
    setTotal(total +1);
    averageScore(newGood, neutral, bad, newTotal);
    positiveScore(newGood, newTotal)
  }

  const increaseNeutral = () => {
    const newNeutral = neutral + 1;
    const newTotal = total + 1;
    setNeutral(neutral + 1);
    setTotal(total +1);
    averageScore(good, newNeutral, bad, newTotal);
    positiveScore(good, newTotal);
  }

  const increaseBad = () => {
    const newBad = bad + 1;
    const newTotal = total + 1;
    setBad(bad + 1);
    setTotal(total +1);
    averageScore(good, neutral, newBad, newTotal);
    positiveScore(good, newTotal);
  }

  const averageScore = (newGood, newNeutral, newBad, newTotal) => {
    const newAverage = (newGood * 1 + newNeutral * 0 + newBad * -1) / newTotal;
    setAverage(newAverage);
  }

  const positiveScore = (newGood, newTotal) => {
    const newPositive = newTotal ? (newGood / newTotal) * 100 : 0;

    setPositive(newPositive);
};




  return (
    <div>
       <h1 className="feedback-header">give feedback</h1>
       <button onClick={increaseGood} className="feedback-buttons">good</button>
       <button onClick={increaseNeutral} className="feedback-buttons">neutral</button>
       <button onClick={increaseBad} className="feedback-buttons">bad</button>
       <h2>statistics</h2>
       <h3>good {good}</h3>
       <h3>neutral {neutral}</h3>
       <h3>bad {bad}</h3>
       <h3>all {total}</h3>
       <h3>average {average}</h3>
       <h3>positive {positive} %</h3>
    </div>
  )
}

export default App