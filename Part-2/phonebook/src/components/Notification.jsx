import React from 'react'

const Notification = ({message, isError}) => {


    if(message === ''){
        return null
    }
  return (
    <div className={isError ? 'success' : 'error'}>
        {message}
    </div>
  )
}

export default Notification