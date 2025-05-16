import React from 'react'

function Card(props) {
    console.log(props)
  return (
    <div>
    <img src='https://images.assettype.com/thequint/2017-10/29e9cb67-4483-4a74-8e18-c8e92b654941/Virat-century.jpg'/>
    <h1 className='vk bg-teal-300 p-3 rounded'>{props.name}</h1>
        
    </div>
  )
}

export default Card