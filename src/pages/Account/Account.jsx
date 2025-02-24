import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useInfoContext } from '../../context/InfoContext'
import { getOne } from '../../api/getRequests'
import { updateRes } from '../../api/updateRequests'
import { deleteUser } from '../../api/deleteRequests'
import './Account.css'
import { toast } from 'react-toastify'
import InputValue from '../../components/InputValue/InputValue'

const Account = () => {
  const id = useParams().id
  const {currentUser, setCurrentUser, exit} = useInfoContext()
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const getUser = async () =>{
      try {
        const res = await getOne(id, 'worker')
        setUser(res.data.getOne)
      } catch (error) {
        console.log(error);
        
      }
    }
    if(id !== currentUser?._id){
      getUser()
    } else{
      setUser(currentUser)
    }
  },[id])

  const updateUser = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    try {
      const res = await updateRes(id, data, 'user')
      console.log(res);
      if(id === currentUser._id){
        setCurrentUser(res.data.user)
        setUser(res.data.user)
        localStorage.setItem("profile", JSON.stringify(res?.data.user))
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const deleteAccount = async (e) => {
    e.preventDefault()
    try {
      const res = await deleteUser(id,'user')
      console.log(res);
    } catch (err) {
      console.log(err);
      toast.dismiss()
      toast.error(err.response.data.message)
      
    }
  }
  return (
    <div className='container'>
        <form className="account" onSubmit={updateUser}>
          <div className="left-page">
              <div className="profile-image">
                <img src={user?.profilePicture ? user?.profilePicture?.url : "/images/default.jpg"} alt="profile" />
                <label htmlFor="profilePicture"><i className='fa-solid fa-image'></i></label>
                <input id='profilePicture' name='image' type="file" hidden/>
                {/* <span title={user?.isActive ? 'acitve' : "no-active"} className='user-active' style={user?.isActive ? {backgroundColor: 'green'} : {backgroundColor: 'red'}}></span> */}
              </div>
          </div>
          <div className="right-page">
              <div className="content">
                  <InputValue type="text" name='firstname' defaultValue={user?.firstname} placeholder='Xodimning (Ishchining) ismi' disabled={true}/>
                  <InputValue type="text" name='lastname' defaultValue={user?.lastname} placeholder='Xodimning (Ishchining) familiyasi'/>
                  <InputValue type="email" name='email' defaultValue={user?.email} placeholder='Xodimning (Ishchining) emaili (elektron pochta manzili)'/>
                  <InputValue type="text" name='phoneNumber' defaultValue={user?.phoneNumber} placeholder='Xodimning (Ishchining) telefon raqami'/>
              </div>
          </div>
          
          <button>Update</button>
        </form>
        <button onClick={exit}>Exit</button>
    </div>
  )
}

export default Account