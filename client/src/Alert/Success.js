import Swal from 'sweetalert2'

const Toast = Swal.mixin({
    toast: true,
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  export default Toast