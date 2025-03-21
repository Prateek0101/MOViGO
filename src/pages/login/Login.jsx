import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik"
import * as yup from "yup"
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import '/style.scss'
const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialValues = { email: '', password: '' }
  
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8,"Password must be 8 characters Long").required("Password is Required")
  })

  const onSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === values.email && user.password === values.password);

    if (!user) {
      alert("Invalid email or password!");
      return;
    }

    login(user);
    navigate("/home");
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div className="input-group">
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
  
}

export default Login;
