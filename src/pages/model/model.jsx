import React, { Fragment, useContext } from "react";
import "./model.css";
import logo from "../../images/main/logo.png";
import { MainContext } from "../../utils/context/context";
import { formatmoney, ipotekaSummaMinus } from "../../utils/functions";
export const Model = () => {
  const { contractData, modelData } = useContext(MainContext);

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
            <table className="ModelInfoTable__list">
              <thead>
                <tr>
                  <th colSpan={5}>XARIDOR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>To'liq ism</td>
                  <td>Telefon raqam</td>
                  <td>Telefon raqam</td>
                </tr>
                <tr>
                  <td>
                    <b>{modelData.full_name}</b>
                  </td>
                  <td>
                    <b>{modelData.phone_number1}</b>
                  </td>
                  <td>
                    <b>{modelData?.phone_number2}</b>
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
                    <b>1.{contractData?.block_number}</b>
                  </td>
                  <td>
                    <b>{contractData?.entrance}</b>
                  </td>
                  <td>
                    <b>{contractData?.floor}</b>
                  </td>
                  <td>
                    <b>{contractData?.apartment_number}</b>
                  </td>
                  <td>
                    <b>{contractData?.number_of_rooms}</b>
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
                  <td colSpan={7}>
                    <b>
                      {contractData?.field} m<sup>2</sup>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Boshlang'ich tolovni</td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    <b>{0 * 100} %</b>
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.2
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    <b>{0.2 * 100} %</b>
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.3
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    <b>{0.3 * 100} %</b>
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.5
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    <b>{0.5 * 100} %</b>
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi && contractData.aksiya
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    <b>
                      Aksiya <sup>**</sup>{" "}
                    </b>
                  </td>
                  {modelData?.vibor_ochiqmi ? (
                    <td className="table__aksiya">
                      <b>Kelishilgan</b>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
                <tr>
                  <td>
                    m<sup>2</sup> narxi
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(+contractData?.price_per_square_meter)}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.2
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      +contractData?.price_per_square_meter - 200 * 1000
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.3
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      +contractData?.price_per_square_meter - 400 * 1000
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.5
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      +contractData?.price_per_square_meter - 600 * 1000
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi && contractData.aksiya
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(+contractData?.price_per_square_meter * 0.9)}
                  </td>
                  {modelData?.vibor_ochiqmi ? (
                    <td className="table__aksiya">
                      {formatmoney(modelData?.vibor_price_per_square_meter)}
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
                <tr>
                  <td>
                    Umumiy m<sup>2</sup> narxi
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      +contractData?.price_per_square_meter * contractData.field
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.2
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      (+contractData?.price_per_square_meter - 200 * 1000) *
                        contractData.field
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.3
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      (+contractData?.price_per_square_meter - 400 * 1000) *
                        contractData.field
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.5
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      (+contractData?.price_per_square_meter - 600 * 1000) *
                        contractData.field
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi && contractData.aksiya
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      +contractData?.price_per_square_meter *
                        0.9 *
                        contractData.field
                    )}
                  </td>
                  {modelData?.vibor_ochiqmi ? (
                    <td className="table__aksiya">
                      {formatmoney(modelData?.vibor_total_price)}
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
                <tr>
                  <td>Boshlang'ich to'lov</td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      +contractData?.price_per_square_meter *
                        contractData.field *
                        0
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.2
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      (+contractData?.price_per_square_meter - 200 * 1000) *
                        contractData.field *
                        0.2
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.3
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      (+contractData?.price_per_square_meter - 400 * 1000) *
                        contractData.field *
                        0.3
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.5
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      (+contractData?.price_per_square_meter - 600 * 1000) *
                        contractData.field *
                        0.5
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi && contractData.aksiya
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      +contractData?.price_per_square_meter *
                        0.9 *
                        contractData.field *
                        +contractData?.rassrochkaFoiz
                    )}{" "}
                    <i>({contractData?.rassrochkaFoiz * 100}%)</i>
                  </td>
                  {modelData?.vibor_ochiqmi ? (
                    <td className="table__aksiya">
                      {formatmoney(+modelData?.vibor_initial_payment_amount)}{" "}
                      <i>
                        ({modelData?.vibor_initial_payment_amount_percent}%)
                      </i>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
                <tr>
                  <td>Qolgan to'lov</td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      +contractData?.price_per_square_meter *
                        contractData.field -
                        +contractData?.price_per_square_meter *
                          contractData.field *
                          0
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.2
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      (+contractData?.price_per_square_meter - 200 * 1000) *
                        contractData.field -
                        (+contractData?.price_per_square_meter - 200 * 1000) *
                          contractData.field *
                          0.2
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.3
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      (+contractData?.price_per_square_meter - 400 * 1000) *
                        contractData.field -
                        (+contractData?.price_per_square_meter - 400 * 1000) *
                          contractData.field *
                          0.3
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.5
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      (+contractData?.price_per_square_meter - 600 * 1000) *
                        contractData.field -
                        (+contractData?.price_per_square_meter - 600 * 1000) *
                          contractData.field *
                          0.5
                    )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi && contractData.aksiya
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {formatmoney(
                      +contractData?.price_per_square_meter *
                        0.9 *
                        contractData.field -
                        +contractData?.price_per_square_meter *
                          0.9 *
                          contractData.field *
                          +contractData?.rassrochkaFoiz
                    )}
                  </td>
                  {modelData?.vibor_ochiqmi ? (
                    <td className="table__aksiya">
                      {formatmoney(modelData?.vibor_qolgan_summa)}
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
                {modelData?.order_payment === "ipoteka" ? (
                  <Fragment>
                    <tr>
                      <td>Ipoteka to'lovi</td>
                      <td
                        className={`${
                          !modelData?.vibor_ochiqmi &&
                          !contractData.aksiya &&
                          contractData.rassrochkaFoiz == 0
                            ? `table__aksiya`
                            : ""
                        }`}
                      >
                        {formatmoney(
                          +ipotekaSummaMinus(
                            +contractData?.price_per_square_meter *
                              contractData.field -
                              +contractData?.price_per_square_meter *
                                contractData.field *
                                0
                          ).ipoteka
                        )}
                      </td>
                      <td
                        className={`${
                          !modelData?.vibor_ochiqmi &&
                          !contractData.aksiya &&
                          contractData.rassrochkaFoiz == 0.2
                            ? `table__aksiya`
                            : ""
                        }`}
                      >
                        {formatmoney(
                          +ipotekaSummaMinus(
                            (+contractData?.price_per_square_meter -
                              200 * 1000) *
                              contractData.field -
                              (+contractData?.price_per_square_meter -
                                200 * 1000) *
                                contractData.field *
                                0.2
                          ).ipoteka
                        )}
                      </td>
                      <td
                        className={`${
                          !modelData?.vibor_ochiqmi &&
                          !contractData.aksiya &&
                          contractData.rassrochkaFoiz == 0.3
                            ? `table__aksiya`
                            : ""
                        }`}
                      >
                        {formatmoney(
                          +ipotekaSummaMinus(
                            (+contractData?.price_per_square_meter -
                              400 * 1000) *
                              contractData.field -
                              (+contractData?.price_per_square_meter -
                                400 * 1000) *
                                contractData.field *
                                0.3
                          ).ipoteka
                        )}
                      </td>
                      <td
                        className={`${
                          !modelData?.vibor_ochiqmi &&
                          !contractData.aksiya &&
                          contractData.rassrochkaFoiz == 0.5
                            ? `table__aksiya`
                            : ""
                        }`}
                      >
                        {formatmoney(
                          +ipotekaSummaMinus(
                            (+contractData?.price_per_square_meter -
                              600 * 1000) *
                              contractData.field -
                              (+contractData?.price_per_square_meter -
                                600 * 1000) *
                                contractData.field *
                                0.5
                          ).ipoteka
                        )}
                      </td>
                      <td
                        className={`${
                          !modelData?.vibor_ochiqmi && contractData.aksiya
                            ? `table__aksiya`
                            : ""
                        }`}
                      >
                        {formatmoney(
                          +ipotekaSummaMinus(
                            +contractData?.price_per_square_meter *
                              0.9 *
                              contractData.field -
                              +contractData?.price_per_square_meter *
                                0.9 *
                                contractData.field *
                                +contractData?.rassrochkaFoiz
                          ).ipoteka
                        )}
                      </td>
                      {modelData?.vibor_ochiqmi ? (
                        <td className="table__aksiya">
                          {formatmoney(modelData?.vibor_ipoteka_tulovi)}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                    <tr>
                      <td>Ipotekadan qolgan to'lov</td>
                      <td
                        className={`${
                          !modelData?.vibor_ochiqmi &&
                          !contractData.aksiya &&
                          contractData.rassrochkaFoiz == 0
                            ? `table__aksiya`
                            : ""
                        }`}
                      >
                        {modelData?.order_payment === "ipoteka"
                          ? formatmoney(
                              ipotekaSummaMinus(
                                +contractData?.price_per_square_meter *
                                  contractData.field -
                                  +contractData?.price_per_square_meter *
                                    contractData.field *
                                    0
                              ).qolgan_summa
                            ) + ` *`
                          : formatmoney(
                              +contractData?.price_per_square_meter *
                                contractData.field -
                                +contractData?.price_per_square_meter *
                                  contractData.field *
                                  0
                            )}
                      </td>
                      <td
                        className={`${
                          !modelData?.vibor_ochiqmi &&
                          !contractData.aksiya &&
                          contractData.rassrochkaFoiz == 0.2
                            ? `table__aksiya`
                            : ""
                        }`}
                      >
                        {modelData?.order_payment === "ipoteka"
                          ? formatmoney(
                              ipotekaSummaMinus(
                                (+contractData?.price_per_square_meter -
                                  200 * 1000) *
                                  contractData.field -
                                  (+contractData?.price_per_square_meter -
                                    200 * 1000) *
                                    contractData.field *
                                    0.2
                              ).qolgan_summa
                            ) + ` *`
                          : formatmoney(
                              (+contractData?.price_per_square_meter -
                                200 * 1000) *
                                contractData.field -
                                (+contractData?.price_per_square_meter -
                                  200 * 1000) *
                                  contractData.field *
                                  0.2
                            )}
                      </td>
                      <td
                        className={`${
                          !modelData?.vibor_ochiqmi &&
                          !contractData.aksiya &&
                          contractData.rassrochkaFoiz == 0.3
                            ? `table__aksiya`
                            : ""
                        }`}
                      >
                        {modelData?.order_payment === "ipoteka"
                          ? formatmoney(
                              ipotekaSummaMinus(
                                (+contractData?.price_per_square_meter -
                                  400 * 1000) *
                                  contractData.field -
                                  (+contractData?.price_per_square_meter -
                                    400 * 1000) *
                                    contractData.field *
                                    0.3
                              ).qolgan_summa
                            ) + ` *`
                          : formatmoney(
                              (+contractData?.price_per_square_meter -
                                400 * 1000) *
                                contractData.field -
                                (+contractData?.price_per_square_meter -
                                  400 * 1000) *
                                  contractData.field *
                                  0.3
                            )}
                      </td>
                      <td
                        className={`${
                          !modelData?.vibor_ochiqmi &&
                          !contractData.aksiya &&
                          contractData.rassrochkaFoiz == 0.5
                            ? `table__aksiya`
                            : ""
                        }`}
                      >
                        {modelData?.order_payment === "ipoteka"
                          ? formatmoney(
                              ipotekaSummaMinus(
                                (+contractData?.price_per_square_meter -
                                  600 * 1000) *
                                  contractData.field -
                                  (+contractData?.price_per_square_meter -
                                    600 * 1000) *
                                    contractData.field *
                                    0.5
                              ).qolgan_summa
                            ) + ` *`
                          : formatmoney(
                              (+contractData?.price_per_square_meter -
                                600 * 1000) *
                                contractData.field -
                                (+contractData?.price_per_square_meter -
                                  600 * 1000) *
                                  contractData.field *
                                  0.5
                            )}
                      </td>
                      <td
                        className={`${
                          !modelData?.vibor_ochiqmi && contractData.aksiya
                            ? `table__aksiya`
                            : ""
                        }`}
                      >
                        {modelData?.order_payment === "ipoteka"
                          ? formatmoney(
                              ipotekaSummaMinus(
                                +contractData?.price_per_square_meter *
                                  0.9 *
                                  contractData.field -
                                  +contractData?.price_per_square_meter *
                                    0.9 *
                                    contractData.field *
                                    +contractData?.rassrochkaFoiz
                              ).qolgan_summa
                            ) + ` *`
                          : formatmoney(
                              +contractData?.price_per_square_meter *
                                0.9 *
                                contractData.field -
                                (+modelData.initial_payment_amount ||
                                  contractData?.boshlangich_summasi)
                            )}
                      </td>
                      {modelData?.vibor_ochiqmi ? (
                        <td className="table__aksiya">
                          {formatmoney(
                            modelData?.vibor_ipotekadan_qolgan_tulov
                          )}
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  </Fragment>
                ) : null}

                <tr>
                  <td>
                    Rassrochka{" "}
                    <i>
                      (
                      {modelData?.order_payment === "ipoteka"
                        ? 12
                        : modelData?.muddatli_tulov_oyi}
                      )
                    </i>
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {modelData?.order_payment === "ipoteka"
                      ? formatmoney(
                          ipotekaSummaMinus(
                            +contractData?.price_per_square_meter *
                              contractData.field -
                              +contractData?.price_per_square_meter *
                                contractData.field *
                                0
                          ).qolgan_summa / 12
                        )
                      : formatmoney(
                          (+contractData?.price_per_square_meter *
                            contractData.field -
                            +contractData?.price_per_square_meter *
                              contractData.field *
                              0) /
                            +modelData?.muddatli_tulov_oyi
                        )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.2
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {modelData?.order_payment === "ipoteka"
                      ? formatmoney(
                          ipotekaSummaMinus(
                            (+contractData?.price_per_square_meter -
                              200 * 1000) *
                              contractData.field -
                              (+contractData?.price_per_square_meter -
                                200 * 1000) *
                                contractData.field *
                                0.2
                          ).qolgan_summa / 12
                        )
                      : formatmoney(
                          ((+contractData?.price_per_square_meter -
                            200 * 1000) *
                            contractData.field -
                            (+contractData?.price_per_square_meter -
                              200 * 1000) *
                              contractData.field *
                              0.2) /
                            +modelData?.muddatli_tulov_oyi
                        )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.3
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {modelData?.order_payment === "ipoteka"
                      ? formatmoney(
                          ipotekaSummaMinus(
                            (+contractData?.price_per_square_meter -
                              400 * 1000) *
                              contractData.field -
                              (+contractData?.price_per_square_meter -
                                400 * 1000) *
                                contractData.field *
                                0.3
                          ).qolgan_summa / 12
                        )
                      : formatmoney(
                          ((+contractData?.price_per_square_meter -
                            400 * 1000) *
                            contractData.field -
                            (+contractData?.price_per_square_meter -
                              400 * 1000) *
                              contractData.field *
                              0.3) /
                            +modelData?.muddatli_tulov_oyi
                        )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi &&
                      !contractData.aksiya &&
                      contractData.rassrochkaFoiz == 0.5
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {modelData?.order_payment === "ipoteka"
                      ? formatmoney(
                          ipotekaSummaMinus(
                            (+contractData?.price_per_square_meter -
                              600 * 1000) *
                              contractData.field -
                              (+contractData?.price_per_square_meter -
                                600 * 1000) *
                                contractData.field *
                                0.5
                          ).qolgan_summa / 12
                        )
                      : formatmoney(
                          ((+contractData?.price_per_square_meter -
                            600 * 1000) *
                            contractData.field -
                            (+contractData?.price_per_square_meter -
                              600 * 1000) *
                              contractData.field *
                              0.5) /
                            +modelData?.muddatli_tulov_oyi
                        )}
                  </td>
                  <td
                    className={`${
                      !modelData?.vibor_ochiqmi && contractData.aksiya
                        ? `table__aksiya`
                        : ""
                    }`}
                  >
                    {modelData?.order_payment === "ipoteka"
                      ? formatmoney(
                          ipotekaSummaMinus(
                            +contractData?.price_per_square_meter *
                              0.9 *
                              contractData.field -
                              (+modelData.initial_payment_amount ||
                                contractData?.boshlangich_summasi)
                          ).qolgan_summa / 12
                        )
                      : formatmoney(
                          (+contractData?.price_per_square_meter *
                            0.9 *
                            contractData.field -
                            (+modelData.initial_payment_amount ||
                              contractData?.boshlangich_summasi)) /
                            +modelData?.muddatli_tulov_oyi
                        )}
                  </td>
                  {modelData?.vibor_ochiqmi ? (
                    <td className="table__aksiya">
                      {formatmoney(modelData?.vibor_rassrochka)}
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          {modelData?.vibor_ochiqmi ? (
            <div className="ModelInfoTable">
              <table className="ModelInfoTable__listmoney">
                <thead>
                  <tr>
                    <th colSpan={10}>
                      {modelData?.order_payment === "ipoteka"
                        ? 12
                        : modelData?.muddatli_tulov_oyi}{" "}
                      OYGA BO'LIB TO'LASH JADVALI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 12 }, (_, i) => (
                    <tr key={i}>
                      {modelData?.order_payment == "ipoteka" ? (
                        <Fragment>
                          <td>{i + 1}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>
                        </Fragment>
                      ) : modelData?.muddatli_tulov_oyi === 12 ? (
                        <Fragment>
                          <td>{i + 1}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>
                        </Fragment>
                      ) : modelData?.muddatli_tulov_oyi === 24 ? (
                        <Fragment>
                          <td>{i + 1}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>
                          <td>{i + 13}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>{" "}
                        </Fragment>
                      ) : modelData?.muddatli_tulov_oyi === 36 ? (
                        <Fragment>
                          <td>{i + 1}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>
                          <td>{i + 13}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>{" "}
                          <td>{i + 25}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>{" "}
                        </Fragment>
                      ) : modelData?.muddatli_tulov_oyi === 48 ? (
                        <Fragment>
                          <td>{i + 1}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>
                          <td>{i + 13}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>{" "}
                          <td>{i + 25}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>{" "}
                          <td>{i + 37}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>{" "}
                        </Fragment>
                      ) : modelData?.muddatli_tulov_oyi === 60 ? (
                        <Fragment>
                          <td>{i + 1}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>
                          <td>{i + 13}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>{" "}
                          <td>{i + 25}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>{" "}
                          <td>{i + 37}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>{" "}
                          <td>{i + 49}</td>
                          <td>
                            <b>
                              {formatmoney(modelData?.vibor_rassrochka)} so'm
                            </b>
                          </td>{" "}
                        </Fragment>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
              {modelData?.order_payment === "ipoteka" ? (
                <h6>
                  * Kadastr xujjatlari tayyor bo'lganidan so'ng qolgan{" "}
                  {formatmoney(modelData?.vibor_ipoteka_tulovi)} so'm xaridor va
                  ixtiyoriy bank kelishuvi orqali Ipoteka Krediti
                  rasmiylashtiriladi.
                </h6>
              ) : null}
              {contractData.aksiya ? (
                <h6>
                  ** Yakkabog' City turar joy majmuasining birinchi o'nta
                  mijoziga qo'llanilinadi.
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
          ) : (
            <Fragment>
              <div className="ModelInfoTable">
                <table className="ModelInfoTable__listmoney">
                  <thead>
                    <tr>
                      <th colSpan={10}>
                        {modelData?.order_payment === "ipoteka"
                          ? 12
                          : modelData?.muddatli_tulov_oyi}{" "}
                        OYGA BO'LIB TO'LASH JADVALI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 12 }, (_, i) => (
                      <tr key={i}>
                        {modelData?.order_payment == "ipoteka" ? (
                          <Fragment>
                            <td>{i + 1}</td>
                            <td>
                              <b>
                                {formatmoney(modelData?.qolgan_summa / 12)} so'm
                              </b>
                            </td>
                          </Fragment>
                        ) : modelData?.muddatli_tulov_oyi === 12 ? (
                          <Fragment>
                            <td>{i + 1}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>
                          </Fragment>
                        ) : modelData?.muddatli_tulov_oyi === 24 ? (
                          <Fragment>
                            <td>{i + 1}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>
                            <td>{i + 13}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>{" "}
                          </Fragment>
                        ) : modelData?.muddatli_tulov_oyi === 36 ? (
                          <Fragment>
                            <td>{i + 1}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>
                            <td>{i + 13}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>{" "}
                            <td>{i + 25}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>{" "}
                          </Fragment>
                        ) : modelData?.muddatli_tulov_oyi === 48 ? (
                          <Fragment>
                            <td>{i + 1}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>
                            <td>{i + 13}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>{" "}
                            <td>{i + 25}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>{" "}
                            <td>{i + 37}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>{" "}
                          </Fragment>
                        ) : modelData?.muddatli_tulov_oyi === 60 ? (
                          <Fragment>
                            <td>{i + 1}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>
                            <td>{i + 13}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>{" "}
                            <td>{i + 25}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>{" "}
                            <td>{i + 37}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>{" "}
                            <td>{i + 49}</td>
                            <td>
                              <b>
                                {formatmoney(
                                  modelData?.qolgan_summa /
                                    modelData?.muddatli_tulov_oyi
                                )}{" "}
                                so'm
                              </b>
                            </td>{" "}
                          </Fragment>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {modelData?.order_payment === "ipoteka" ? (
                  <h6>
                    * Kadastr xujjatlari tayyor bo'lganidan so'ng qolgan{" "}
                    {formatmoney(
                      +ipotekaSummaMinus(contractData?.qolgan_summa).ipoteka
                    )}{" "}
                    so'm xaridor va ixtiyoriy bank kelishuvi orqali Ipoteka
                    Krediti rasmiylashtiriladi.
                  </h6>
                ) : null}
                {contractData.aksiya ? (
                  <h6>
                    ** Yakkabog' City turar joy majmuasining birinchi o'nta
                    mijoziga qo'llanilinadi.
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
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
