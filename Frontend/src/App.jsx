import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import cors from 'cors'


function App() {
  const [students, setStudents] = useState([])
  useEffect (() => {
    // fetch data from the server using ax
    axios.get('/api/students')
    .then((response) => {
      console.log(response.data)
      setStudents(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  })
  return (
    <>
     <h1>Coding is best</h1>
     <p>STUDENTS: {students.length}</p>
     {
        students.map((student, index) => (
          <div className='p-8 center grid grid-cols-3'>
          <div className='text-green-300' key={students.id}>
            <p className='text-red-400'>{student.name}</p>
            <p>{student.age}</p>
            <p>{student.enrollment}</p>
          </div>
          </div>
        ))
     }
    </>
  )
}

export default App

