import { Bounce, toast } from "react-toastify"

export const notifyError = (text: string) => {
    toast.error(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}

export const notifySuccess = (text: string) => {
    toast.success(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    });
}

interface IPromise {
    pendingText: string,
    fulfilledText: string,
    rejectedText:string
}

export const notifyPromise = ({pendingText, fulfilledText, rejectedText} : IPromise, promise: Promise<unknown> | (() => Promise<unknown>) ) => {
    toast.promise(
        promise,
        {
          pending: pendingText,
          success: fulfilledText,
          error: rejectedText
        }
    )
}