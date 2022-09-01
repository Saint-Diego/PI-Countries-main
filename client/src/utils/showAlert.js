import Swal from "sweetalert2"

const showAlert = (titulo, mensaje, tipo, textoBtnConfirmar = 'Ok', mostrarBtnCancelar = false) => {
    return Swal.fire({
        title: titulo,
        text: mensaje, 
        icon: tipo,
        showCancelButton: mostrarBtnCancelar,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: textoBtnConfirmar,
        cancelButtonText: 'Cancelar',
    })
}

export default showAlert