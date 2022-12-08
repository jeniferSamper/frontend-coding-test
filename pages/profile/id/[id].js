import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import { listTask, viewOnePeople } from '../../../petitions/userPetition';
import Image from 'next/image'
import styles from "./id.module.css"
import Link from 'next/link';
import { NavBar } from '../../../components/header';


const Id = () => {
  const [viewPeopleId, setViewPeopleId] = useState([])
  const [viewTasksId, setViewTasksId] = useState([])
  let stateTasks;

  const router = useRouter();
  console.log(router);
  const id = router.query.id;


  const getPeopleId = async (id) => {
    const data = await viewOnePeople(id)
    const tasks = await listTask(id)
    setViewPeopleId(data)
    setViewTasksId(tasks)
    console.log(viewTasksId);
    viewTasksId.completed ? stateTasks ='completed': stateTasks ='incompleted' 
    // if(!viewTasksId.completed){
    //   stateTasks ='completed' 
    // } else{
    //   stateTasks ='incompleted' 
    // }
    console.log('llego la tarea', tasks);
  }

  useEffect(() => {
    const getData = async () => {
      await getPeopleId(id);
    }
    if (id) getData()
  }, [id])



  return (
    <React.Fragment>
      <NavBar />

      <div className={styles.viewOnePeople}>
        <div className={styles.btns}>
          <button className={styles.btn}>
            <Link href={`/profile/id/${viewPeopleId.id}/edit`} className={styles.btn}>Edit</Link>
          </button>
        </div>
        <h1>Description of the People</h1>
        <div className={styles.peopleCard}>
          <Image src={viewPeopleId.picture} alt={viewPeopleId.fullName} className={styles.image} width="200" height="200" />
          <h3>FullName: {viewPeopleId.fullName}</h3>
          <h3>Nickname: {viewPeopleId.nickname}</h3>
          <h3>Age: {viewPeopleId.age}</h3>
          <h3>Occupation: {viewPeopleId.occupation}</h3>
          <h3>Gender: {viewPeopleId.gender}</h3>
        </div>
        <h1>tasks</h1>

        <div className={styles.peopleCard}>
          <ul>
            <li>title: {viewTasksId.title}</li>
            <li>Description: {viewTasksId.description}</li>
            <li>Start Date: {viewTasksId.startDate}</li>
            <li>End Date: {viewTasksId.endDate}</li>
            <li>State: {stateTasks}</li>
          </ul>
        </div>
      </div>
    </React.Fragment>)
}


export default Id

