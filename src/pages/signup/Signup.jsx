import { useAuth } from "../context/AuthContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import '/style.scss'
const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const initialValues = { email: "", password: "", confirmPassword: "" };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Min 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const onSubmit = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
  
    if (users.some((user) => user.email === values.email)) {
      alert("User already exists! Please log in.");
      navigate("/login");
      return;
    }
  
    const newUser = { email: values.email, password: values.password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
  
    login(newUser);
    navigate("/home"); 
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
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
          <div className="input-group">
            <label>Confirm Password</label>
            <Field type="password" name="confirmPassword" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
    </div>
  );  
};

export default Signup;
