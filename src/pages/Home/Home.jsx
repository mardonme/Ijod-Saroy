import React from 'react'

import "./Home.css"
import audiCar from "./img/audi-img.png"
import bmwCar from "./img/bmw-img.png"
import lamboCar from "./img/lambo-img.png"
import mersCar from "./img/mers-img.png"
import ferrariCar from "./img/ferrari-img.png"
import model1 from "./img/model1.svg"
import model2 from "./img/model2.svg"
import model3 from "./img/model3.svg"
import searchInp from "./img/search-inp.svg"
import teslaToys from "./img/tesla-toy.svg"
import bag from "./img/bag.svg"
import bus from "./img/bus.svg"
import genesisCar from "./img/genesis-car.svg"
import feedbackImg from "./img/feedback-img.svg"
import feedbackImgTwo from "./img/feedback-img-two.svg"
import feedbackImgThree from "./img/feedback-img-three.svg"
import feedbackImgInfo from "./img/feedback-img-info.svg"
import feedbackImgInfoTwo from "./img/feedback-img-info-two.svg"
import feedbackImgInfoThree from "./img/feedback-img-info-two.svg"
import lambo from "./img/lambo.svg"
import volkswagen from "./img/volkswagen.svg"
import kia from "./img/kia.svg"
import { Link, NavLink } from 'react-router-dom'
import SlickCarousel from '../../components/slickCarousel/Carousel'
import Explore from '../../components/Explore/Explore'
import { useInfoContext } from '../../context/InfoContext'
import Footer from '../../components/Footer/Footer'

const Home = () => {
    const {serverUrl, categorys} = useInfoContext()
    return (
        <main className='home'>  
            <section>
                <div className="container">
                    <div className="hero">
                        <div className="dream-car">
                            <p>Find Your Dream</p>
                            <div className='button-flex'>
                                <span>Car</span>
                                <Link className='dream-car-link'>Other now <i className="fa-solid fa-regular fa-arrow-right"></i></Link>
                            </div>
                        </div>
                        <div className="hero-cars">
                            <SlickCarousel speed={2000} sm={1} md={1} lg={1} xl={1} fade={true}>
                                    <img src={audiCar} alt="audi" />
                                    <img src={bmwCar} alt="audi" />
                                    <img src={lamboCar} alt="audi" />
                                    <img src={mersCar} alt="audi" />
                                    <img src={ferrariCar} alt="audi" />

                            </SlickCarousel>
                        </div>
                    </div>
                </div>
                <div id='company' className="all-models">
                    <img src={model1} alt="" />
                    <img src={model2} alt="" />
                    <img src={model3} alt="" />
                    <label htmlFor="search-inp">
                        <img src={searchInp} alt="" />
                        {/* <input id='search-inp' type="text" /> */}
                    </label>
                </div>
            </section>      
           <section>
           <div className="container">
                <div className="car-brand">
                    <div className="title">
                        <span></span>
                        <h2>Brands</h2>
                        <span></span>
                    </div>
                    <SlickCarousel speed={1500} sm={1} md={2} lg={3} xl={5}>
                        {categorys?.length > 0 && categorys.map(category => {
                            return <NavLink key={category._id} to={`/brand/${category._id}`}><img src={`${serverUrl}/${category.categoryImg}`} alt="car_photo" /></NavLink>
                        })}
                    </SlickCarousel>
                </div>
            </div>
           </section>
            <Explore/>
            <section>
                <div className="container">
                    <div className="title">
                        <span></span>
                        <h2>Our Services</h2>
                        <span></span>
                    </div>
                </div>
                <div className="servise-text">
                    <h4>We Provide Many Of The Best Servises For You And You Will Get The Best Benefits Here </h4>
                </div>
                <div className="cars-controller">
                    <div className="cars-controller-item">
                        <img src={teslaToys} alt="" />
                        <h5>Top Buy & Sell Car</h5>
                        <h4>we Provide many of the best servises for you  and you will get <br /> the best benefits here </h4>
                    </div>
                    <div className="cars-controller-item">
                        <img src={bag} alt="" />
                        <h5>Easy Payment</h5>
                        <h4>we Provide many of the best servises for you  and you will get <br /> the best benefits here </h4>
                    </div>
                    <div className="cars-controller-item">
                        <img src={bus} alt="" />
                        <h5>Easy To Use</h5>
                        <h4>we Provide many of the best servises for you  and you will get <br /> the best benefits here </h4>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="genesis-car">
                        <img src={genesisCar} alt="" />
                        <div className="genesis-everyone">
                            <h1>EVs For Everyone</h1>
                            <br />
                            <p>We Provide Many Of The Best Servises For You <br />  And You Will Get The Best Benefits Here </p>
                            <br /> <br />
                            <Link><button className='genesis-btn'>Read More <i className="fa-solid fa-regular fa-arrow-right"></i></button></Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className='feedback-box'>
                <div className="container">
                    <div className="title">
                        <span></span>
                        <h2>Our Coustomer Feedback</h2>
                        <span></span>
                    </div>
                    <div className="feedback-info">
                        <div className="feedback-info-item">
                            <div className="feedback-img">
                                <img src={feedbackImg} alt="" />
                                <img src={feedbackImgInfo} alt="" />
                            </div>
                            <p>
                                The listing was hot (more than 170 bids). Everything worked well. We appreciated a simple process.Listing page, chat with a seller, the auction, escrow service – everything was great and we didn’t need anything on top.
                            </p>
                        </div>
                        <div className="feedback-info-item-two">
                            <div className="feedback-img">
                                <img src={feedbackImgTwo} alt="" />
                                <img src={feedbackImgInfoTwo} alt="" />
                            </div>

                            <p className="feedback-info-two">
                                The listing was hot (more than 170 bids). Everything worked well. We appreciated a simple process.Listing page, chat with a seller, the auction, escrow service – everything was great and we didn’t need anything on top.
                            </p>
                        </div>
                        <div className="feedback-info-item">
                            <div className="feedback-img">
                                <img src={feedbackImgThree} alt="" />
                                <img src={feedbackImgInfoThree} alt="" />
                            </div>
                            <p>
                                The listing was hot (more than 170 bids). Everything worked well. We appreciated a simple process.Listing page, chat with a seller, the auction, escrow service – everything was great and we didn’t need anything on top.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='blog-box'>
                <div className="container">
                    <div className="title">
                        <span></span>
                        <h2>Blogs</h2>
                        <span></span>
                    </div>
                    <div className="blog-pages">
                        <div className="blog-pages-item">
                            <div className="car-photo">
                                <img src={lambo} alt="" />
                            </div>

                            <div className="car-price">
                                <p>Is the 2024 Porsche Cayenne S a Good SUV? 4 Pros and 3 Cons</p>
                            </div>
                        </div>
                        <div className="blog-pages-item">
                            <div className="car-photo">
                                <img src={volkswagen} alt="" />
                            </div>

                            <div className="car-price">
                                <p>Compact Steamroller: 2024 Toyota RAV4 Starts at $29,825</p>
                            </div>
                        </div>
                        <div className="blog-pages-item">
                            <div className="car-photo">
                                <img src={kia} alt="" />
                            </div>

                            <div className="car-price">
                                <p>2024 Kia Niro EV Costs $50 More, Nearly Unchanged Otherwise</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </main>
    )
}

export default Home