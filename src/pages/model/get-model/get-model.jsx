import React, { Fragment, useContext } from "react";
import "./get-model.css";
import { MainContext } from "../../../utils/context/context";
import logo from "../../../images/main/logo.png";
import { formatmoney, ipotekaSummaMinus } from "../../../utils/functions";

export const GetModel = () => {
  const { getModel } = useContext(MainContext);

  const handleClick = () => {
    window.print();
  };

  return (
    <div className="Model">
      <div className="ModelList">
        <div className="ModelHeader">
          <div className="ModelHeaderLogo">
            <img src={logo} onClick={handleClick} alt="" />
            <h1>
              ISHBEKOV <br /> STROI <br />
              SERVIS
            </h1>
          </div>
          <div className="HeaderText">
            <h3>YAKKABOG' CITY</h3>
            <p>ZAMONAVIY TURAR JOY MAJMUASI</p>
          </div>
        </div>
        <div className="ModelMain">
          <div className="ModelInfoTable">
            <table className="ModelInfoTable__list half">
              <thead>
                <tr>
                  <th colSpan={5}>XARIDOR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>To'liq ism</td>
                  <td>
                    <b>{getModel.full_name}</b>
                  </td>
                </tr>
                <tr>
                  <td>Telefon raqam</td>
                  <td>
                    <b>{getModel.phone_number1}</b>
                  </td>
                </tr>
                <tr>
                  <td>Telefon raqam</td>
                  <td>
                    <b>{getModel?.phone_number2}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ModelInfoTable">
            <table className="ModelInfoTable__list">
              <thead>
                <tr>
                  <th colSpan={5}>
                    <b>XONADON</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Blok raqami</td>
                  <td>Podyezd</td>
                  <td>Qavat №</td>
                  <td>Xonadon raqami</td>
                  <td>Xonalar soni</td>
                </tr>

                <tr>
                  <td>
                    <b>1.{getModel?.block_number}</b>
                  </td>
                  <td>
                    <b>{getModel?.entrance}</b>
                  </td>
                  <td>
                    <b>{getModel?.floor}</b>
                  </td>
                  <td>
                    <b>{getModel?.apartment_number}</b>
                  </td>
                  <td>
                    <b>{getModel?.number_of_rooms}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ModelInfoTable">
            <table className="ModelInfoTable__list ">
              <thead>
                <tr>
                  <th colSpan={8}>
                    <b>QO'SHIMCHA MA'LUMOTLAR</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Xonadon maydoni m<sup>2</sup>
                  </td>
                  <td colSpan={5}>
                    <b>
                      {getModel?.field} m<sup>2</sup>
                    </b>
                  </td>
                </tr>

                <tr>
                  <td>
                    m<sup>2</sup> narxi
                  </td>
                  <td>
                    <b>
                      {formatmoney(+getModel?.price_per_square_meter)} so'm
                      {getModel.aksiya ? "**" : ""}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>
                    Umumiy m<sup>2</sup> narxi
                  </td>
                  <td>
                    <b>{formatmoney(+getModel?.total_price)} so'm</b>
                  </td>
                </tr>
                <tr>
                  <td>Boshlang'ich to'lov</td>
                  <td>
                    <b>
                      {formatmoney(+getModel?.initial_payment_amount)} so'm{" "}
                      <i>({getModel?.initial_payment_amount_percent}%)</i>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Qolgan to'lov</td>
                  <td>
                    <b>{formatmoney(+getModel?.qolgan_summa)} so'm</b>
                  </td>
                </tr>
                {getModel?.order_payment === "ipoteka" ? (
                  <Fragment>
                    <tr>
                      <td>Ipoteka to'lovi</td>
                      <td>
                        <b>{formatmoney(+getModel?.ipoteka_tulovi)} so'm **</b>
                      </td>
                    </tr>
                    <tr>
                      <td>Ipotekadan qolgan to'lov</td>
                      <td>
                        <b>
                          {formatmoney(+getModel?.ipotekadan_qolgan_tulov)} so'm
                          **
                        </b>
                      </td>
                    </tr>
                  </Fragment>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="ModelInfoTable">
            <table className="ModelInfoTable__listmoney">
              <thead>
                <tr>
                  <th colSpan={10}>
                    {getModel?.order_payment === "ipoteka"
                      ? 12
                      : getModel?.muddatli_tulov_oyi}{" "}
                    OYGA BO'LIB TO'LASH JADVALI
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 12 }, (_, i) => (
                  <tr key={i}>
                    {getModel?.order_payment == "ipoteka" ? (
                      <Fragment>
                        <td>{i + 1}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>
                      </Fragment>
                    ) : getModel?.muddatli_tulov_oyi === 12 ? (
                      <Fragment>
                        <td>{i + 1}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>
                      </Fragment>
                    ) : getModel?.muddatli_tulov_oyi === 24 ? (
                      <Fragment>
                        <td>{i + 1}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>
                        <td>{i + 13}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>{" "}
                      </Fragment>
                    ) : getModel?.muddatli_tulov_oyi === 36 ? (
                      <Fragment>
                        <td>{i + 1}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>
                        <td>{i + 13}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>{" "}
                        <td>{i + 25}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>{" "}
                      </Fragment>
                    ) : getModel?.muddatli_tulov_oyi === 48 ? (
                      <Fragment>
                        <td>{i + 1}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>
                        <td>{i + 13}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>{" "}
                        <td>{i + 25}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>{" "}
                        <td>{i + 37}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>{" "}
                      </Fragment>
                    ) : getModel?.muddatli_tulov_oyi === 60 ? (
                      <Fragment>
                        <td>{i + 1}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>
                        <td>{i + 13}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>{" "}
                        <td>{i + 25}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>{" "}
                        <td>{i + 37}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>{" "}
                        <td>{i + 49}</td>
                        <td>
                          <b>{formatmoney(getModel?.rassrochka)} so'm</b>
                        </td>{" "}
                      </Fragment>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
            {getModel?.order_payment === "ipoteka" ? (
              <h6>
                * Kadastr xujjatlari tayyor bo'lganidan so'ng qolgan{" "}
                {formatmoney(getModel.ipoteka_tulovi)} so'm xaridor va ixtiyoriy
                bank kelishuvi orqali Ipoteka Krediti rasmiylashtiriladi.
              </h6>
            ) : null}
            {getModel.aksiya ? (
              <h6>
                ** Yakkabog' City turar joy majmuasining birinchi o'nta mijoziga
                qo'llanilinadi.
              </h6>
            ) : null}{" "}
            <br />
            <br />
            <div className="table__numbers">
              <h3>
                +99877 005-00-38 <i>Tahirjon</i>
              </h3>
              <h3>
                +99893 224-66-43 <i>Akmal</i>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// getModel
