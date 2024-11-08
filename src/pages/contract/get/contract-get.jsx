import React, { Fragment, useContext } from "react";
import "./contract-get.css";
import { Header } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRequest } from "../../../request";
import { MainContext } from "../../../utils/context/context";

const fetchData = async (id) => {
  const data = await getRequest("contract/get/" + id);
  return data;
};

export const ContractGet = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { setShartnoma } = useContext(MainContext);

  const { data, error, isLoading, refetch, isSuccess } = useQuery(
    ["anketa", id], // Unique query key including the ID
    () => fetchData(id), // Use a callback to pass the id
    { enabled: !!id } // Only run the query if id exists
  );

  const handleOpen = (link) => {
    setShartnoma(data?.data?.data);
    navigate(link);
  };

  return (
    <Fragment>
      <Header title={"Shartnoma " + id} />
      <div className="ContractGet">
        {isLoading ? (
          <h3>Загрузка...</h3>
        ) : (
          <Fragment>
            <button onClick={() => handleOpen("/pdf-bayonnoma")}>
              ЧИТАТЬ PDF-ФАЙЛ БАЁННОМА
            </button>
            <br />
            <br />
            <button onClick={() => handleOpen("/pdf-contract")}>
              ЧИТАТЬ PDF-ФАЙЛ ДОГОВОРЬ
            </button>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};
