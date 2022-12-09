import Link from "next/link";
import { useEffect, useState } from "react";
import styles from '../pages/profile/id/id.module.css'



function TasksItem(props) {
    const [dataTask, setDataTask] = useState()
    
    const data = props.data
    console.log(data);

    useEffect(() => {
        setDataTask(props.data.completed)
    }, [props])
   
    const changeState = async() => {
        setDataTask(!dataTask)
    }
    return (
        <div className={styles.peopleCard}>
            <ul>
                <li><b>Title:</b> {data.title}</li>
                <li><b>Description:</b> {data.description}</li>
                <li><b>Start Date:</b> {data.startDate}</li>
                <li><b>End Date:</b> {data.endDate}</li>
                <li><b>State:</b> {dataTask ? 'completed' : 'incompleted'}</li>
            </ul>
            <div className={styles.btnsTaskItem}>
            <button className={styles.btnChangeState} onClick={() => { changeState(dataTask.completed) }}>{dataTask ? 'Mark as not completed' : 'Mark as completed'}</button>
            <button className={styles.btnEdit}>
            <Link href={`/tasks/id/edit/${data.id}`}>Edit</Link>
          </button>
          </div>
        </div>
    )
}

export { TasksItem }