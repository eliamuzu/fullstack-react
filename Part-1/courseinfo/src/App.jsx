const Header = ({course}) => {
  
  return (
    <h1>{course.name}</h1>
  )
}

const Part = (props) => {

  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  const [one, two, three] = parts
  return (
    <div>
      <Part name={one.name} exercises={one.exercises}/>
      <Part name={two.name} exercises={two.exercises}/>
      <Part name={three.name} exercises={three.exercises}/>
    </div>
  )
}

const Total = ({parts}) => {
  const [one, two, three] = parts

  return(
    <p>Number of exercises {one.exercises + two.exercises + three.exercises}</p>
  )
}


function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
   {
      name: 'State of a component',
      exercises: 14
    }

   ] 
  }

  return (
   <div>
    <Header course={course} /> 
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
   </div>
  )
}

export default App
