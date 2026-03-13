import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CommonForm from '../comman/Form'
import { registerFormControl } from '@/config'
import { toast } from 'sonner'
import { registerUser } from '@/store/auth_slice'

const initialState = {
    userName: "",
    email: "",
    password: ""
}

const Register = () => {
    const [formdata, setformdata] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    function onSubmit(event) {
        event.preventDefault()
        dispatch(registerUser(formdata)).then((action) => {
            if (action.meta.requestStatus === "fulfilled") {
                toast.success("Registration successful");
                navigate("/auth/login");
            } else {
                toast.error(action.payload || "Registration failed");
            }
        });
    }
    return (
        <div className=''>
            <CommonForm
                formControls={registerFormControl}
                onSubmit={onSubmit}
                formData={formdata}
                setFormData={setformdata}
                buttonText={"Sign up"}
            />
        </div>
    )
}

export default Register
