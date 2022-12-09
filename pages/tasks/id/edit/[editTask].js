import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { updateNewTask, viewOneTask } from '../../../../petitions/userPetition';
import styles from "./editTask.module.css"
import { NavBar } from '../../../../components/header';

function EditTask() {
   const router = useRouter();
   const id = router.query.editTask;

   const [viewTasksId, setViewTasksId] = useState([])
   const [stateTasksId, setStateTasksId] = useState([])

   const getPeopleId = async (id) => {
      const tasks = await viewOneTask(id)
      setViewTasksId(tasks)
      // if(viewTasksId.endDate == ''){
      //    setStateTasksId('true')
      // } else{
      //    setStateTasksId(viewTasksId.completed)
      // }

   }

   useEffect(() => {
      const getData = async () => {
         await getPeopleId(id);
      }
      if (id) getData()
   }, [id])

   const handleSubmit = (e) => {
      e.preventDefault();
      let date = new Date();
      if( viewTasksId.endDate < date){
         setViewTasksId({
            ...viewTasksId,
         completed: 'true' })
      }
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
         <NavBar></NavBar>
         <div className={styles.form_container}>
            <form
               onSubmit={handleSubmit}
               className={styles.form}
            >
               <h1>Edit Task</h1>
               <div className={styles.input_container}>
                  <label htmlFor="Title">Title:</label>
                  <input
                     type="texto"
                     name="title"
                     placeholder="type a title"
                     defaultValue={viewTasksId.title}
                     onChange={handleChenge}
                     required
                     className={styles.input}
                  />

                  <label htmlFor="description">Description:</label>
                  <input
                     type="texto"
                     name="description"
                     placeholder="type a description"
                     defaultValue={viewTasksId.description}
                     onChange={handleChenge}
                     required
                     className={styles.input}
                  />

                  <label htmlFor="startDate">Start Date:</label>
                  <input
                     type="date"
                     name="startDate"
                     // placeholder="type a description"
                     defaultValue={viewTasksId.startDate}
                     onChange={handleChenge}
                     required
                     className={styles.input}
                  />

                  <label htmlFor="endDate">End Date:</label>
                  <input
                     type="date"
                     name="endDate"
                     defaultValue={viewTasksId.endDate}
                     onChange={handleChenge}
                     className={styles.input}
                  />
                  <label htmlFor="completed">State:</label>
                  <select htmlFor="completed"
                     name="completed"
                     placeholder="Select a state"
                     onChange={handleChenge}
                     required
                     defaultValue={setViewTasksId.completed}
                     // value={stateTasksId}
                     className={styles.input}>
                     <option value="">Select a state</option>
                     <option value="true">Completed</option>
                     <option value="false">Incompleted</option>
                  </select>


                  <div className={styles.btnsEdit}>
                     <button type="submit" className={styles.btnEdit}>
                        <Link href={`/profile/id/${viewTasksId.personId}`} > Up Date</Link>
                     </button>
                     <button
                        type="button"
                        className={styles.btnEdit}
                     >
                        <Link href={`/profile/id/${viewTasksId.personId}`} > Cancel</Link>
                     </button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}

export default EditTask
