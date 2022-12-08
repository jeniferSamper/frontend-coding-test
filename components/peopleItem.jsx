import { getPeople } from "../petitions/userPetition"
import styles from "./peopleItem.module.css"
import Link from 'next/link';
import Image from 'next/image'


function PeopleItem(props) {
    return (
        <Link href={`/profile/id/${props.id}`}>
        <div className={styles.peopleItem}>
            <Image src={props.picture} alt={props.fullName} className={styles.image} width="200" height="200"/>
            <h3>{props.fullName}</h3>
            <h3>{props.age}</h3>
            <h3>{props.occupation}</h3>
           
        </div>
     </Link>
    )
  }
  
  export {PeopleItem}
