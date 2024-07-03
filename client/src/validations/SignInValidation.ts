import * as yup from "yup"

export const signInScheme = yup.object().shape({
    email : yup.string().test({
        name : "email",
        test(value, context) {
            if (!value) {
                return context.createError({type : "email", message : "Email is required"})
            }
            return true;
        }
    }),
    password : yup.string().test({
        name : "password",
        test(value, context) {
            if (!value) {
                return context.createError({type : "password", message : "Password is required"})
            }
            return true;
        }
    })
})