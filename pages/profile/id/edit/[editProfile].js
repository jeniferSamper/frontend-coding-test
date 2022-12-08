import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { updateNewProfile, viewOnePeople } from '../../../../petitions/userPetition';

function EditProfile() {
   const router = useRouter();
   const id = router.query.editProfile;
   
   const [viewPeopleId, setViewPeopleId] = useState([])
   const [imgPreview, setImgPreview]= useState(null)

   const getPeopleId = async (id) => {
      const data = await viewOnePeople(id)
      setViewPeopleId(data)
      console.log('data', viewPeopleId);
   }

   useEffect(() => {
      const getData = async () => {
         await getPeopleId(id);
      }
      if (id) getData()
   }, [id])

   const handleSubmit = () => {
      console.log('aqui va la peticion');
      updateNewProfile(viewPeopleId.id, viewPeopleId)
   }

   const handleChenge = (e) => {
      setViewPeopleId({
         ...viewPeopleId,
         [e.target.name]: e.target.value
      });
      console.log('que llega', viewPeopleId);
      return viewPeopleId
   };

   const onChangeImg = async (e, setImgPreview) => {
      const uploadedImg = await e.target.files[0]
      const fr = new FileReader()
      fr.readAsDataURL(uploadedImg)
      fr.onload = () => setImgPreview(fr.result)
      return uploadedImg
   }

   const handleImage = async (e) => {
      const urlImgUpload = await onChangeImg(e, setImgPreview)
      const urlImageWeb = await uploadImgWeb(urlImgUpload)
      setViewPeopleId({
         ...viewPeopleId,
         picture: urlImageWeb
      })
   }

   const onCancel = () => {}

   return (
      <div>
         <h5>Edit Profile</h5>
         <form className="form createUserForm"
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
               defaultValue={viewPeopleId.nickname}
               onChange={handleChenge}
               required
            />
            <div>
               <label htmlFor="picture">Picture:</label>
               <input type="file"
                  className="picture"
                  name="picture"
                  onChange={handleImage}
               />
               <img src={imgPreview} alt="imgPreview" className="imgPreview" />
            </div>
            <div>
               <button type="submit">
                  Up Date
               </button>
               <button
                  type="button"
                  onClick={onCancel}
               >
                  Cancel
               </button>
            </div>
         </form>

      </div>
   )
}

export default EditProfile