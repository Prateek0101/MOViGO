import React from 'react'
import { useAuth } from '../../context/AuthContext'
import * as Yup from 'yup'
import { Formik, Field, Form, ErrorMessage } from "formik"
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  const initialValues = { email: '' , password: '' };
  
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(8,"Password must be 8 characters long").required("Password is required"), 
    confirmPassword: Yup.string().oneOf([Yup.ref("password"),null],"Password must match").required("Password is required")
  })

  const onSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    
    if(users.some((user) => user.email === values.email )){
      alert("User already exists! Please log in.");
      navigate('/login'); 
      return;
    }

    const newUser = {email: values.email, password: values.password};
    localStorage.setItem("users",JSON.stringify([...users, newUser]));
    
    login(newUser);
    navigate('/home');
  }
  
  return (
    <div>
      <h1>SignUp</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onsubmit}>
        <Form>
          <div>
            <label>Email</label>
            <Field type='email' name='email'/>
            <ErrorMessage name='email' component='div'/>
          </div>
          <div>
            <label>Password</label>
            <Field type='password' namae='password'/>
            <ErrorMessage name='password' component='div'/>
          </div>
          <div>
            <label>Confirm Password</label>
            <Field type='password' name='confirmPassword'/>
            <ErrorMessage name='confirmPassword' component='div'/>
          </div>
          <button type='submit'>Sign Up</button>
        </Form>
      </Formik>
    </div>
  )
}

export default SignupPage