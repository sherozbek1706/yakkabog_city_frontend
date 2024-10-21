import React from "react";
import { Fragment } from "react";
import "./add-apartment.css";
import { Header } from "../../../components";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikInput } from "../../../formik";
import { axiosInstance } from "../../../shared/services";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { success_notify } from "../../../shared/notify";
import { Errors } from "../../../utils/errors";

const AddData = async (newData) => {
  let data = await axiosInstance.post("apartment/add", newData);
  return data;
};

export const AddApartment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const ValidationSchema = Yup.object({
    block_number: Yup.number().min(0).max(15).required(),
    entrance: Yup.number().min(0).max(5).required(),
    floor: Yup.number().min(0).max(15).required(),
    number_of_rooms_in_floor: Yup.number().min(1).max(4).required(),
    field: Yup.number().min(0).max(150).required(),
    price_per_square_meter: Yup.number().min(0).required(),
    total_floor: Yup.number().min(0).max(15).required(),
  });

  const initialValues = {
    block_number: "",
    entrance: "",
    floor: "",
    number_of_rooms_in_floor: "",
    field: "",
    price_per_square_meter: "",
    total_floor: "",
  };

  const mutation = useMutation(AddData, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("data");
      success_notify("Xonadon Qo'shildi");
      navigate("/apartment");
    },
    onError: (error) => {
      Errors(error);
    },
  });

  const onSubmit = async (values) => {
    mutation.mutate(values);
  };

  return (
    <Fragment>
      <Header title={"Xonadon qo'shish"} />
      <div className="AddApartment">
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={ValidationSchema}
        >
          <Form className="AddApartment__form">
            <div className="AddApartmentFormInputs">
              <FormikInput
                fieldClass={"FormInputField"}
                id={"block_number"}
                label={"Blokning raqami"}
                type={"number"}
              />
              <FormikInput
                fieldClass={"FormInputField"}
                id={"entrance"}
                label={"Podyezd raqami"}
                type={"number"}
              />
              <FormikInput
                fieldClass={"FormInputField"}
                id={"floor"}
                label={"Xonadon nechanchi etajda joylashgan"}
                type={"number"}
              />
              <FormikInput
                fieldClass={"FormInputField"}
                id={"number_of_rooms_in_floor"}
                label={"Xonadon podyezda qaysi o'rinda"}
                type={"number"}
              />
              <FormikInput
                fieldClass={"FormInputField"}
                id={"field"}
                label={"Maydoni qancha metr(kvadratda)"}
                type={"number"}
              />

              <div className={"FormInputField"}>
                <label htmlFor={"price_per_square_meter"}>
                  {"Metr kvadrati narxi"}
                </label>
                <Field
                  type={"number"}
                  id={"price_per_square_meter"}
                  name={"price_per_square_meter"}
                  placeholder={"Metr kvadrati narxi"}
                />
                <ErrorMessage name={"price_per_square_meter"} component="p" />
              </div>

              <FormikInput
                fieldClass={"FormInputField"}
                id={"total_floor"}
                label={"Dom necha etajlik"}
                type={"number"}
              />
              <FormikInput
                fieldClass={"FormInputField"}
                id={"number_of_rooms"}
                label={"Xonadon necha xonalik"}
                type={"number"}
              />
            </div>
            <button className="AddApartmentFormBtn" type="submit">
              Xonadon qo'shish
            </button>
          </Form>
        </Formik>
      </div>
    </Fragment>
  );
};
