import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className='conatiner'>
        <div className="footer-about">
              <div className="">
                <h3>Subscribe To The Newsletter</h3>
                <div className="div-about">
                <div className="footer-input">
                  <input type="text" placeholder='Enter Your Email' />
                  <div className="input-icon"><i className="fa-solid fa-arrow-right"></i></div>
                </div>      
                </div>
              </div>
              <div className="footer-faq">
                <div className="footer-faq-info-one">
                  <h4>Buying & Selling</h4>
                  <a href=''>Find a car</a> <br />
                  <a href=''>Listings by city</a> <br />
                  <a href=''>Sell your car</a> <br />
                  <a href=''>Compare side by side</a>
                </div>
                <div className="footer-faq-info-two">
                  <h4>Resource</h4>
                  <a href='#blog'>Blog</a> <br />
                  <a href='#'>Guides</a> <br />
                  <a href='#faq'>FAQ</a> <br />
                  <a href='#'>Help Center</a>
                </div>
                <div className="footer-faq-info-three">
                  <h4>About</h4>
                  <a href='#company'>Company</a> <br />
                  <a href='#'>Career</a> <br />
                  <a href='#'>Contact</a>
                </div>

              </div>
          </div>
            <div className="information">
              <div className="information-faq">
                <div className="relationship">
                  <h6>© 2023 Car Leadership</h6>
                </div>

                <div className="poiciy">
                  <h6>Terms of Service</h6>
                  <h6>Privacy Policy</h6>
                  <h6>Trust & Safety</h6>
                  <h6>Law Enforcement</h6>
                </div>
              </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer