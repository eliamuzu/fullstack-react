import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  if (good.length + neutral.length + bad.length === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>

      <table>
        <tbody>
      <StatisticLine text="Good" value={good.length} />
      <StatisticLine text="Neutral" value={neutral.length} />
      <StatisticLine text="Bad" value={bad.length} />
      <StatisticLine text="All" value={good.length + neutral.length + bad.length} />
      <StatisticLine text="Average" value={(good.length - bad.length) / (good.length + neutral.length + bad.length)} />
      <StatisticLine text="Positive" value={(good.length / (good.length + neutral.length + bad.length)) * 100} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ text, handleClick }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
   
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
  )
}



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState([])
  const [neutral, setNeutral] = useState([])
  const [bad, setBad] = useState([])

  return (
    <div>
      <h1>We Appreciate Your Feedback</h1>

      <div>
        <Button text="good" handleClick={() => setGood(good.concat('good'))} />
        <Button text="neutral" handleClick={() => setNeutral(neutral.concat('neutral'))} />
        <Button text="bad" handleClick={() => setBad(bad.concat('bad'))} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  ) 
}

export default App