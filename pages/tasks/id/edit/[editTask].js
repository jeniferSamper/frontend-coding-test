import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { updateNewTask, viewOneTask } from '../../../../petitions/userPetition';

function EditTask() {
   const router = useRouter();
   const id = router.query.editTask;

   const [viewTasksId, setViewTasksId] = useState([])
   const [stateTasksId, setStateTasksId] = useState([])

   const getPeopleId = async (id) => {
      const tasks = await viewOneTask(id)
      setViewTasksId(tasks)
      if(viewTasksId.endDate == ''){
         setStateTasksId('true')
      } else{
         setStateTasksId(viewTasksId.completed)
      }
      
    }

    useEffect(() => {
      const getData = async () => {
        await getPeopleId(id);
      }
      if (id) getData()
    }, [id])

    const handleSubmit = (e) => {
      e.preventDefault();
      updateNewTask(viewTasksId.id, viewTasksId)
      // updateNewProfile(viewPeopleId.id, viewPeopleId)
   }

   const handleChenge = (e) => {
      setViewTasksId({
         ...viewTasksId,
         [e.target.name]: e.target.value
      });
      return viewTasksId
   };

    return (
       <div>
         <h5>Edit task</h5>
         <form 
            onSubmit={handleSubmit}
         >

            <label htmlFor="Title">Title:</label>
            <input
               type="texto"
               name="title"
               placeholder="type a title"
               defaultValue={viewTasksId.title}
               onChange={handleChenge}
               required
            />
            
            <label htmlFor="description">Description:</label>
            <input
               type="texto"
               name="description"
               placeholder="type a description"
               defaultValue={viewTasksId.description}
               onChange={handleChenge}
               required
            />
            
            <label htmlFor="startDate">Start Date:</label>
            <input
               type="date"
               name="startDate"
               // placeholder="type a description"
               defaultValue={viewTasksId.startDate}
               onChange={handleChenge}
               required
            />

            <label htmlFor="endDate">End Date:</label>
            <input
               type="date"
               name="endDate"
               defaultValue={viewTasksId.endDate}
               onChange={handleChenge}
            />
            
            <select htmlFor="completed" 
               name="completed"
               placeholder="Select a state"
               onChange={handleChenge}
               required
               value={stateTasksId}>
               <option value="">Select a state</option>
               <option value="true">Completed</option>
               <option value="false">Incompleted</option>
            </select>

           
            <div>
               <button type="submit">
               <Link href={`/profile/id/${viewTasksId.personId}`} > Up Date</Link>
               </button>
               <button
                  type="button"
               >
                  <Link href={`/profile/id/${viewTasksId.personId}`} > Cancel</Link>
               </button>
            </div>
         </form>

      </div>
    )
  }
  
  export default EditTask
