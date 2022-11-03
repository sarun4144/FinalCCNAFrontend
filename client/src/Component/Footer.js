import React from 'react'
import './ComponentCSS/Footer.css'

const Footer = () => {
  return (
    <div className='main-footer'>
      <div className='container'>
        <div className='container-footer'>
        <div className='row'>
            <div className='col'>
                <h4>Despacito</h4>
                <ul className='footer-list'>
                    <li>69-6969-6969</li>
                    <li>Wakaliwood Uganda</li>
                </ul>
            </div>
            <div className='col'>
                <h4>Welcome to the Cumzone</h4>
                <ul className='footer-list'>
                    <li>Amogus</li>
                    <li>LMAO</li>
                </ul>
            </div>
        </div>
        <hr/>
        <div className='row'>
            <p className='footer-col-sm'>
                &copy;{new Date().getFullYear()} | All right reserved to LSK | Term Of Service | 100% Illegal
            </p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

