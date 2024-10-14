import { createContext, useState } from "react";

const MainContext = createContext(null);

const MainProvider = ({ children }) => {
  const [isSold, setIsSold] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState(null); // New state for apartment number
  const [totalPrice, setTotalPrice] = useState(null);
  const [entrance, setEntrance] = useState(null);
  const [block_number, setBlock_number] = useState(null);
  const [floor, setFloor] = useState(null);
  const [number_of_rooms, setNumber_of_rooms] = useState(null);
  const [rassrochka, setRassrochka] = useState("0&0");
  const [contractData, setContractData] = useState(null);
  const [toSum, setToSum] = useState(false);
  const [boshlangich_tulow, setBoshlangich_tulow] = useState(null);
  const [aksiya_percent, setAksiya_percent] = useState(false);
  const [compareData, setCompareData] = useState([]);
  const [isCompare, setIsCompare] = useState(false);
  const [muddatli_tulovw, setMuddatli_tulovw] = useState(null);
  const [sidebar, setSidebar] = useState("active");
  const [modelData, setModelData] = useState({});
  const [getModel, setGetModel] = useState({});

  const [open_modal, setOpen_modal] = useState(false);
  const [modal_image, setModal_image] = useState(false);

  return (
    <MainContext.Provider
      value={{
        isSold,
        setIsSold,
        apartmentNumber,
        setApartmentNumber,
        totalPrice,
        setTotalPrice,
        entrance,
        setEntrance,
        floor,
        setFloor,
        number_of_rooms,
        setNumber_of_rooms,
        rassrochka,
        setRassrochka,
        contractData,
        setContractData,
        toSum,
        setToSum,
        boshlangich_tulow,
        setBoshlangich_tulow,
        block_number,
        setBlock_number,
        aksiya_percent,
        setAksiya_percent,
        compareData,
        setCompareData,
        isCompare,
        setIsCompare,
        muddatli_tulovw,
        setMuddatli_tulovw,
        sidebar,
        setSidebar,
        modelData,
        setModelData,
        getModel,
        setGetModel,
        open_modal,
        setOpen_modal,
        modal_image,
        setModal_image,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
