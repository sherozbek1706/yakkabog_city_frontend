import React, { Fragment, useContext } from "react";
import "./apartment.css";
import { Header } from "../../components";
import { getRequest } from "../../request";
import { useQuery } from "react-query";
import { Errors } from "../../utils/errors";
import { formatmoney, metr_kvadrat_chegirma } from "../../utils/functions";
import { Link } from "react-router-dom";
import { ApartmentFilter } from "./filter/apartment-filter";
import { MainContext } from "../../utils/context/context";

const fetchData = async (
  isSold,
  apartmentNumber,
  totalPrice,
  entrance,
  floor,
  number_of_rooms,
  block_number
) => {
  const queryParams = new URLSearchParams();

  if (isSold !== null && isSold !== undefined) {
    queryParams.append("is_sold", isSold);
  }

  if (
    apartmentNumber !== null &&
    apartmentNumber !== undefined &&
    apartmentNumber !== "Tanlang"
  ) {
    queryParams.append("apartment_number", apartmentNumber);
  }

  if (
    totalPrice !== null &&
    totalPrice !== undefined &&
    totalPrice !== "Tanlang"
  ) {
    queryParams.append("total_price", totalPrice);
  }

  if (entrance !== null && entrance !== 0) {
    queryParams.append("entrance", entrance);
  }

  if (floor !== null && floor !== 0) {
    queryParams.append("floor", floor);
  }

  if (number_of_rooms !== null && number_of_rooms !== 0) {
    queryParams.append("number_of_rooms", number_of_rooms);
  }
  if (block_number !== null && block_number !== 0) {
    queryParams.append("block_number", block_number);
  }

  const data = await getRequest(`apartment/list?${queryParams.toString()}`);
  return data;
};

