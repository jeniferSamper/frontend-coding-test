import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { NavBar } from '../../../../components/header';
import { updateNewProfile, viewOnePeople } from '../../../../petitions/userPetition';
// import Image from 'next/image'

import styles from "./editProfile.module.css"

function EditProfile() {
   const router = useRouter();
   const id = router.query.editProfile;

   const [viewPeopleId, setViewPeopleId] = useState([])
   const [imgPreview, setImgPreview] = useState(null)

   const getPeopleId = async (id) => {
      const data = await viewOnePeople(id)
      setViewPeopleId(data)
      setImgPreview(data.picture)
   }

   useEffect(() => {
      const getData = async () => {
         await getPeopleId(id);
      }
      if (id) getData()
   }, [id])

   const handleSubmit = (e) => {
      e.preventDefault();
      updateNewProfile(viewPeopleId.id, viewPeopleId)
      router.push("/")
   }

   const handleChenge = (e) => {
      setViewPeopleId({
         ...viewPeopleId,
         [e.target.name]: e.target.value
      });
      return viewPeopleId
   };

   const onChangeImg = async (e, setImgPreview) => {
      const uploadedImg = await e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(uploadedImg)
      fr.onload = () => setImgPreview(fr.result)
      return uploadedImg
   }
   async function uploadImgWeb(img) {

      const form = new FormData();
      form.append('image', img);

      const apiKey = 'fc4cacd19eee783715a306dd5dc7c876'

      const url = `https://api.imgbb.com/1/upload?key=${apiKey}`

      const petition = {
         method: 'POST',
         body: form
      }

      const response = await fetch(url, petition)
      const dataResponse = await response.json()
      return dataResponse.data.url
   }

   const handleImage = async (e) => {
      const urlImgUpload = await onChangeImg(e, setImgPreview)
      const urlImageWeb = await uploadImgWeb(urlImgUpload)
      console.log('url', urlImageWeb);
      setViewPeopleId({
         ...viewPeopleId,
         picture: urlImageWeb
      })
   }


   return (
      <div>
         <NavBar></NavBar>
         <div className={styles.form_container}>
            <form className={styles.form}
               onSubmit={handleSubmit}
            >
               <h1>Edit Profile</h1>
               <div className={styles.input_container}>
               <label htmlFor="fullName">FullName:</label>
               <input
                  type="texto"
                  name="fullName"
                  placeholder="type a name"
                  defaultValue={viewPeopleId.fullName}
                  onChange={handleChenge}
                  required
               />

               <label htmlFor="age">Age:</label>
               <input
                  type="number"
                  name="age"
                  placeholder="type a age"
                  defaultValue={viewPeopleId.age}
                  onChange={handleChenge}
                  required
               />

               <label htmlFor="nickname">Nickname:</label>
               <input
                  type="texto"
                  name="nickname"
                  placeholder="type a nickname"
                  defaultValue={viewPeopleId.nickname}
                  onChange={handleChenge}
                  required
               />

               <label htmlFor="gender">Gender:</label>
               <select htmlFor="gender" // input para el password
                  name="gender"
                  placeholder="Select a Gender"
                  onChange={handleChenge}
                  required
                  value={viewPeopleId.gender}>
                  <option value="">Select a gender</option>
                  <option value="Female"> Female</option>
                  <option value="Male">Male</option>
               </select>

               <label htmlFor="occupation">Occupation:</label>
               <input
                  type="texto"
                  name="occupation"
                  placeholder="type an occupation"
                  defaultValue={viewPeopleId.occupation}
                  onChange={handleChenge}
                  required
               />
               <div>
                  <label htmlFor="picture">Picture:</label>
                  <input type="file"
                     name="picture"
                     onChange={handleImage}
                  />
                  <img src={imgPreview} alt="imgPreview" className={styles.image}/>
               </div>

               <div className={styles.btnsEdit}>
                  <button type="submit" className={styles.btnEdit}>
                      Up Date
                  </button>
                  <button type="button" className={styles.btnEdit}>
                        <Link href={`/profile/id/${id}`} > Cancel</Link>
                  </button>
               </div>
               </div>

            </form>
         </div>
      </div>
   )
}

export default EditProfile