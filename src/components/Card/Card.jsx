import React from 'react'
import './Card.css'
import { useInfoContext } from '../../context/InfoContext'

const Card = ({car}) => {
  const {serverUrl} = useInfoContext()
  return (
    <div>
       <div className="card">
            <img src={`${serverUrl}/${car.carImg}`} alt="car_photo" />
            <div className="card-body">
                <h4 style={{ textAlign: "center", marginTop: "10px" }}>{car.name}</h4>
                <h5>year: <b>{car.year}</b></h5>
                <h5>color: <b>{car.color}</b></h5>
                <h5>company: <b>{car.company}</b></h5>
                <h5>description: <b>{car.description}</b></h5>
                <h5>location: <b>{car.location}</b></h5>
                <h5>price: <b>{car.price}</b></h5>
            </div>
                <button className='btn-card'>Read More</button>
        </div>
    </div>
  )
}

export default Card