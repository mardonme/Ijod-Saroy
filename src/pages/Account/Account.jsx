import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useInfoContext } from '../../context/InfoContext'
import { getOne } from '../../api/getRequests'
import { updateRes } from '../../api/updateRequests'
import { deleteUser } from '../../api/deleteRequests'
import './Account.css'
import { toast } from 'react-toastify'
import InputValue from '../../components/InputValue/InputValue'
import PhoneInput from '../../components/PhoneInput/PhoneInput'

const Account = () => {
  const id = useParams().id
  const { currentUser, setCurrentUser, exit } = useInfoContext()
  const [user, setUser] = useState(null)
  const [look, setLook] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getOne(id, 'user')
        setUser(res.data.user)
      } catch (error) {
        console.log(error)
      }
    }

    if (id !== currentUser?._id) {
      getUser()
    } else {
      setUser(currentUser)
    }
  }, [id, currentUser])

  const updateUser = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    try {
      const res = await updateRes(id, data, 'user')
      if (id === currentUser._id) {
        setCurrentUser(res.data.user)
        setUser(res.data.user)
        localStorage.setItem("profile", JSON.stringify(res?.data.user))
      } else {
        setUser(res.data.user)
      }
      toast.success("Ma'lumotlar yangilandi")
    } catch (error) {
      console.log(error)
      toast.error("Yangilashda xatolik yuz berdi")
    }
  }

  const deleteAccount = async (e) => {
    e.preventDefault()
    try {
      const res = await deleteUser(id, 'user')
      console.log(res)
    } catch (err) {
      console.log(err)
      toast.dismiss()
      toast.error(err.response.data.message)
    }
  }

  const canEdit = (currentUser?._id === user?._id) || currentUser?.role === 102

  return (
    <div className='account-container'>
      <form className="account-form" onSubmit={updateUser}>
        <div className="account-left">
          <div className="profile-image-container">
            <img onClick={() => setLook(!look)}
              src={user?.profilePicture?.url ? user.profilePicture.url : "/images/default.jpg"}
              alt="profile"
              className="profile-image"
            />
            {canEdit && (
              <div className="image-upload">
                <label htmlFor="profilePicture" className="upload-label">
                  <i className='fa-solid fa-image upload-icon'></i>
                  <span>O'zgartirish</span>
                </label>
                <input id='profilePicture' name='image' type="file" hidden />
              </div>
            )}
          </div>
        </div>

        <div className="account-right">
          <h2 className="account-title">Profil Ma'lumotlari</h2>
          <div className="input-fields">
            <InputValue
              type="text"
              name='firstname'
              defaultValue={user?.firstname}
              placeholder='Ism'
              disabled={!canEdit}
            />
            <InputValue
              type="text"
              name='lastname'
              defaultValue={user?.lastname}
              placeholder='Familiya'
              disabled={!canEdit}
            />
            <InputValue
              type="email"
              name='email'
              defaultValue={user?.email}
              placeholder='Email'
              disabled={!canEdit}
            />
            <div className="input-value">
              <PhoneInput defaultValue={user?.phoneNumber} disabled={!canEdit}/>
            </div>
          </div>

          <div className="action-buttons">
            {canEdit && (
              <button type="submit" className="update-btn">
                Yangilash
              </button>
            )}
            
            {user?._id === currentUser?._id && (
              <button onClick={exit} className="exit-btn">
                Chiqish
              </button>
            )}
          </div>
        </div>
      </form>
      {look && <div className='looking' onClick={() => setLook(!look)}>
        <img src={user?.profilePicture?.url ? user.profilePicture.url : "/images/default.jpg"} alt="profile" />
    </div>}
    </div>
  )
}

export default Account