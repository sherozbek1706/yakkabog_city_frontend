import React, { Fragment, useContext } from "react";
import "./apartment-filter.css";
import { MainContext } from "../../../utils/context/context";

export const ApartmentFilter = () => {
  const {
    setIsSold,
    setApartmentNumber,
    setTotalPrice,
    setEntrance,
    setFloor,
    setBlock_number,
    block_number,
    setNumber_of_rooms,
    entrance,
    floor,
    number_of_rooms,
    setRassrochka,
    rassrochka,
    setContractData,
    toSum,
    setToSum,
    boshlangich_tulow,
    setBoshlangich_tulow,
    setAksiya_percent,
    aksiya_percent,
    isCompare,
    setIsCompare,
    setMuddatli_tulovw,
    muddatli_tulovw,
  } = useContext(MainContext);

  const handleChange = (e) => {
    const value =
      e.target.value === "true"
        ? "true"
        : e.target.value === "false"
        ? "false"
        : e.target.value === "bron"
        ? "bron"
        : null;
    setIsSold(value);
  };

  const handleSortChange = (e) => {
    setTotalPrice(null);
    setApartmentNumber(e.target.value); // Set the apartment number for sorting
  };
  const handleChangeRassrochka = (e) => {
    setContractData(null);
    setAksiya_percent(false);
    setRassrochka(e.target.value); // Set the apartment number for sorting
  };

  const handleTotalPriceChange = (e) => {
    setApartmentNumber(null);
    setTotalPrice(e.target.value);
  };

  return (
    <Fragment>
      <div className="ApartmentFilter">
        <div className="ApartmentFilter_header">
          <h2>Yakkabog' CITY qidiruv tizimi</h2>
        </div>
        <div className="ApartmentFilter__select">
          <div className="ApartmentFilterSelect__one">
            <p>Xonadonning sotilgani haqida</p>
            <select onChange={handleChange}>
              <option value={null}>Tanlang</option>
              <option value={"true"}>Sotilgan</option>
              <option value={"bron"}>Bron qilingan</option>
              <option value={"false"}>Sotilmagan</option>
            </select>
          </div>
          {/* <div className="ApartmentFilterSelect__one">
            <p>Kvartira raqami bo'yicha sortlash</p>
            <select onChange={handleSortChange}>
              <option value={null}>Tanlang</option>
              <option value="asc">Pastdan tepaga</option>
              <option value="desc">Tepadan pastga</option>
            </select>
          </div> */}
          {/* <div className="ApartmentFilterSelect__one">
            <p>Kvartira narxi bo'yicha sortlash</p>
            <select onChange={handleTotalPriceChange}>
              <option value={null}>Tanlang</option>
              <option value="asc">Pastdan tepaga</option>
              <option value="desc">Tepadan pastga</option>
            </select>
          </div> */}
          <div className="ApartmentFilterSelect__one">
            <p>Rassrochkaga boshlang'ich foiz</p>
            <select
              disabled={toSum}
              onChange={handleChangeRassrochka}
              value={rassrochka ? rassrochka : "0&0"}
            >
              <option value={"0&0"}>Boshlang'ich 0 foiz to'lov</option>
              <option value={"0.2&200000"}>Boshlang'ich 20 foiz to'lov</option>
              <option value={"0.3&400000"}>Boshlang'ich 30 foiz to'lov</option>
              <option value={"0.5&600000"}>Boshlang'ich 50 foiz to'lov</option>
            </select>
          </div>
          {/* <div className="ApartmentFilterSelect__one">
            <p>Pul bilan foiz chiqarish</p>
            <input
              className="checkbox__input"
              checked={toSum}
              type="checkbox"
              onChange={(e) => setToSum(e.target.checked)}
            />
          </div> */}
          {/* <div className="ApartmentFilterSearch__input">
            <p>Boshlangich to'lov miqdori</p>
            <input
              disabled={!toSum}
              type="number"
              placeholder="Boshlang'ich summani kiriting"
              value={boshlangich_tulow}
              onChange={(e) => setBoshlangich_tulow(e.target.value)}
            />
          </div> */}
          <div className="ApartmentFilterSelect__one">
            <p>Aksiyadan Foydalanish</p>
            <input
              className="checkbox__input"
              checked={aksiya_percent}
              type="checkbox"
              onChange={(e) => {
                setContractData(null);
                setAksiya_percent(e.target.checked);
              }}
            />
          </div>
          <div className="ApartmentFilterSelect__one">
            <p>Tanlangan Xonadonlar</p>
            <input
              className="checkbox__input"
              checked={isCompare}
              type="checkbox"
              onChange={(e) => setIsCompare(e.target.checked)}
            />
          </div>
          <div className="ApartmentFilterSearch__input">
            <p>Nechchi oyga bo'lib to'lash</p>
            <input
              type="number"
              placeholder="Nechchi oyga bo'lib to'lash"
              value={muddatli_tulovw}
              onChange={(e) => setMuddatli_tulovw(e.target.value)}
            />
          </div>
        </div>
        <div className="ApartmentFilterSearch">
          <div className="ApartmentFilterSelect__one">
            <p>Blok bo'yicha qidirish</p>
            <select
              onChange={(e) => setBlock_number(e.target.value)}
              value={block_number ? block_number : ""}
            >
              <option value={""}>Tanlang</option>
              <option value={1}>1.1</option>
              <option value={2}>1.2</option>
            </select>
          </div>

          <div className="ApartmentFilterSelect__one">
            <p>Podyezd bo'yicha qidirish</p>
            <select
              onChange={(e) => setEntrance(e.target.value)}
              value={entrance ? entrance : ""}
            >
              <option value={""}>Tanlang</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>

          <div className="ApartmentFilterSelect__one">
            <p>Qavat bo'yicha qidirish</p>
            <select
              onChange={(e) => setFloor(e.target.value)}
              value={floor ? floor : ""}
            >
              <option value={""}>Tanlang</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>MANSARD</option>
            </select>
          </div>

          <div className="ApartmentFilterSelect__one">
            <p>Xonalar soni bo'yicha qidirish</p>
            <select
              onChange={(e) => setNumber_of_rooms(e.target.value)}
              value={number_of_rooms ? number_of_rooms : ""}
            >
              <option value={""}>Tanlang</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
