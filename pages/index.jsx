import React, { useEffect, useState } from "react"
import { PeopleItem } from "../components/peopleItem"
import { listPeople } from "../petitions/userPetition"
import Head from "next/head"
import Script from "next/script"



function HomePage() {
  const [viewListPeople, setViewListPeople] = useState([])
  const [orderList, setOrderList] = useState(false)

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
      
      <button onClick={changeOrder}  className="fa-solid fa-up-down"></button>
      <div className="viewListPeople_container">
        {viewListPeople.map(data => (<PeopleItem key={data.id} fullName={data.fullName} age={data.age} occupation={data.occupation} picture={data.picture} id={data.id} />))}
      </div>
    </React.Fragment>)
}

export default HomePage
