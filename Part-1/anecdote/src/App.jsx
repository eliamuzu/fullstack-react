import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  function selectRandom() {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    return randomIndex
  }

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
   
  const [selected, setSelected] = useState(0)

  return (
    <div>
      <h1>Anecdote of The Day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>  

      <div>
        <button onClick={() => {
          const copy = [...votes]
          copy[selected] += 1
          setVotes(copy)
        }}>
          Vote
        </button>

        <button onClick={()=>{setSelected(selectRandom())}}>
          Next anecdote
        </button>        
      </div> 

      <h1>Anecdote with most votes</h1>
      {anecdotes[votes.indexOf(Math.max(...votes))]}
      <p>has {Math.max(...votes)} votes</p>
    </div>
  )
}

export default App