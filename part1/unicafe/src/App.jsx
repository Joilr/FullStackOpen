import { useState } from 'react'
import './App.css';

const Button = ({ increaseGood, increaseNeutral, increaseBad }) => {

  return(
    <div>
    <button onClick={increaseGood} className="feedback-buttons">good</button>
    <button onClick={increaseNeutral} className="feedback-buttons">neutral</button>
    <button onClick={increaseBad} className="feedback-buttons">bad</button>
    </div>
  );


};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
);


const Statistics = ({ good, neutral, bad, total, average, positive }) => {

  return(
  <table>
    <tbody>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="all" value={total} />
    <StatisticLine text="average" value={average} />
    <StatisticLine text="positive" value={positive + ' %'} />
    </tbody>
  </table>
  );
};

const App = () => {
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

    <Button
      increaseGood={increaseGood}
      increaseNeutral={increaseNeutral}
      increaseBad={increaseBad}
    />

       <h2>statistics</h2>

       {total > 0 ? (
    <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
      total={total}
      average={average}
      positive={positive}
      />
    ) : (
      <p>No feedback given</p>
    )}

    </div>
  )
}

export default App