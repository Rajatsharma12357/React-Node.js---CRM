import * as Yup from 'yup';

export const ResetPasswordSchema = Yup.object({
    
    password:Yup.string().min(6).required("Please enter your password")
    .matches('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$',
    "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"),
    confirmPassword:Yup.string().required("Please enter your confirm password").oneOf([Yup.ref('password'), null],"Password Must Match"),
})