import { getPeople } from "../petitions/userPetition"

function PeopleItem(props) {
    const viewPeople = async()=>{
       //redirigir a otra pagina
    }
    return (
        <div className="peopleItem" onClick={viewPeople}>
            <img src={props.picture} alt={props.fullName} className='imgPeople' />
            <h3 className="fullName">{props.fullName}</h3>
            <h3 className="age">{props.age}</h3>
            <h3 className="occupation">{props.occupation}</h3>
        </div>
    )
  }
  
  export {PeopleItem}
