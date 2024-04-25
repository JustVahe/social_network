import * as yup from "yup"

export const signInScheme = yup.object().shape({
    username : yup.string().test({
        name : "username",
        test(value, context) {
            if (!value) {
                return context.createError({type : "username", message : "Username is required"})
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