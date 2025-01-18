import React from 'react'
import './Explore.css'
import { Link } from 'react-router-dom'
import SlickCarousel from '../slickCarousel/Carousel'
import { useInfoContext } from '../../context/InfoContext'

const Explore = () => {
    const {cars, serverUrl} = useInfoContext()
    return (
      <div className='explore'>
          <div className="container">
              <div className="title">
                  <span></span>
                  <h2>Explore</h2>
                  <span></span>
              </div>
              <div className="car-explore">
                  <Link>Cars & Minivan</Link>
                  <Link>Trucks</Link>
                  <Link>Crossovers & SUVs</Link>
                  <Link>Electrified</Link>
              </div>
              <div className='box-models'>
                  <SlickCarousel speed={2000} sm={1} md={1} lg={2} xl={2}>
                      {cars.length > 0 && cars.map(car => {
                          return(
                              <div key={car._id} className="card-models">
                              <img src={`${serverUrl}/${car.carImg}`} alt="car_photo" />
                              <div className="cars-info">
                                  <h3>{car.name}</h3>
                                  <div>
                                      <b>Model Year: </b>   
                                      <span>{car.year}</span>
                                  </div>
                                  <div>
                                      <b>Model: </b>
                                      <span>{car.company}</span>
                                  </div>
                                  <div>
                                      <b>Location: </b>
                                      <span>{car.location}</span>
                                  </div>
                                  <ins style={{fontWeight: 'bold'}}>{car.price}</ins><del style={{fontSize: '12px'}}><span style={{color: 'red', marginLeft: '10px'}}>$40.200</span></del>
                                  <Link to="/tesla" className='dream-car-link top'>Other now <i className="fa-solid fa-regular fa-arrow-right left"></i></Link>
                              </div>
                              </div>
                          )
                      })}
                  </SlickCarousel>
              </div>
          </div>
      </div>
    )
}

export default Explore