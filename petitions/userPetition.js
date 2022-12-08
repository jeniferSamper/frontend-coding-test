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
   const result = await fetch(`http://localhost:3001/tasks/${id}`)
   const data = await result.json()
   return data
}

export {listPeople, viewOnePeople, listTask}