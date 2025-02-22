import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useInfoContext } from '../../context/InfoContext'
import { getOne } from '../../api/getRequests'

const Account = () => {
  const id = useParams().id
  const {currentUser} = useInfoContext()
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
    if(id !== currentUser._id){
      getUser()
    } else{
      setUser(currentUser)
    }
  },[id])
  return (
    <div className='container'>
        <div className="account">
          <div className="left-page">
              <img src="/images/default.jpg" alt="profile" />
              <div className="content">
                
              </div>
          </div>
          <div className="right-page">

          </div>
        </div>
    </div>
  )
}

export default Account