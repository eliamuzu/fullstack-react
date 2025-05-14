import React from 'react'

const Filter = (props) => {
  
  
    return (
    <div>
        filter contacts by <input value={props.newFilter} 
        onChange={props.handleFilter} />
    </div>
  )
}

export default Filter