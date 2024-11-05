import React, { Fragment } from "react";
import "./contract-list.css";
import { Header } from "../../../components";
import { getRequest } from "../../../request";
import { useQuery } from "react-query";
import { Errors } from "../../../utils/errors";
import { Link } from "react-router-dom";

const fetchData = async () => {
  const data = await getRequest("contract/list");
  return data;
};

export const ContractList = () => {
  const { data, error, isLoading, refetch, isSuccess } = useQuery(
    "contract",
    fetchData
  );

  if (error) Errors(error);
  if (isSuccess) console.log(data?.data?.data?.result);

  return (
    <Fragment>
      <Header title={"SHARTNOMALAR"} />
      <div className="ContractList">
        <div className="ContractList__boxes">
          {isLoading ? (
            <h3>Загрузка...</h3>
          ) : (
            <Fragment>
              {data?.data?.data?.result?.map((elem) => (
                <div className="ContractListBoxes__box">
                  <div className="ContractListTitle">
                    <i className="fa-solid fa-file-invoice icon"></i>
                    <p>{elem?.id} - shartnoma</p>
                  </div>
                  <div className="ContractListInfo">
                    <div className="Infos">
                      <i class="fa-solid fa-diamond icon"></i>
                      <p>{elem?.fullName}</p>
                    </div>
                    <div className="Infos">
                      <i class="fa-solid fa-diamond icon"></i>
                      <p>
                        {elem?.number_of_rooms} Xonalik | {elem?.field} m
                        <sup>2</sup>
                      </p>
                    </div>
                    <div className="Infos">
                      <i class="fa-solid fa-diamond icon"></i>
                      <p>
                        {elem?.floor}-Etaj | {elem?.apartment_number}-Xonadon
                      </p>
                    </div>
                    <div className="Infos">
                      <i class="fa-solid fa-diamond icon"></i>
                      <p>{elem?.phone_number1}</p>
                    </div>
                    <div className="Infos">
                      <i class="fa-solid fa-diamond icon"></i>
                      <p>{elem?.phone_number2}</p>
                    </div>
                  </div>
                  <Link to={`/contract-get/` + elem?.id}>
                    <button className="ContractListBoxes__box__btn">
                      KIRISH
                    </button>
                  </Link>
                </div>
              ))}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};
