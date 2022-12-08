import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import { listTask, viewOnePeople } from '../../../petitions/userPetition';
import Image from 'next/image'
import styles from "./id.module.css"
import Link from 'next/link';
import { NavBar } from '../../../components/header';
import { TasksItem } from '../../../components/taskItems';


const Id = () => {
  const [viewPeopleId, setViewPeopleId] = useState([])
  const [viewTasksId, setViewTasksId] = useState([])
  

  const router = useRouter();
  const id = router.query.id;


  const getPeopleId = async (id) => {
    const data = await viewOnePeople(id)
    const tasks = await listTask(id)
    setViewPeopleId(data)
    setViewTasksId(tasks)
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
            <Link href={`/profile/id/edit/${viewPeopleId.id}`} className={styles.btn}>Edit Profile</Link>
          </button>
        </div>
        <section className={styles.container_viewOnePeople}>
          <div>
            <h1 className={styles.title}>Description of the People</h1>
            <div className={styles.peopleCard}>
              {/* <Image src={viewPeopleId.picture} alt={viewPeopleId.fullName} className={styles.image} width="200" height="200" /> */}
              <img src={viewPeopleId.picture} alt={viewPeopleId.fullName} className={styles.image} width="200" height="200" />
              <h3><b>FullName:</b> {viewPeopleId.fullName}</h3>
              <h3><b>Nickname:</b> {viewPeopleId.nickname}</h3>
              <h3><b>Age:</b> {viewPeopleId.age}</h3>
              <h3><b>Occupation:</b> {viewPeopleId.occupation}</h3>
              <h3><b>Gender:</b> {viewPeopleId.gender}</h3>
            </div>
          </div>

          <div>
            <h1 className={styles.title}>Tasks</h1>
            {viewTasksId.map(data => <TasksItem key={data.id} data ={data}></TasksItem>
            )}
          </div>
        </section>


      </div>
    </React.Fragment>)
}


export default Id