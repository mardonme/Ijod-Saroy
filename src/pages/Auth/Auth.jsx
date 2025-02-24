import React, { useState } from 'react'
import "./Auth.css"
import { toast } from 'react-toastify'
import { logIn, signUp } from '../../api/authRequests'
import { useInfoContext } from '../../context/InfoContext'
import PhoneInput from 'react-phone-input-2'

const Auth = () => {
  const {setCurrentUser} = useInfoContext()
  const [isSignup, setIsSignup] = useState(true)
  const [disButton, setdisButton] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setdisButton(true)
    const data = new FormData(e.target)
    try {
      toast.loading("..wiat")
      const res = isSignup ? await logIn(data) : await signUp(data);
      setCurrentUser(res?.data.user);
      toast.dismiss()
      toast.success(res?.data.message)
      localStorage.setItem("profile", JSON.stringify(res?.data.user))
      localStorage.setItem("access_token", res?.data.token)
      setdisButton(false)
      window.location.replace('/')
  } catch (error) {
      toast.dismiss()
      toast.error(error?.response?.data.message)
      setdisButton(false)
  }
  }
  const [value, setValue] = useState()
  return (
    <div className="container auth-box">
      <div className="auth">
        <div className="auth-left">
          {/* <img src={audi} alt="logo_app" className="logo-img" /> */}
          <div className="app-name">
            <h1>Yoshlar ijod saroyi</h1>
            <h6></h6>
          </div>
        </div>
        <div className="auth-right">
          <form action="" onSubmit={handleSubmit} className="auth-form">
            <h3>{isSignup ? "Login" : "Signup"}</h3>
            {
              !isSignup && <>
                <div>
                  <input type="text" name="firstname" className="info-input" placeholder="Firstname" required />
                </div>
                <div>
                  <input type="text" name="lastname" className="info-input" placeholder="Lastname" required />
                </div>
                <PhoneInput
                inputStyle={{
                  width:'230px',
                  borderRadius: '10px',
                  padding: '22px 20px 22px 45px',
                  outline: 'none',
                  border: '1px solid #A2001D',
                  boxShadow: '0 0 5px rgba(100, 100, 100, 0.400)',
                }}
                buttonStyle={{
                  left: 40,
                  top: 19,
                  borderRadius: '10px',
                  border: 'none',
                  height: '40px',
                  background: 'transparent',
                }}
                inputProps={{
                  name: 'phoneNumber',
                  required: true,
                }}
                country={'uz'}
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}/>
              </>
            }
            <div>
              <input type="email" name="email" className="info-input" placeholder="Email" required />
            </div>
            <div>
              <input type="password" name="password" className="info-input" placeholder="Password" required />
            </div>
            <div>
              <span onClick={() => setIsSignup(!isSignup)} className="info-span">{!isSignup ? "Already have an account Login !" : "Don't have an account Signup !"}</span>
              <button disabled={disButton} className="info-btn button">{isSignup ? "Login" : "Signup"}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth