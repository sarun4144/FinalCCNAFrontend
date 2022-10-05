import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Error from "../Alert/ErrorTimer";
const LoadingToRedirect = () => {
    const [ count, setCount ] = useState(4)
    const navigate = useNavigate()

    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount)
        },100)
        // Redirect
        if(count === 3){
          Error.fire({
            position:'top',
            icon: 'error',
            iconColor:'Red',
            title: 'คุณไม่ได้รับอณุญาติ',
            html: 'ย้ายไปหน้าหลักใน <b></b> .',
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              navigate('/')
            }
        
        },[count])
          
        }
            
        return () => clearInterval(interval)

    })
    
  return  (
      <div>  </div>
      )
};

export default LoadingToRedirect;