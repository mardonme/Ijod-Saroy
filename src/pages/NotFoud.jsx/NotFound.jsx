import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'
import notFound from '../../files/not-found.png'

const NotFound = () => {
  return (
    <div className="not-found">
        <img width={400} src={notFound} alt="Img" />
        <h1>Oops! 404 - Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/">Go back to homepage</Link>
  </div>
  )
}

export default NotFound