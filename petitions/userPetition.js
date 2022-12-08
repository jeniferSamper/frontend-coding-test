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
   console.log('llego', id, newProfile);
   // const response = await fetch(`http://localhost:3001/people/${Id}`, {
   //     method: 'PUT',
   //     headers: {
   //         'Content-Type': 'application/json'
   //     },
   //     body: JSON.stringify(newProfile)
   // });
}

export {listPeople, viewOnePeople, listTask, updateNewProfile}