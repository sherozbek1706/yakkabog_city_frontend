import React, { Fragment, useContext, useState } from "react";
import { Header } from "../../../components";
import { getRequest } from "../../../request";
import { useQuery } from "react-query";
import { Errors } from "../../../utils/errors";
import { formatDate, formatmoney } from "../../../utils/functions";
import "./list-anketa.css";
import { MainContext } from "../../../utils/context/context";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../shared/services";
import { info_notify } from "../../../shared/notify";

const fetchData = async () => {
  const data = await getRequest("anketa/list");
  return data;
};

export const ListAnketa = () => {
  const { data, error, isLoading, refetch, isSuccess } = useQuery(
    "anketa",
    fetchData
  );
  const { setGetModel } = useContext(MainContext);
  const navigate = useNavigate();
  const [expandedGroup, setExpandedGroup] = useState(null);

  if (error) Errors(error);

  const handleSelect = (elem) => {
    setGetModel(elem);
    navigate("/get-model");
  };

  const handleContract = (elem) => {
    console.log(elem);

    setGetModel(elem);
    navigate("/contract-add");
  };

  const handleDelete = async (id) => {
    try {
      let data = await axiosInstance.delete("anketa/remove/" + id);
      refetch();
      info_notify("Anketa o'chirildi");
    } catch (error) {
      Errors(error);
    }
  };

  const handleToggle = (phone_number) => {
    setExpandedGroup(expandedGroup === phone_number ? null : phone_number);
  };

  const groupedClientsArray = isSuccess
    ? Object.values(
        data?.data?.data?.result.reduce((acc, client) => {
          const key = client.phone_number1;
          if (!acc[key]) {
            acc[key] = { phone_number: key, clients: [] };
          }
          acc[key].clients.push(client);
          return acc;
        }, {})
      )
    : null;

  return (
    <Fragment>
      <Header title={"ANKETALAR JADVALI"} />
      <div className="ListAnketa">
        <div className="MainTable">
          <table className="MainTable__list">
            <thead>
              <tr>
                <th>No</th>
                <th></th>
                <th>To'liq ism</th>
                <th>Sana</th>
                <th>
                  Telefon raqam <br />
                  Номер телефона
                </th>
                <th>Qo'sh/ Telefon raqam</th>
                <th>To'lov</th>
                <th>
                  Muddatli <br /> to'lov
                </th>
                <th>Podyezd</th>
                <th>Etaj</th>
                <th>
                  Maydon m<sup>2</sup>
                </th>
                <th>
                  m<sup>2</sup> narxi
                </th>
                <th>Aksiya</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? "Loading..."
                : groupedClientsArray?.map((group, groupIdx) => (
                    <Fragment key={groupIdx}>
                      <tr
                        className={`group-header ${
                          expandedGroup !== group.phone_number
                            ? "collapsed"
                            : ""
                        }`}
                      >
                        <td>{groupIdx + 1}</td>
                        <td
                          className="group-header-icons"
                          onClick={() => handleToggle(group.phone_number)}
                        >
                          {group.clients.length === 1 ? (
                            <>
                              <i className="fa-solid fa-minus icon"></i>
                            </>
                          ) : expandedGroup === group.phone_number ? (
                            <i className="fa-solid fa-caret-up icon"></i>
                          ) : (
                            <i className="fa-solid fa-caret-down icon"></i>
                          )}
                        </td>
                        <td>{group.clients[0].full_name}</td>
                        <td>{formatDate(group.clients[0].created_at, true)}</td>
                        <td>{group.phone_number}</td>
                        <td>{group.clients[0].phone_number2}</td>
                        <td>{group.clients[0].order_payment}</td>
                        <td>{group.clients[0].muddatli_tulov_oyi}</td>
                        <td>{group.clients[0].entrance}</td>
                        <td>{group.clients[0].floor}</td>
                        <td>
                          {group.clients[0].field} m<sup>2</sup>
                        </td>
                        <td>
                          {formatmoney(group.clients[0].price_per_square_meter)}{" "}
                          so'm
                        </td>
                        <td>{group.clients[0].aksiya ? `✅` : "❌"}</td>
                        <td>
                          <div className="table_icon">
                            <i
                              className="fa-solid fa-address-card icon"
                              onClick={() => handleContract(group.clients[0])}
                            ></i>
                          </div>
                        </td>
                        <td>
                          <div className="table_icon">
                            <i
                              className="fa-solid fa-eye icon"
                              onClick={() => handleSelect(group.clients[0])}
                            ></i>
                          </div>
                        </td>
                        <td>
                          <div className="table_icon">
                            <i
                              className="fa-solid fa-trash-can icon"
                              onClick={() => handleDelete(group.clients[0]?.id)}
                            ></i>
                          </div>
                        </td>
                      </tr>

                      {/* Qo'shimcha qatorlar - agar ochilgan bo'lsa (<b> tegsiz) */}
                      {expandedGroup === group.phone_number &&
                        group.clients.slice(1).map((elem, idx) => (
                          <tr key={elem.id} className="expanded-row">
                            <td></td>
                            <td>{idx + 2}</td>
                            <td>{elem.full_name}</td>
                            <td>{formatDate(elem.created_at, true)}</td>
                            <td>{elem.phone_number1}</td>
                            <td>{elem.phone_number2}</td>
                            <td>{elem.order_payment}</td>
                            <td>{elem.muddatli_tulov_oyi}</td>
                            <td>{elem.entrance}</td>
                            <td>{elem.floor}</td>
                            <td>
                              {elem.field} m<sup>2</sup>
                            </td>
                            <td>
                              {formatmoney(elem.price_per_square_meter)} so'm
                            </td>
                            <td>{elem.aksiya ? `✅` : "❌"}</td>
                            <td>
                              <div className="table_icon">
                                <i
                                  className="fa-solid fa-address-card icon"
                                  onClick={() => handleContract(elem)}
                                ></i>
                              </div>
                            </td>
                            <td>
                              <div className="table_icon">
                                <i
                                  className="fa-solid fa-eye icon"
                                  onClick={() => handleSelect(elem)}
                                ></i>
                              </div>
                            </td>
                            <td>
                              <div className="table_icon">
                                <i
                                  className="fa-solid fa-trash-can icon"
                                  onClick={() => handleDelete(elem?.id)}
                                ></i>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </Fragment>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