export const Apartment = () => {
  const {
    isSold,
    apartmentNumber,
    totalPrice,
    entrance,
    floor,
    number_of_rooms,
    rassrochka,
    setContractData,
    contractData,
    toSum,
    boshlangich_tulow,
    block_number,
    aksiya_percent,
    setCompareData,
    compareData,
    isCompare,
    muddatli_tulovw,
  } = useContext(MainContext);

  const { data, error, isLoading } = useQuery(
    [
      "apartment",
      isSold,
      apartmentNumber,
      totalPrice,
      entrance,
      floor,
      number_of_rooms,
      block_number,
    ],
    () =>
      fetchData(
        isSold,
        apartmentNumber,
        totalPrice,
        entrance,
        floor,
        number_of_rooms,
        block_number
      ), // Include apartmentNumber in the fetch function
    {
      enabled: true,
    }
  );

  if (error) Errors(error);

  const apartmentList = data?.data?.data?.result || [];
  const rassrochkaFoiz = +rassrochka.split("&")[0];
  const rassrochkaSumma = +rassrochka.split("&")[1];

  const handleTouchApartment = async (elem) => {
    let metr_kvadrat_summasi = aksiya_percent
      ? elem.price_per_square_meter * 0.9
      : elem.price_per_square_meter - rassrochkaSumma;
    let umumiy_summasi = aksiya_percent
      ? elem.price_per_square_meter * 0.9 * elem.field
      : (elem.price_per_square_meter - rassrochkaSumma) * elem.field;
    let boshlangich_summasi = aksiya_percent
      ? elem.price_per_square_meter * 0.9 * elem.field * rassrochkaFoiz
      : (elem.price_per_square_meter - rassrochkaSumma) *
        elem.field *
        rassrochkaFoiz;

    let chegirma = aksiya_percent
      ? elem.total_price - elem.price_per_square_meter * 0.9 * elem.field
      : elem.total_price -
        (elem.price_per_square_meter - rassrochkaSumma) * elem.field;
    let qolgan_summa = aksiya_percent
      ? elem.price_per_square_meter * 0.9 * elem.field -
        elem.price_per_square_meter * 0.9 * elem.field * rassrochkaFoiz
      : (elem.price_per_square_meter - rassrochkaSumma) * elem.field -
        (elem.price_per_square_meter - rassrochkaSumma) *
          elem.field *
          rassrochkaFoiz;

    setContractData({
      ...elem,
      metr_kvadrat_summasi,
      umumiy_summasi,
      boshlangich_summasi,
      chegirma,
      qolgan_summa,
      rassrochkaFoiz,
      aksiya: aksiya_percent,
    });
  };

  const muddatlitulovbormi = muddatli_tulovw > 0 && muddatli_tulovw < 61;

  return (
    <Fragment>
      <Header title="XONADONLAR" />
      <ApartmentFilter />
      <div className="Apartment">
        <div className="MainTable">
          <table className="MainTable__list">
            <thead>
              <tr>
                <th>ID</th>
                <th>
                  BLOK <br /> RAQAMI
                </th>
                <th>PODYEZD</th>
                <th>QAVAT</th>
                <th>
                  XONADON <br /> RAQAMI
                </th>
                <th>
                  XONALAR <br /> SONI
                </th>
                <th>
                  MAYDON M<sup>2</sup>
                </th>
                <th>
                  M<sup>2</sup> SUMMASI
                </th>
                <th>
                  UMUMIY <br /> SUMMASI
                </th>
                <th>
                  BOSHLANG'ICH <br /> SUMMASI
                </th>
                {muddatlitulovbormi ? (
                  <th>
                    BO'LIB <br /> TO'LASH {muddatli_tulovw} OYGA
                  </th>
                ) : null}
                <th>
                  {rassrochkaFoiz || aksiya_percent ? (
                    "CHEGIRMA"
                  ) : (
                    <>
                      UMUMIY <br /> QAVATLIGI
                    </>
                  )}
                </th>
                <th>
                  {rassrochkaFoiz || aksiya_percent ? (
                    <>
                      QOLGAN <br /> SUMMA
                    </>
                  ) : (
                    "ADMIN"
                  )}
                </th>
                {toSum ? (
                  <th>
                    BOSHLANG'ICH <br /> FOIZ
                  </th>
                ) : null}
                <th>SOTILGANMI</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="13">Loading...</td>
                </tr>
              ) : isCompare ? (
                compareData.length > 0 ? (
                  compareData.map((elem, idx) => (
                    <tr
                      key={elem.id}
                      className={`${
                        contractData?.id === elem.id ? "select-tr" : null
                      }`}
                    >
                      <td>{idx + 1}</td>
                      <td>{elem.block_number}</td>
                      <td>{elem.entrance}</td>
                      <td>
                        <Link to={`/apartment/floor/${elem.floor}`}>
                          {elem.floor}
                        </Link>
                      </td>
                      <td>{elem.apartment_number}</td>
                      <td>{elem.number_of_rooms}</td>
                      <td>
                        {elem.field} m<sup>2</sup>
                      </td>
                      {toSum ? (
                        <Fragment>
                          <td>
                            {" "}
                            t
                            {formatmoney(
                              elem.price_per_square_meter -
                                metr_kvadrat_chegirma(
                                  (
                                    (100 * boshlangich_tulow) /
                                    ((elem.price_per_square_meter -
                                      metr_kvadrat_chegirma(
                                        (
                                          (100 * boshlangich_tulow) /
                                          elem.total_price
                                        ).toFixed(2)
                                      )) *
                                      elem.field)
                                  ).toFixed(2)
                                )
                            )}{" "}
                            so'm
                          </td>
                          <td>
                            {formatmoney(
                              (elem.price_per_square_meter -
                                metr_kvadrat_chegirma(
                                  (
                                    (100 * boshlangich_tulow) /
                                    elem.total_price
                                  ).toFixed(2)
                                )) *
                                elem.field
                            )}{" "}
                            so'm
                          </td>
                          <td>{formatmoney(+boshlangich_tulow)} so'm</td>
                          <td></td>
                          <td></td>
                          <td>
                            {(
                              (100 * boshlangich_tulow) /
                              ((elem.price_per_square_meter -
                                metr_kvadrat_chegirma(
                                  (
                                    (100 * boshlangich_tulow) /
                                    elem.total_price
                                  ).toFixed(2)
                                )) *
                                elem.field)
                            ).toFixed(2)}
                          </td>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <td>
                            {/* Metr kvadrat Summa */}
                            {aksiya_percent
                              ? formatmoney(elem.price_per_square_meter * 0.9)
                              : formatmoney(
                                  elem.price_per_square_meter - rassrochkaSumma
                                )}
                            so'm
                          </td>
                          <td>
                            {" "}
                            {/*  Umumiy summa */}
                            {aksiya_percent
                              ? formatmoney(
                                  elem.price_per_square_meter * 0.9 * elem.field
                                )
                              : formatmoney(
                                  (elem.price_per_square_meter -
                                    rassrochkaSumma) *
                                    elem.field
                                )}{" "}
                            so'm
                          </td>
                          <td>
                            {" "}
                            {/*  Boshlang'ich summa */}
                            {aksiya_percent
                              ? formatmoney(
                                  elem.price_per_square_meter *
                                    0.9 *
                                    elem.field *
                                    rassrochkaFoiz
                                )
                              : formatmoney(
                                  (elem.price_per_square_meter -
                                    rassrochkaSumma) *
                                    elem.field *
                                    rassrochkaFoiz
                                )}{" "}
                            so'm
                          </td>
                          {muddatlitulovbormi ? (
                            <td>
                              {aksiya_percent
                                ? formatmoney(
                                    (elem.price_per_square_meter *
                                      0.9 *
                                      elem.field -
                                      elem.price_per_square_meter *
                                        0.9 *
                                        elem.field *
                                        rassrochkaFoiz) /
                                      muddatli_tulovw
                                  )
                                : formatmoney(
                                    ((elem.price_per_square_meter -
                                      rassrochkaSumma) *
                                      elem.field -
                                      (elem.price_per_square_meter -
                                        rassrochkaSumma) *
                                        elem.field *
                                        rassrochkaFoiz) /
                                      muddatli_tulovw
                                  )}{" "}
                              so'm
                            </td>
                          ) : null}
                          <td>
                            {/* Chegirma  */}
                            {aksiya_percent
                              ? formatmoney(
                                  elem.total_price -
                                    elem.price_per_square_meter *
                                      0.9 *
                                      elem.field
                                )
                              : rassrochkaSumma
                              ? formatmoney(
                                  elem.total_price -
                                    (elem.price_per_square_meter -
                                      rassrochkaSumma) *
                                      elem.field
                                )
                              : elem.total_floor}
                          </td>
                          <td>
                            {" "}
                            {/* Qolgan summa  */}
                            {rassrochkaSumma
                              ? aksiya_percent
                                ? formatmoney(
                                    elem.price_per_square_meter *
                                      0.9 *
                                      elem.field -
                                      elem.price_per_square_meter *
                                        0.9 *
                                        elem.field *
                                        rassrochkaFoiz
                                  )
                                : formatmoney(
                                    (elem.price_per_square_meter -
                                      rassrochkaSumma) *
                                      elem.field -
                                      (elem.price_per_square_meter -
                                        rassrochkaSumma) *
                                        elem.field *
                                        rassrochkaFoiz
                                  )
                              : elem.first_name}
                          </td>
                        </Fragment>
                      )}

                      <td>
                        {elem.is_sold === "false"
                          ? "SOTILMAGAN"
                          : elem.is_sold === "bron"
                          ? "BRON QILINGAN"
                          : "SOTILGAN"}
                      </td>
                      <td>
                        <div className="table__icon">
                          <i
                            className={`fa-solid fa-file-circle-${
                              contractData?.id === elem.id
                                ? "plus icon-big"
                                : "minus"
                            } icon`}
                            onClick={() => handleTouchApartment(elem)}
                          ></i>
                        </div>
                      </td>
                      <td>
                        <div className="table__icon">
                          {!compareData.some((item) => item.id === elem.id) ? (
                            <i
                              className="fa-solid fa-shuffle icon"
                              onClick={() =>
                                setCompareData((prev) => [...prev, elem])
                              }
                            ></i>
                          ) : (
                            <i
                              className="fa-solid fa-xmark letcode icon"
                              onClick={() =>
                                setCompareData((prev) =>
                                  prev.filter((item) => item.id !== elem.id)
                                )
                              }
                            ></i>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13">Ma'lumot topilmadi!</td>
                  </tr>
                )
              ) : apartmentList.length > 0 ? (
                apartmentList.map((elem, idx) => (
                  <tr
                    key={elem.id}
                    className={`${
                      contractData?.id === elem.id ? "select-tr" : null
                    }`}
                  >
                    <td>{idx + 1}</td>
                    <td>{elem.block_number}</td>
                    <td>{elem.entrance}</td>
                    <td>
                      <Link to={`/apartment/floor/${elem.floor}`}>
                        {elem.floor}
                      </Link>
                    </td>
                    <td>{elem.apartment_number}</td>
                    <td>{elem.number_of_rooms}</td>
                    <td>
                      {elem.field} m<sup>2</sup>
                    </td>
                    {toSum ? (
                      <Fragment>
                        <td>
                          {" "}
                          {formatmoney(
                            elem.price_per_square_meter -
                              metr_kvadrat_chegirma(
                                (
                                  (100 * boshlangich_tulow) /
                                  ((elem.price_per_square_meter -
                                    metr_kvadrat_chegirma(
                                      (
                                        (100 * boshlangich_tulow) /
                                        elem.total_price
                                      ).toFixed(2)
                                    )) *
                                    elem.field)
                                ).toFixed(2)
                              )
                          )}{" "}
                          so'm
                        </td>
                        <td>
                          {formatmoney(
                            (elem.price_per_square_meter -
                              metr_kvadrat_chegirma(
                                (
                                  (100 * boshlangich_tulow) /
                                  elem.total_price
                                ).toFixed(2)
                              )) *
                              elem.field
                          )}{" "}
                          so'm
                        </td>
                        <td>{formatmoney(+boshlangich_tulow)} so'm</td>
                        <td></td>
                        <td></td>
                        <td>
                          {(
                            (100 * boshlangich_tulow) /
                            ((elem.price_per_square_meter -
                              metr_kvadrat_chegirma(
                                (
                                  (100 * boshlangich_tulow) /
                                  elem.total_price
                                ).toFixed(2)
                              )) *
                              elem.field)
                          ).toFixed(2)}
                        </td>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <td>
                          {/* Metr kvadrat Summa */}
                          {aksiya_percent
                            ? formatmoney(elem.price_per_square_meter * 0.9)
                            : formatmoney(
                                elem.price_per_square_meter - rassrochkaSumma
                              )}
                          so'm
                        </td>
                        <td>
                          {" "}
                          {/*  Umumiy summa */}
                          {aksiya_percent
                            ? formatmoney(
                                elem.price_per_square_meter * 0.9 * elem.field
                              )
                            : formatmoney(
                                (elem.price_per_square_meter -
                                  rassrochkaSumma) *
                                  elem.field
                              )}{" "}
                          so'm
                        </td>
                        <td>
                          {" "}
                          {/*  Boshlang'ich summa */}
                          {aksiya_percent
                            ? formatmoney(
                                elem.price_per_square_meter *
                                  0.9 *
                                  elem.field *
                                  rassrochkaFoiz
                              )
                            : formatmoney(
                                (elem.price_per_square_meter -
                                  rassrochkaSumma) *
                                  elem.field *
                                  rassrochkaFoiz
                              )}{" "}
                          so'm
                        </td>
                        {muddatlitulovbormi ? (
                          <td>
                            {aksiya_percent
                              ? formatmoney(
                                  (elem.price_per_square_meter *
                                    0.9 *
                                    elem.field -
                                    elem.price_per_square_meter *
                                      0.9 *
                                      elem.field *
                                      rassrochkaFoiz) /
                                    muddatli_tulovw
                                )
                              : formatmoney(
                                  ((elem.price_per_square_meter -
                                    rassrochkaSumma) *
                                    elem.field -
                                    (elem.price_per_square_meter -
                                      rassrochkaSumma) *
                                      elem.field *
                                      rassrochkaFoiz) /
                                    muddatli_tulovw
                                )}{" "}
                            so'm
                          </td>
                        ) : null}
                        <td>
                          {/* Chegirma  */}
                          {aksiya_percent
                            ? formatmoney(
                                elem.total_price -
                                  elem.price_per_square_meter * 0.9 * elem.field
                              )
                            : rassrochkaSumma
                            ? formatmoney(
                                elem.total_price -
                                  (elem.price_per_square_meter -
                                    rassrochkaSumma) *
                                    elem.field
                              )
                            : elem.total_floor}
                        </td>
                        <td>
                          {" "}
                          {/* Qolgan summa  */}
                          {rassrochkaSumma
                            ? aksiya_percent
                              ? formatmoney(
                                  elem.price_per_square_meter *
                                    0.9 *
                                    elem.field -
                                    elem.price_per_square_meter *
                                      0.9 *
                                      elem.field *
                                      rassrochkaFoiz
                                )
                              : formatmoney(
                                  (elem.price_per_square_meter -
                                    rassrochkaSumma) *
                                    elem.field -
                                    (elem.price_per_square_meter -
                                      rassrochkaSumma) *
                                      elem.field *
                                      rassrochkaFoiz
                                )
                            : elem.first_name}
                        </td>
                      </Fragment>
                    )}

                    <td>
                      {elem.is_sold === "false"
                        ? "SOTILMAGAN"
                        : elem.is_sold === "bron"
                        ? "BRON QILINGAN"
                        : "SOTILGAN"}
                    </td>
                    <td>
                      <div className="table__icon">
                        <i
                          className={`fa-solid fa-file-circle-${
                            contractData?.id === elem.id
                              ? "plus icon-big"
                              : "minus"
                          } icon`}
                          onClick={() => handleTouchApartment(elem)}
                        ></i>
                      </div>
                    </td>
                    <td>
                      <div className="table__icon">
                        {!compareData.some((item) => item.id === elem.id) ? (
                          <i
                            className="fa-solid fa-shuffle icon"
                            onClick={() =>
                              setCompareData((prev) => [...prev, elem])
                            }
                          ></i>
                        ) : (
                          <i
                            className="fa-solid fa-xmark letcode icon"
                            onClick={() =>
                              setCompareData((prev) =>
                                prev.filter((item) => item.id !== elem.id)
                              )
                            }
                          ></i>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13">Ma'lumot topilmadi!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
