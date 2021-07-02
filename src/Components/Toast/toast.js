import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const attributes={
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
}

export const successToast = text =>{
    return toast.info(
        <>✔ {text}</>,attributes   
    );
}

