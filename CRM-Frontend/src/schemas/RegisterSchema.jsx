import * as Yup from 'yup';

export const signUpSchema = Yup.object({
    firstName:Yup.string().min(2).max(25).required("Please enter your first name"),
    lastName:Yup.string().min(2).max(25).required("Please enter your last name"),
    email:Yup.string().email().required("Please enter your email"),
    password:Yup.string().min(6).required("Please enter your password")
    .matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$',
    "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    confirmPassword:Yup.string().required("Please enter your confirm password").oneOf([Yup.ref('password'), null],"Password does not Match"),
    isChecked:Yup.boolean().required("The terms and conditions must be accepted.")
    .oneOf([true], "The terms and conditions must be accepted.")
})