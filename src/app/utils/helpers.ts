import Swal from "sweetalert2";

export function successMessage(message : string) {
  Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: message,
  });
}

export function buildErrorMessage(err : object) {
  let errMessage = '';
  for (const key in err) {
    if (err.hasOwnProperty(key)) {
      const valor = (err as any)[key];
      errMessage += key + ': ' + valor + ', ';
    }
  }

  return errMessage;
}
