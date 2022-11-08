import { style } from '@mui/system';
import React from 'react'
import "./ComponentCSS/Content.css"
function Content() {

    return (
        <div className='mainBackground'>
            <div className='content-container'>
                <section className="content-con">
                    <div className="content-l">
                        <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2550&q=80" alt="" />
                    </div>
                    <div className="content-r">
                        <h3>ทดสอบ Font ไทย</h3>
                        <p>
                            ไก่จิกเด็กตายคาที่ ไอไก่หล่อเท่ แต่ยังไม่เท่ากู ละทิ้งความเป็นมนุษย์ หวนคืนสู่พวก ORKz ไอเหี้ยแม่งพิมพ์นิดเดียวไม่ได้ ภาพแม่งเบียดมาเฉยเลย ไม่ได้ละสงสัยต้องไปแก้อะไรซักหน่อย ไม่งั้นหน้าเว็บเอ๋ออีก
                            เฮ้ย ยังอ่านอยู่อีกอ่อวะ สุดยอดเลยที่มึงตั้งใจอ่านข้อความโง่ๆที่กูไว้ทดสอบนี่ แจ๋วว่ะๆ ดีจัง ดีจัง สุดยอดจัง สู้ๆไอแม็ก เพื่อองจักรพรรดิ
                        </p>
                    </div>
                </section>
                <section className="content-con">
                    <div className="content-r">
                        <h2>Some title</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quaerat minima sapiente labore consectetur nam assumenda excepturi, doloribus placeat perspiciatis neque vero a, natus aperiam ullam ipsam. Quis, sequi facere?
                        </p>
                    </div>
                    <div className="content-l">
                        <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2550&q=80" alt="" />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Content