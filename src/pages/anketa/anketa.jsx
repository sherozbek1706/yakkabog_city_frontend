import React, { Fragment, useContext, useState } from "react";
import { Header } from "../../components";
import "./anketa.css";
import { Formik, Form } from "formik";
import { FormikInput } from "../../formik";
import { MainContext } from "../../utils/context/context";
import * as Yup from "yup";
import { formatmoney } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { info_notify, success_notify } from "../../shared/notify";
import { ipotekaSummaMinus } from "../../utils/functions";
import { axiosInstance } from "../../shared/services";
import { useMutation, useQueryClient } from "react-query";
import { Errors } from "../../utils/errors";

const AddModel = async (newData) => {
  let data = await axiosInstance.post("anketa/add", newData);
  return data;
};

export const Anketa = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [muddatli_tulov_oyi, setMuddatli_tulov_oyi] = useState(0);

  const [role, setRole] = useState(null);
  const [order_payment, setOrder_payment] = useState(null);
  const [payment_method, setPayment_method] = useState(null);
  const [boshlangich_pul, setBoshlangich_pul] = useState(0);
  const [boshlangich_tulov_bormi, setBoshlangich_tulov_bormi] = useState(false);
  const [boshqa_kv_metr_pul, setBoshqa_kv_metr_pul] = useState(0);
  const [boshqa_kv_metr_pul_bormi, setBoshqa_kv_metr_pul_bormi] =
    useState(false);

  const initialValues = {
    full_name: "",
    phone_number1: "",
    phone_number2: "",
    passport_series: "",
    PINFL: "",
    percent_aksiya: "",
  };

  const { contractData, setModelData } = useContext(MainContext);

  if (!contractData) {
    window.location.assign("/apartment");
  }

  const validationSchema = Yup.object({
    full_name: Yup.string().min(4).max(82).required(),
    percent_aksiya: Yup.number().required(),
    passport_series: Yup.string()
      .matches(
        /^[A-Z]{2}[0-9]{7}$/,
        "Passport series must be 2 uppercase letters followed by 7 digits."
      )
      .required("Passport series is required"),
    phone_number1: Yup.string()
      // .matches(
      //   /^(?:\+998|998)?[0-9]{9}$/,
      //   "Phone number must be a valid Uzbekistan phone number."
      // )
      .required("Phone number is required"),
    phone_number2: Yup.string()
      // .matches(
      //   /^(?:\+998|998)?[0-9]{9}$/,
      //   "Phone number must be a valid Uzbekistan phone number."
      // )
      .required("Phone number is required"),
    PINFL: Yup.string().length(14).required(),
  });

  const boshlangich_summa_aniq = boshlangich_tulov_bormi
    ? boshlangich_pul
    : (boshqa_kv_metr_pul_bormi
        ? boshqa_kv_metr_pul * contractData?.field
        : contractData?.umumiy_summasi) * contractData?.rassrochkaFoiz;

  const qolgan_tulov_aniq =
    order_payment === "ipoteka"
      ? ipotekaSummaMinus(
          boshlangich_tulov_bormi
            ? (boshqa_kv_metr_pul_bormi
                ? boshqa_kv_metr_pul * contractData?.field
                : contractData?.umumiy_summasi) - boshlangich_pul
            : (boshqa_kv_metr_pul_bormi
                ? boshqa_kv_metr_pul * contractData?.field
                : contractData?.umumiy_summasi) -
                (boshlangich_tulov_bormi
                  ? boshlangich_pul
                  : boshlangich_summa_aniq)
        ).qolgan_summa
      : boshlangich_tulov_bormi
      ? (boshqa_kv_metr_pul_bormi
          ? boshqa_kv_metr_pul * contractData?.field
          : contractData?.umumiy_summasi) - boshlangich_pul
      : (boshqa_kv_metr_pul_bormi
          ? boshqa_kv_metr_pul * contractData?.field
          : contractData?.umumiy_summasi) -
        (boshlangich_tulov_bormi ? boshlangich_pul : boshlangich_summa_aniq);
  console.log(qolgan_tulov_aniq);

  const onSubmit = (values) => {
    if (!order_payment) {
      info_notify("Qay tarzda to'lash maqul");
      return;
    } else if (payment_method === "Tanlang" && !payment_method) {
      info_notify("Qay to'lashni maqul ko'rasiz");
      return;
    }

    // console.log({
    //   ...values,
    //   role,
    //   apartment_id: contractData?.id,
    //   order_payment,
    //   initial_payment_amount: contractData?.boshlangich_summasi,
    //   initial_payment_amount_percent: contractData?.rassrochkaFoiz,
    //   umumiy_summa: contractData?.umumiy_summasi,
    //   muddatli_tulov_oyi: muddatli_tulov_oyi,
    //   metr_kvadrati_puli: contractData?.metr_kvadrat_summasi,
    //   qolgan_summa:
    //     order_payment === "ipoteka"
    //       ? ipotekaSummaMinus(contractData.qolgan_summa).qolgan_summa
    //       : contractData?.qolgan_summa,
    //   umumiy_tulangan_summa: contractData?.boshlangich_summasi,
    //   chegirma_summa: contractData?.chegirma,
    //   oyiga_qanchadan_tushadi: contractData?.qolgan_summa / muddatli_tulov_oyi,
    //   payment_method,
    // });
  };

  const mutation1 = useMutation(AddModel, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("data");
      success_notify("Anketa Saqlandi!");
      navigate("/model");
    },
    onError: (error) => {
      Errors(error);
    },
  });

  const sendData = (values) => {
    console.log(contractData);

    const { full_name, phone_number1, phone_number2 } = values;
    if (full_name.length === 0) {
      info_notify("Ism Familya to'ldirilmagan!");
      return;
    }
    if (phone_number1.length === 0) {
      info_notify("Telefon raqam to'ldirilmagan!");
      return;
    }
    if (phone_number2.length === 0) {
      info_notify("Qo'shimcha telefon raqam to'ldirilmagan!");
      return;
    }
    if (phone_number2.length === 0) {
      info_notify("Qo'shimcha telefon raqam to'ldirilmagan!");
      return;
    }
    if (!order_payment) {
      info_notify("Qay tarzda to'lash maqul!");
      return;
    }
    if (
      muddatli_tulov_oyi <= 0 ||
      muddatli_tulov_oyi > 60 ||
      muddatli_tulov_oyi === null
    ) {
      info_notify("Muddatli to'lov tanlang!");
      return;
    }

    const qolgansumma = boshlangich_tulov_bormi
      ? contractData?.umumiy_summasi - boshlangich_pul
      : contractData?.qolgan_summa;

    setModelData({
      full_name,
      phone_number1,
      phone_number2,
      order_payment,
      muddatli_tulov_oyi: +muddatli_tulov_oyi,
      aksiya: contractData?.aksiya,
      price_per_square_meter: contractData?.metr_kvadrat_summasi,
      total_price: contractData?.field * contractData?.metr_kvadrat_summasi,
      initial_payment_amount: contractData?.boshlangich_summasi,
      qolgan_summa:
        order_payment === "ipoteka"
          ? ipotekaSummaMinus(qolgansumma).qolgan_summa
          : qolgansumma,
      ipoteka_tulovi:
        order_payment === "ipoteka"
          ? ipotekaSummaMinus(qolgansumma).ipoteka
          : null,
      ipotekadan_qolgan_tulov:
        order_payment === "ipoteka"
          ? ipotekaSummaMinus(qolgansumma).qolgan_summa
          : null,
      rassrochka:
        order_payment === "ipoteka"
          ? ipotekaSummaMinus(qolgansumma).qolgan_summa / 12
          : qolgansumma / +muddatli_tulov_oyi,
      vibor_ochiqmi: boshlangich_tulov_bormi,
      vibor_price_per_square_meter: boshqa_kv_metr_pul
        ? +boshqa_kv_metr_pul
        : contractData?.metr_kvadrat_summasi,
      vibor_total_price: boshqa_kv_metr_pul_bormi
        ? boshqa_kv_metr_pul * contractData?.field
        : contractData?.umumiy_summasi,
      vibor_initial_payment_amount: boshlangich_tulov_bormi
        ? boshlangich_pul
        : contractData?.boshlangich_summasi,
      vibor_initial_payment_amount_percent: boshlangich_tulov_bormi
        ? (
            (boshlangich_summa_aniq * 100) /
            (boshqa_kv_metr_pul_bormi
              ? boshqa_kv_metr_pul * contractData?.field
              : contractData?.umumiy_summasi)
          ).toFixed(0)
        : contractData?.rassrochkaFoiz * 100,
      vibor_qolgan_summa: qolgan_tulov_aniq,
      vibor_ipoteka_tulovi:
        order_payment === "ipoteka"
          ? ipotekaSummaMinus(
              boshlangich_tulov_bormi
                ? (boshqa_kv_metr_pul_bormi
                    ? boshqa_kv_metr_pul * contractData?.field
                    : contractData?.umumiy_summasi) - boshlangich_pul
                : (boshqa_kv_metr_pul_bormi
                    ? boshqa_kv_metr_pul * contractData?.field
                    : contractData?.umumiy_summasi) -
                    (boshlangich_tulov_bormi
                      ? boshlangich_pul
                      : boshlangich_summa_aniq)
            ).ipoteka
          : null,
      vibor_ipotekadan_qolgan_tulov:
        order_payment === "ipoteka" ? qolgan_tulov_aniq : null,
      vibor_rassrochka:
        order_payment === "ipoteka"
          ? qolgan_tulov_aniq / 12
          : qolgan_tulov_aniq / +muddatli_tulov_oyi,
    });

    let ApiModel = {
      full_name,
      phone_number1,
      phone_number2,
      order_payment,
      muddatli_tulov_oyi: +muddatli_tulov_oyi,
      block_number: contractData?.block_number,
      entrance: contractData?.entrance,
      floor: contractData?.floor,
      apartment_number: contractData?.apartment_number,
      field: contractData?.field,
      number_of_rooms: contractData?.number_of_rooms,
      price_per_square_meter: boshqa_kv_metr_pul
        ? +boshqa_kv_metr_pul
        : contractData?.metr_kvadrat_summasi,
      total_price: boshqa_kv_metr_pul_bormi
        ? boshqa_kv_metr_pul * contractData?.field
        : contractData?.umumiy_summasi,
      initial_payment_amount: boshlangich_tulov_bormi
        ? boshlangich_pul
        : contractData?.boshlangich_summasi,

      initial_payment_amount_percent: boshlangich_tulov_bormi
        ? (
            (boshlangich_summa_aniq * 100) /
            (boshqa_kv_metr_pul_bormi
              ? boshqa_kv_metr_pul * contractData?.field
              : contractData?.umumiy_summasi)
          ).toFixed(0)
        : contractData?.rassrochkaFoiz * 100,
      qolgan_summa: qolgan_tulov_aniq,
      ipoteka_tulovi:
        order_payment === "ipoteka"
          ? ipotekaSummaMinus(
              boshlangich_tulov_bormi
                ? (boshqa_kv_metr_pul_bormi
                    ? boshqa_kv_metr_pul * contractData?.field
                    : contractData?.umumiy_summasi) - boshlangich_pul
                : (boshqa_kv_metr_pul_bormi
                    ? boshqa_kv_metr_pul * contractData?.field
                    : contractData?.umumiy_summasi) -
                    (boshlangich_tulov_bormi
                      ? boshlangich_pul
                      : boshlangich_summa_aniq)
            ).ipoteka
          : null,
      ipotekadan_qolgan_tulov:
        order_payment === "ipoteka" ? qolgan_tulov_aniq : null,
      rassrochka:
        order_payment === "ipoteka"
          ? qolgan_tulov_aniq / 12
          : qolgan_tulov_aniq / +muddatli_tulov_oyi,
      aksiya: contractData?.aksiya,
    };

    mutation1.mutate(ApiModel);
  };

  return (
    <Fragment>
      <Header title={"ANKETA TO'LDIRISH"} />
      <div className="Anketa">
        <div className="AnketaSoftForm">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ values }) => (
              <Form className="AnketaForm">
                <div className="AnketaFormClaster">
                  <FormikInput
                    fieldClass={"FormInputField"}
                    id={"full_name"}
                    label={"Ism familya"}
                    type={"text"}
                    value={values.full_name}
                  />
                  <FormikInput
                    fieldClass={"FormInputField"}
                    id={"phone_number1"}
                    label={"Telefon raqam"}
                    type={"text"}
                  />
                  <FormikInput
                    fieldClass={"FormInputField"}
                    id={"phone_number2"}
                    label={"Qo'shimcha telefon raqam"}
                    type={"text"}
                  />

                  <div className="AnketaFormSelect">
                    <p>To'lov qancha oyga</p>
                    <select
                      onChange={(e) => setMuddatli_tulov_oyi(e.target.value)}
                      value={muddatli_tulov_oyi}
                    >
                      <option value={null}>Tanlang</option>
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={36}>36</option>
                      <option value={48}>48</option>
                      <option value={60}>60</option>
                    </select>
                  </div>
                </div>
                <div className="AnketaFormClaster">
                  <div className="AnketaFormSelect">
                    <p>Qay tarzda to'lash maqul</p>
                    <select
                      onChange={(e) => setOrder_payment(e.target.value)}
                      value={order_payment}
                    >
                      <option value={null}>Tanlang</option>
                      <option value="ipoteka">Ipoteka orqali</option>
                      <option value="nasiya">Nasiya savdo orqali</option>
                      <option value="tuliq_tulov">
                        To'liq to'lovni to'lash orqali
                      </option>
                    </select>
                  </div>
                  {order_payment === "ipoteka" ? (
                    <FormikInput
                      fieldClass="FormInputField"
                      id="none"
                      type="text"
                      label="Ipotekaga qilinadigan to'lov"
                      disable={true}
                      value={formatmoney(
                        ipotekaSummaMinus(
                          boshlangich_tulov_bormi
                            ? (boshqa_kv_metr_pul_bormi
                                ? boshqa_kv_metr_pul * contractData?.field
                                : contractData?.umumiy_summasi) -
                                boshlangich_pul
                            : (boshqa_kv_metr_pul_bormi
                                ? boshqa_kv_metr_pul * contractData?.field
                                : contractData?.umumiy_summasi) -
                                (boshlangich_tulov_bormi
                                  ? boshlangich_pul
                                  : boshlangich_summa_aniq)
                        ).ipoteka
                      )}
                    />
                  ) : null}
                </div>
                <div className="AnketaFormClaster">
                  <FormikInput
                    fieldClass="FormInputField"
                    id="none"
                    type="text"
                    label="Xonadonning narxi"
                    disable={true}
                    value={formatmoney(
                      boshqa_kv_metr_pul_bormi
                        ? boshqa_kv_metr_pul * contractData?.field
                        : contractData?.umumiy_summasi
                    )}
                  />

                  <FormikInput
                    fieldClass="FormInputField"
                    id="none"
                    type="text"
                    label="Oylik to'lov"
                    disable={true}
                    value={formatmoney(
                      order_payment === "ipoteka"
                        ? ipotekaSummaMinus(
                            boshlangich_tulov_bormi
                              ? (boshqa_kv_metr_pul_bormi
                                  ? boshqa_kv_metr_pul * contractData?.field
                                  : contractData?.umumiy_summasi) -
                                  boshlangich_pul
                              : (boshqa_kv_metr_pul_bormi
                                  ? boshqa_kv_metr_pul * contractData?.field
                                  : contractData?.umumiy_summasi) -
                                  (boshlangich_tulov_bormi
                                    ? boshlangich_pul
                                    : boshlangich_summa_aniq)
                          ).qolgan_summa / muddatli_tulov_oyi
                        : (boshlangich_tulov_bormi
                            ? (boshqa_kv_metr_pul_bormi
                                ? boshqa_kv_metr_pul * contractData?.field
                                : contractData?.umumiy_summasi) -
                              boshlangich_pul
                            : (boshqa_kv_metr_pul_bormi
                                ? boshqa_kv_metr_pul * contractData?.field
                                : contractData?.umumiy_summasi) -
                              (boshlangich_tulov_bormi
                                ? boshlangich_pul
                                : boshlangich_summa_aniq)) / muddatli_tulov_oyi
                    )}
                  />
                </div>
                <div className="AnketaFormClaster">
                  <FormikInput
                    fieldClass="FormInputField"
                    id="none"
                    type="text"
                    label="Цена квадратного метра"
                    disable={true}
                    value={formatmoney(contractData?.metr_kvadrat_summasi)}
                  />
                  <div className="FormInputFieldCheckbox">
                    <label>Введите другое значение</label>
                    <input
                      type="checkbox"
                      checked={boshqa_kv_metr_pul_bormi}
                      onChange={(e) =>
                        setBoshqa_kv_metr_pul_bormi(e.target.checked)
                      }
                    />
                  </div>
                  {boshqa_kv_metr_pul_bormi ? (
                    <div className="FormInputField">
                      <label>
                        Kvadrat metr narx (
                        {boshqa_kv_metr_pul
                          ? formatmoney(+boshqa_kv_metr_pul)
                          : 0}
                        )
                      </label>
                      <input
                        disabled={!boshqa_kv_metr_pul_bormi}
                        type="number"
                        placeholder="Введите цену за квадратный метр"
                        value={boshqa_kv_metr_pul}
                        onChange={(e) => setBoshqa_kv_metr_pul(e.target.value)}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="AnketaFormClaster">
                  <FormikInput
                    fieldClass="FormInputField"
                    id="none"
                    type="text"
                    label="Первоначальный платеж"
                    disable={true}
                    value={formatmoney(boshlangich_summa_aniq)}
                  />
                  <FormikInput
                    fieldClass="FormInputField"
                    id="none"
                    type="text"
                    label="Necha foiz to'lov"
                    disable={true}
                    value={`${
                      boshlangich_tulov_bormi
                        ? (
                            (boshlangich_summa_aniq * 100) /
                            (boshqa_kv_metr_pul_bormi
                              ? boshqa_kv_metr_pul * contractData?.field
                              : contractData?.umumiy_summasi)
                          ).toFixed(2)
                        : contractData?.rassrochkaFoiz * 100
                    } %`}
                  />
                  <div className="FormInputFieldCheckbox">
                    <label>Введите другое значение</label>
                    <input
                      type="checkbox"
                      checked={boshlangich_tulov_bormi}
                      onChange={(e) =>
                        setBoshlangich_tulov_bormi(e.target.checked)
                      }
                    />
                  </div>
                  {boshlangich_tulov_bormi ? (
                    <div className="FormInputField">
                      <label>
                        Boshlang'ich to'lov (
                        {boshlangich_pul ? formatmoney(+boshlangich_pul) : 0})
                      </label>
                      <input
                        disabled={!boshlangich_tulov_bormi}
                        type="number"
                        placeholder="Введите первоначальный взнос"
                        value={boshlangich_pul}
                        onChange={(e) => setBoshlangich_pul(e.target.value)}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="AnketaFormClaster">
                  <FormikInput
                    fieldClass="FormInputField"
                    id="none"
                    type="text"
                    label={`Boshlang'ich summadan keyin qolgan summa ${
                      order_payment === "ipoteka" ? `(IPOTEKA bilan)` : ""
                    }`}
                    disable={true}
                    value={formatmoney(qolgan_tulov_aniq)}
                  />
                  <FormikInput
                    fieldClass="FormInputField"
                    id="none"
                    type="text"
                    label="Chegirma summasi"
                    disable={true}
                    value={formatmoney(contractData?.chegirma)}
                  />
                </div>

                <div className="AnketaBtns">
                  <button
                    onClick={() => sendData(values)}
                    type="button"
                    className="AnketaFormBtn Btn-Colorize"
                  >
                    MODEL OCHISH
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Fragment>
  );
};
