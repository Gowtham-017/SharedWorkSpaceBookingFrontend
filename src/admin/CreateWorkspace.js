import React from 'react'

function CreateWorkspace() {
  return (
    <div>
      <form >
        <input type="text" placeholder='Workspace Name'/>
        <input type="text" placeholder='Type'/>
        <input type="text" placeholder='Location'/>
        <input type="number" placeholder='Capacity'/>
        <input type="time" placeholder='Open Time'/>
        <input type="timw" placeholder='CLose Time'/>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateWorkspace
