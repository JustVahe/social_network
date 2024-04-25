import * as yup from "yup"

export const signUpScheme = yup.object().shape({
    name : yup.string().test({
        name : "name",
        test(value, context) {
            if (!value) {
                return context.createError({type : "name", message : "Name is required"})
            }
            return true;
        }
    }),
    surname : yup.string().test({
        name : "surname",
        test(value, context) {
            if (!value) {
                return context.createError({type : "surname", message : "Surname is required"})
            }
            return true;
        }
    }),
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