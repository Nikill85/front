import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }


  showMessage(icon, title, text) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: "#f67359"
    })
  }
  automaticMessageError(text, timer = 2500) {
    Swal.fire({
      background: "#fff url()",
      backdrop: `
      rgba(0,0,123,0.4)
      url("")
      left top
      no-repeat
    `,

    padding: "3em",
     color: "#716add",
      position: 'center',
      icon: 'error',
      iconColor:'#FF0000' ,
      title: text,
      showConfirmButton: false,
      timer: timer
    })
  }
  automaticMessageOk(text, timer = 2500) {
    Swal.fire({
      background: "#fff url()",
      backdrop: `rgba(0,0,123,0.4)
      url("")
      left top
      no-repeat
    `,
      position: 'center',
      icon: 'success',
      iconColor: '#00FF00',
      title: text,
      showConfirmButton: false,
      timer: timer
    })
  }
  confirmMessage(title, text, confirmText, icon?) {
    return Swal.fire({
      title: title,
      html: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#f67359",
      confirmButtonText: confirmText,
      cancelButtonText: "Cancelar"
    }).then((result) => {
      return result;
    });
  }
}
