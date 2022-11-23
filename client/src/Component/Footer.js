import React from 'react'
import './ComponentCSS/Footer.css'

const Footer = () => {
  return (
    <div className='main-footer'>
      <div className='container'>
        <div className='container-footer'>
        <div className='row'>
            <div className='col'>
                <h4>Develope By</h4>
                <ul className='footer-list'>
                    <li>นาย สรัญ พ่วงกระแสร์</li>
                    <li>นาย ฌัชพล ไผ่กอ</li>
                    <li>นาย ธนพนธ์ ศรีตองอ่อน</li>
                </ul>
            </div>
            <div className='col'>
                <h4>เว็บไซต์นี้เป็นส่วนหนึ่งของปริญญานิพนธ์</h4>
                <ul className='footer-list'>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
        <hr/>
        <div className='row'>
            <p className='footer-col-sm'>
                &copy;{new Date().getFullYear()} | All right reserved to Cisco | Term Of Service | 100% Illegal
            </p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

