import { loginUser } from '@/store/auth_slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CommonForm from '../comman/Form'
import { loginFormControl } from '@/config'
import { toast } from 'sonner'


const initialState = {
    email: "",
    password: "",
}
const Login = () => {
    const [formdata, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSubmit(event) {
        event.preventDefault()
        dispatch(loginUser(formdata)).then((action) => {
            if (action.meta.requestStatus === "fulfilled") {
               toast.success("Login successfully")
               navigate("/shop/home")
            } else {
                toast.error("Login faild")
              
            }
        })
    }

    return (
        <section>

            <CommonForm
                formControls={loginFormControl}
                onSubmit={onSubmit}
                formData={formdata}
                setFormData={setFormData}
                buttonText={"Login"}
            />


        </section>
    )
}

export default Login
