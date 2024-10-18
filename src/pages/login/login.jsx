import React from "react";
import "./login.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikInput } from "../../formik";
import loginVideo from "../../images/login/login_video.mp4";
import { success_notify } from "../../shared/notify";
import { useMutation, useQueryClient } from "react-query";
import { jwtDecode } from "jwt-decode";
import { axiosInstance } from "../../shared/services";
import { Errors } from "../../utils/errors";

const loginData = async (newData) => {
  let data = await axiosInstance.post("admin/login", newData);
  return data;
};

export const Login = () => {
  const queryClient = useQueryClient();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(4).max(64).required(),
    password: Yup.string().min(4).max(64).required(),
  });

  const mutation = useMutation(loginData, {
    onSuccess: ({
      data: {
        data: { token },
      },
    }) => {
      queryClient.invalidateQueries("data");
      localStorage.setItem("token", token);
      const decode = jwtDecode(token);
      localStorage.setItem("role", decode.user.role);
      success_notify("Login qildingiz!");
      setTimeout(() => {
        window.location.assign("/");
      }, 500);
    },
    onError: (error) => {
      Errors(error);
    },
  });

  const onSubmit = async (values) => {
    mutation.mutate(values);
  };

  return (
    <div className="Login">
      <div className="Login__video">
        <video autoPlay loop muted playsInline>
          <source src={loginVideo} type="video/mp4" />
        </video>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="Login__form">
          <div className="LoginForm__head">
            <h3>Tizimga Kirish</h3>
            <p>"Yakkabog' CITY" tizimiga kirish uchun kataklarni to'ldiring!</p>
          </div>
          <FormikInput
            fieldClass={"FormInputField"}
            id={"username"}
            label={"Username"}
            type={"text"}
          />
          <FormikInput
            fieldClass={"FormInputField"}
            id={"password"}
            label={"Password"}
            type={"password"}
          />
          <div className="LoginForm__btn">
            <button type="submit">KIRISH</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
