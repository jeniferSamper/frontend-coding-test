const url = process.env.API_URL || 'http://localhost:3001/'


const listPeople = async ()=> {
   const result = await fetch('http://localhost:3001/people')
   const data = await result.json()

   return data
}

const viewOnePeople = async (id)=> {
   const result = await fetch(`http://localhost:3001/people/${id}`)
   const data = await result.json()
   return data
}

const listTask = async (id)=> {
   const result = await fetch(`http://localhost:3001/tasks?personId=${id}`)
   const data = await result.json()
   
   return data
}

const updateNewProfile = async (id, newProfile)=>{
   const response = await fetch(`http://localhost:3001/people/${id}`, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(newProfile)
   });
}

const viewOneTask = async (id)=> {
   const result = await fetch(`http://localhost:3001/tasks/${id}`)
   const data = await result.json()
   
   return data
}

const updateNewTask = async (id, newTask)=>{
   const response = await fetch(`http://localhost:3001/tasks/${id}`, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(newTask)
   });
}

const updateNewStateTask = async (id, newState)=>{
   const response = await fetch(`http://localhost:3001/tasks/${id}`, {
       method: 'PUT',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({completed: newState})
   });
}

const createPeople = async (data)=>{
   const response = await fetch(`http://localhost:3001/people`, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
   });
}

export {listPeople, viewOnePeople, listTask, updateNewProfile, viewOneTask, updateNewTask, updateNewStateTask, createPeople}