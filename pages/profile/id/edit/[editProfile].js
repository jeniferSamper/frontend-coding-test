import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { updateNewProfile, viewOnePeople } from '../../../../petitions/userPetition';
// import Image from 'next/image'


function EditProfile() {
   const router = useRouter();
   const id = router.query.editProfile;
   
   const [viewPeopleId, setViewPeopleId] = useState([])
   const [imgPreview, setImgPreview]= useState(null)

   const getPeopleId = async (id) => {
      const data = await viewOnePeople(id)
      setViewPeopleId(data)
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
   async function uploadImgWeb (img) {

      const form = new FormData();
      form.append('image', img);
  
      const apiKey = 'fc4cacd19eee783715a306dd5dc7c876'
    
      const url = `https://api.imgbb.com/1/upload?key=${apiKey}`
  
      const petition = {
          method: 'POST',
          body: form
      }
  
      const response = await fetch(url,petition) 
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
         <h5>Edit Profile</h5>
         <form className="form"
            onSubmit={handleSubmit}
         >

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
               <img src={imgPreview} alt="imgPreview" />
            </div>
            <div>
               <button type="submit">
               <Link href={`/profile/id/${id}`} > Up Date</Link>
               </button>
               <button
                  type="button"
               ><Link href={`/profile/id/${id}`} > Cancel</Link>
               </button>
            </div>
         </form>

      </div>
   )
}

export default EditProfile