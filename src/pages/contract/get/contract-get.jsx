import React, { Fragment, useContext, useState } from "react";
import { DashboardPayments, Header } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getRequest } from "../../../request";
import { MainContext } from "../../../utils/context/context";
import { formatDate, formatmoney } from "../../../utils/functions/index";
import { Errors } from "../../../utils/errors";
import { axiosInstance } from "../../../shared/services";
import { success_notify } from "../../../shared/notify";
import "./contract-get.css";
import loadingGif from "../../../images/main/loading_payment.gif";

const fetchData = async (id) => {
  const data = await getRequest("contract/get/" + id);
  return data;
};

const payMoney = async (newData) => {
  let data = await axiosInstance.post("contract/pay", newData);
  return data;
};

export const ContractGet = () => {
  const [tulov, setTulov] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Yangi loading holati

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { id } = useParams();

  const { setShartnoma, tulovlar } = useContext(MainContext);

  const {
    data,
    error,
    isLoading: isFetching,
    refetch,
    isSuccess,
  } = useQuery(["anketa", id], () => fetchData(id), { enabled: !!id });

  console.log(tulovlar);

  const mutation = useMutation(payMoney, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("data");
      success_notify("To'lov muvaffaqiyatli amalga oshirildi!");

      setTulov(0);
      setIsChecked(false);

      setTimeout(() => {
        setIsLoading(false);
        refetch(); // Loading ni to'xtatish
      }, 7000);
    },
    onError: (error) => {
      Errors(error);
      setIsLoading(false);
    },
  });

  const handleSubmit = async () => {
    setIsLoading(true); // Loadingni boshlash
    mutation.mutate({
      pay: +tulov,
      contract_id: data?.data?.data?.id,
    });
  };

  const handleOpen = (link) => {
    setShartnoma(data?.data?.data);
    navigate(link);
  };

  const isButtonEnabled = isChecked && tulov > 0;

  return (
    <Fragment>
      <Header title={"Shartnoma " + id} />
      <div className="ContractGet">
        {isFetching ? (
          <h3>Загрузка...</h3>
        ) : (
          <Fragment>
            {/* <div className="w-full flex py-3 items-center justify-start gap-4 flex-wrap"> */}
            <div className="w-full grid grid-cols-4 py-3  gap-4 ">
              <div className="py-5 px-8 bg-indigo-500 rounded-lg flex justify-start items-center gap-2 shadow-lg">
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
              <div className="py-5 px-8 bg-indigo-500 rounded-lg flex justify-start items-center gap-2 shadow-lg">
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
              <div className="py-5 px-8 bg-indigo-500 rounded-lg flex justify-start items-center gap-2 shadow-lg">
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
              <div className="py-5 px-8 bg-indigo-500 rounded-lg flex justify-start items-center gap-2 shadow-lg">
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
            <div>
              <h3 className="text-2xl uppercase font-bold text-center tracking-tight my-5">
                To'lovlar monitoringi - Grafik
              </h3>
              <DashboardPayments load={isLoading} />
            </div>
            <div className="border w-full flex items-start justify-center">
              <div className="w-2/3  px-3 py-5 flex flex-col justify-center">
                <div className="w-full border flex flex-col">
                  <h3 className="w-full text-2xl uppercase font-bold text-center tracking-tight my-5">
                    To'lovlar monitoringi
                  </h3>
                  <div className="w-full grid grid-cols-3 gap-4 px-8">
                    {tulovlar
                      ?.slice()
                      .reverse()
                      .map((elem, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-2 p-4 shadow-sm rounded bg-slate-100"
                        >
                          <p className="font-bold text-xl text-[#003459]">
                            <i className="fa-solid fa-hashtag text-xl mr-4 "></i>
                            {elem?.raqam}
                            -To'lov
                          </p>
                          <p className="font-bold text-xl text-[#2aced0]">
                            <i className="fa-solid fa-plus text-xl mr-4 "></i>
                            {formatmoney(elem?.tulov)}
                          </p>
                          <p className="font-bold text-xl text-[#ae2012]">
                            <i className="fa-solid fa-minus text-xl mr-4 "></i>
                            
                            {formatmoney(elem?.qolgan_summa)}
                          </p>
                          <p className="font-bold text-xl text-[#001219]">
                            <i className="fa-solid fa-calendar-days text-xl mr-4 "></i>
                            {formatDate(elem?.sana)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="w-1/3 px-3 py-5 flex items-center justify-center">
                <div className="w-[600px] flex justify-center flex-col rounded-lg py-6 px-12 bg-slate-100">
                  <p className="text-2xl font-bold uppercase tracking-tight w-full text-center my-2 mb-10">
                    To'lov qabul qilish
                  </p>
                  <p className="text-sm opacity-65">
                    Kiritildi: {formatmoney(+tulov)} so'm
                  </p>
                  <input
                    type="number"
                    className="mt-4 h-10 border rounded-lg  px-3 tracking-tight outline-none"
                    placeholder="To'lovni kirting..."
                    value={tulov}
                    onChange={(e) => setTulov(e.target.value)}
                  />
                  <div className="flex items-center space-x-2 my-1">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <p className="text-sm text-gray-700">
                      Tasdiqlayman, ma'lumotlar hammasi to'g'ri!
                    </p>
                  </div>
                  <button
                    disabled={!isButtonEnabled} // Checkbox belgilanmasa yoki summa 0 bo'lsa tugma faol emas
                    className={`border my-4 h-12 rounded-lg font-semibold tracking-tight ${
                      isButtonEnabled
                        ? "bg-indigo-500 text-white hover:opacity-100 ease-in-out cursor-pointer"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    onClick={handleSubmit}
                  >
                    TASDIQLASH
                  </button>
                </div>
                {isLoading && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <img src={loadingGif} className="rounded-lg w-2/6" alt="" />
                  </div>
                )}
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
