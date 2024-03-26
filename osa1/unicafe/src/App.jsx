/* eslint-disable react/prop-types */
import { useState } from 'react'

// Vastaa yksittäisen palautteen antamisesta
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

// Huolehtii tilastorivien näyttämisestä 
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

// Statistics komponentti hoitaa oman osuutensa ja palauttaa taulukon tiedoista
const Statistics = ({ good, neutral, bad }) => {

  // lasketaan kaikki palautteet yhteen
  const totalClicks = good + neutral + bad;

  // lasketaan keskiarvo
  const average = (good * 1 + bad * -1) / (good + neutral + bad)

  // lasketaan positiiviset prosentteina
  const positivePercentage = (good / (good + neutral + bad)) * 100 + ' %'

  // jos ei yhtään palautetta niin tulostetaan se
  if (totalClicks == 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody> 
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={totalClicks} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positivePercentage} />
      </tbody>
    </table>
  )
}

// Juurikomponentti
const App = () => {
  
  // alustetaan tilamuuttujat ja niiden päivitysfunkiot
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // palautteiden käsittelijäfunkiot
  const handleGoodClick = () => setGood(good + 1) 
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  
  // renderöidään komponentit ja välitetään tarvittavat propsit
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' /> 

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App