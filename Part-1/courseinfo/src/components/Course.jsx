const Header = ({course}) => {
  
    return (
      <h2>{course.name}</h2>
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
  
    return (
      <div>
        <div>
          {
            parts.map((part)=>(
              <div key={part.id} >
                <Part name={part.name} exercises={part.exercises} />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
  
  const Total = ({parts}) => {
    
  
    return(
      <p>
        <em>Total of {parts.reduce((acc, part) => acc + part.exercises, 0)} exercises</em>
      </p>
    )
  }
  
  const Course = ({courses}) => {
 
    return (
      <div>
        {courses.map((course) => (
          <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
          </div>
        ))}
      </div>
    )
  }
  export default Course