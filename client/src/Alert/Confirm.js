import Swal from 'sweetalert2' 
const Confirm = Swal.mixin({
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText:'ยกเลิก',
      })
export default Confirm