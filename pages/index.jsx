import React, { useEffect, useState } from "react"
import { PeopleItem } from "../components/peopleItem"
import { listPeople } from "../petitions/userPetition"
import Script from "next/script"
import styles from '../styles/index.module.css'
import { NavBar } from "../components/header"



function HomePage() {
  const [viewListPeople, setViewListPeople] = useState([])
  const [orderList, setOrderList] = useState(true)

  const getListPeople = async () => {
    let data = await listPeople()
    data.sort(function (a, b) { return a.age - b.age })
    setViewListPeople(data.map((people) => {
      return {
        picture: people.picture,
        fullName: people.fullName,
        age: people.age,
        occupation: people.occupation,
        id: people.id
      }
    }))
  }

  useEffect(() => { getListPeople() }, [])
  const changeOrder = ()=>{
    setOrderList(!orderList)
    if(orderList == false){
      setViewListPeople(viewListPeople.sort(function (a, b) { return a.age - b.age }))
    } else{
      setViewListPeople(viewListPeople.sort(function (a, b) { return b.age - a.age }))
    }
  }

  return (
    <React.Fragment>
      <Script src="https://kit.fontawesome.com/1b2b17e9e9.js" crossorigin="anonymous"></Script>
      <NavBar></NavBar>
      <div className={styles.pageViewPeople}>
        <div className={styles.btns_container}>
      <button onClick={changeOrder} className="fa-solid fa-up-down"></button>
      <button className={styles.btn}> Add Profile</button>
      </div>
      <div className={styles.viewListPeople}>
        {viewListPeople.map(data => (<PeopleItem key={data.id} fullName={data.fullName} age={data.age} occupation={data.occupation} picture={data.picture} id={data.id} />))}
      </div>
      </div>
    </React.Fragment>)
}

export default HomePage
