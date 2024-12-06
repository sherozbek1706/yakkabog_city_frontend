import React, { Fragment, useContext } from "react";
import "./contract-get.css";
import { Header } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getRequest } from "../../../request";
import { MainContext } from "../../../utils/context/context";
import { formatmoney } from "../../../utils/functions/index";
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
      <div className="ContractGet border">
        {isLoading ? (
          <h3>Загрузка...</h3>
        ) : (
          <Fragment>
            <div className="w-full flex py-3 items-center justify-start gap-4">
              <div className="py-5 px-8 bg-indigo-500 rounded-lg flex justify-between items-center gap-2 shadow-lg">
                <i className="fa-solid fa-wallet text-white text-4xl"></i>
                <div className="min-w-52 px-4 border-l">
                  <p className="text-white text-m tracking-tight opacity-95 uppercase">
                    Umumiy narx
                  </p>
                  <p className="text-white text-xl font-semibold">
                    {formatmoney(data?.data?.data?.umumiy_summa)} so'm
                  </p>
                </div>
              </div>
              <div className="py-5 px-8 bg-indigo-500 rounded-lg flex justify-between items-center gap-2 shadow-lg">
                <i className="fa-solid fa-receipt text-white text-4xl"></i>
                <div className="min-w-52 px-4 border-l">
                  <p className="text-white text-m tracking-tight opacity-95 uppercase">
                    To'langan Summa
                  </p>
                  <p className="text-white text-xl font-semibold">
                    {formatmoney(data?.data?.data?.umumiy_tulangan_summa)} so'm
                  </p>
                </div>
              </div>
              <div className="py-5 px-8 bg-indigo-500 rounded-lg flex justify-between items-center gap-2 shadow-lg">
                <i className="fa-solid fa-percent text-white text-4xl"></i>
                <div className="min-w-52 px-4 border-l">
                  <p className="text-white text-m tracking-tight opacity-95 uppercase">
                    To'lov Foizda
                  </p>
                  <p className="text-white text-xl font-semibold">
                    {(
                      (100 / +data?.data?.data?.umumiy_summa) *
                      +data?.data?.data?.umumiy_tulangan_summa
                    ).toFixed(2)}{" "}
                    %
                  </p>
                </div>
              </div>
              <div className="py-5 px-8 bg-indigo-500 rounded-lg flex justify-between items-center gap-2 shadow-lg">
                <i className="fa-solid fa-money-bill-1-wave text-white text-4xl"></i>
                <div className="min-w-52 px-4 border-l">
                  <p className="text-white text-m tracking-tight opacity-95 uppercase">
                    Qolgan to'lov
                  </p>
                  <p className="text-white text-xl font-semibold">
                    {formatmoney(data?.data?.data?.qolgan_summa)} so'm
                  </p>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

{
  /* <button onClick={() => handleOpen("/pdf-bayonnoma")}>
              ЧИТАТЬ PDF-ФАЙЛ БАЁННОМА
            </button>
            <br />
            <br />
            <button onClick={() => handleOpen("/pdf-contract")}>
              ЧИТАТЬ PDF-ФАЙЛ ДОГОВОРЬ
            </button>
            <br />
            <br />
            <button onClick={() => handleOpen("/pdf-jadval")}>
              ЧИТАТЬ PDF-ФАЙЛ "Инвестиция ЖАДВАЛИ"
            </button> */
}
