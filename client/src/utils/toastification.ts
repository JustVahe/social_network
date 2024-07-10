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
    pendingText: string | undefined,
    fulfilledText: string | undefined
}

export const notifyPromise = (promise: Promise<unknown> | (() => Promise<unknown>), {pendingText, fulfilledText} : IPromise ) => {
    toast.promise(
        promise,
        {
          pending: pendingText,
          success: fulfilledText,
          error: {
            render({data}) {
                const error = data as Error;
                return error.message;
            }
          }
        }
    )
}