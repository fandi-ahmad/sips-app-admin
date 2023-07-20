import Swal from "sweetalert2";

export const AlertSuccess = (text) => {
    Swal.fire({
        icon: 'success',
        title: 'Good Job',
        text: text || 'Success',
    });
}

export const AlertError = (text) => {
    Swal.fire({
        icon: 'warning',
        title: 'Error!',
        text: text || 'Ups, something wrong'
    })
}

export const AlertConfirm = (props) => {
    Swal.fire({
        icon: 'question',
        title: props.title,
        text: props.text || "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: props.confirmText || 'Yes',
        preConfirm: props.preConfirm
    })
}