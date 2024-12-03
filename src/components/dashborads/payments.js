// import React, { useContext, useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   Line,
//   Area,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Brush,
// } from "recharts";

// import { getRequest } from "../../request";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { formatDate, formatmoney } from "../../utils/functions";
// import { MainContext } from "../../utils/context/context";

// // Pul formatlash funksiyasi
// const formatMoney = (value) => {
//   return formatmoney(value);
// };

// // Ma'lumotlarni serverdan olish funksiyasi
// const fetchData = async (id) => {
//   const data = await getRequest("contract/stats-payments/" + id);
//   return data;
// };

// export const DashboardPayments = ({ load }) => {
//   const { id } = useParams();

//   const { setTulovlar } = useContext(MainContext);

//   const [filteredData, setFilteredData] = useState([]); // Zoom uchun filtrlangan data

//   const { data, error, isLoading, refetch } = useQuery(
//     ["stats-payments", id],
//     () => fetchData(id),
//     { enabled: !!id }
//   );

//   // Ma'lumotlarni qayta olish
//   useEffect(() => {
//     refetch();
//   }, [load]);

//   // Diagrammaga barcha ma'lumotlarni yuklash
//   useEffect(() => {
//     if (data?.data?.data) {
//       setFilteredData(data.data.data);
//     }
//   }, [data]);

//   // Foydalanuvchi uchun moslashtirilgan tooltip
//   const customTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div
//           className="custom-tooltip"
//           style={{
//             backgroundColor: "#fff",
//             padding: "10px",
//             border: "1px solid #ccc",
//             fontSize: "12px",
//           }}
//         >
//           <p>{`To'lov Raqami: ${payload[0].payload.raqam}`}</p>
//           <p>{`To'langan Summa: ${formatMoney(payload[0].payload.tulov)}`}</p>
//           <p>{`Standart Summa: ${formatMoney(
//             payload[0]?.payload?.standart || 0
//           )}`}</p>
//           <p>{`Sana: ${
//             formatDate(payload[0]?.payload?.sana, true) || "Mavjud emas"
//           }`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div style={{ width: "100%", height: 400 }}>
//       <ResponsiveContainer>
//         <ComposedChart data={filteredData}>
//           <CartesianGrid stroke="#f5f5f5" />
//           <XAxis dataKey="raqam" scale="band" tick={{ fontSize: 16 }} />
//           <YAxis tick={{ fontSize: 12 }} />
//           <Tooltip content={customTooltip} />
//           <Legend wrapperStyle={{ fontSize: "12px" }} />
//           <Line
//             type="monotone"
//             dataKey="standart"
//             fill="#fca311"
//             stroke="#ff7300"
//             strokeWidth={3} // Qalin chiziq
//           />
//           <Area
//             type="monotone"
//             dataKey="tulov"
//             fill="#8884d8"
//             stroke="#8884d8"
//             strokeWidth={3} // Qalin chiziq
//           />
//           <Bar dataKey="standart" barSize={10} fill="#e5e5e5" />
//           {/* Zoom uchun Brush qo'shildi */}
//           <Brush
//             dataKey="raqam"
//             height={30}
//             stroke="#8884d8"
//             onChange={(range) => {
//               const startIndex = range.startIndex;
//               const endIndex = range.endIndex;
//               setFilteredData(data?.data?.data.slice(startIndex, endIndex + 1));
//             }}
//           />
//         </ComposedChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

/************************************** */

import React, { useContext, useEffect } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { getRequest } from "../../request";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { formatDate, formatmoney } from "../../utils/functions";
import { MainContext } from "../../utils/context/context";

// Format money function to display as currency
const formatMoney = (value) => {
  return formatmoney(value);
};

const fetchData = async (id) => {
  const data = await getRequest("contract/stats-payments/" + id);
  return data;
};

export const DashboardPayments = ({ load }) => {
  const { id } = useParams();

  const { setTulovlar } = useContext(MainContext);

  const { data, error, isLoading, refetch, isSuccess } = useQuery(
    ["stats-payments", id],
    () => fetchData(id),
    { enabled: !!id }
  );

  useEffect(() => {
    refetch();
  }, [load]);
  setTulovlar(data?.data?.data);

  const customTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            padding: "10px",
            border: "1px solid #ccc",
            fontSize: "12px", // Adjust tooltip font size
          }}
        >
          <p className="label" style={{ fontSize: "12px" }}>
            {`To'lov Raqami: ${payload[0].payload.raqam}`}
          </p>
          <p className="intro" style={{ fontSize: "12px" }}>
            {`To'langan Summa: ${formatMoney(payload[0].payload.tulov)}`}
          </p>
          <p className="intro">{`Standart Summa: ${formatMoney(
            payload[0]?.payload?.standart || 0
          )}`}</p>
          <p className="intro">{`Sana: ${
            formatDate(payload[0]?.payload?.sana, true) || 0
          }`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ width: "100%", height: 300 }}>
      {/* <ResponsiveContainer>
        <ComposedChart width={500} height={400} data={data?.data?.data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="sana"
            scale="band"
            tick={{ fontSize: 12 }} // Adjust XAxis tick font size
          />
          <YAxis
            tick={{ fontSize: 12 }} // Adjust YAxis tick font size
          />
          <Tooltip content={customTooltip} />
          <Legend
            wrapperStyle={{ fontSize: "12px" }} // Adjust legend font size
          />
          <Area
            type="monotone"
            dataKey="tulov"
            fill="#8884d8"
            stroke="#8884d8"
          />
          <Bar dataKey="belgilangans" barSize={10} fill="#413ea0" />
          <Line type="monotone" dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer> */}
      <ResponsiveContainer>
        <ComposedChart width={500} height={400} data={data?.data?.data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            dataKey="raqam"
            scale="band"
            tick={{ fontSize: 16 }} // Vertikal qilish
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={customTooltip} />
          <Legend wrapperStyle={{ fontSize: "12px" }} />
          <Line
            type="monotone"
            dataKey="standart"
            fill="#fca311"
            stroke="#ff7300"
            strokeWidth={3}
          />
          <Area
            type="monotone"
            dataKey="tulov"
            fill="#8884d8"
            stroke="#8884d8"
            strokeWidth={3}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

// ***************************

// import React, { useContext, useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   Line,
//   Area,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Brush,
// } from "recharts";

// import { getRequest } from "../../request";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { formatDate, formatmoney } from "../../utils/functions";
// import { MainContext } from "../../utils/context/context";

// // Pul formatlash funksiyasi
// const formatMoney = (value) => {
//   return formatmoney(value);
// };

// // Ma'lumotlarni serverdan olish funksiyasi
// const fetchData = async (id) => {
//   const data = await getRequest("contract/stats-payments/" + id);
//   return data;
// };

// export const DashboardPayments = ({ load }) => {
//   const { id } = useParams();
//   const { setTulovlar } = useContext(MainContext);

//   const [filteredData, setFilteredData] = useState([]); // Zoom uchun filtrlangan data
//   const [originalData, setOriginalData] = useState([]); // Original ma'lumotlar

//   const { data, error, isLoading, refetch } = useQuery(
//     ["stats-payments", id],
//     () => fetchData(id),
//     { enabled: !!id }
//   );

//   // Ma'lumotlarni qayta olish
//   useEffect(() => {
//     refetch();
//   }, [load]);

//   // Diagrammaga barcha ma'lumotlarni yuklash
//   useEffect(() => {
//     if (data?.data?.data) {
//       setOriginalData(data.data.data); // Asl ma'lumotlarni saqlash
//       setFilteredData(data.data.data); // Filtrlangan ma'lumotlarni boshlash
//     }
//   }, [data]);

//   // Foydalanuvchi uchun moslashtirilgan tooltip
//   const customTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div
//           className="custom-tooltip"
//           style={{
//             backgroundColor: "#fff",
//             padding: "10px",
//             border: "1px solid #ccc",
//             fontSize: "12px",
//           }}
//         >
//           <p>{`To'lov Raqami: ${payload[0].payload.raqam}`}</p>
//           <p>{`To'langan Summa: ${formatMoney(payload[0].payload.tulov)}`}</p>
//           <p>{`Standart Summa: ${formatMoney(
//             payload[0]?.payload?.standart || 0
//           )}`}</p>
//           <p>{`Sana: ${
//             formatDate(payload[0]?.payload?.sana, true) || "Mavjud emas"
//           }`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Reset Function
//   const resetChart = () => {
//     setFilteredData(originalData); // Ma'lumotlarni asl holatga qaytarish
//   };

//   // Zoom Handling
//   const handleZoom = (zoomFactor) => {
//     const length = originalData.length;
//     const zoomedLength = Math.max(5, Math.floor(length / zoomFactor)); // Zoom factor: 2x, 3x, etc.
//     const startIndex = Math.max(0, Math.floor((length - zoomedLength) / 2));
//     const endIndex = Math.min(length, startIndex + zoomedLength);
//     setFilteredData(originalData.slice(startIndex, endIndex));
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
//         <button onClick={resetChart} style={buttonStyle}>
//           Diagrammani qayta yuklash
//         </button>
//         <button onClick={() => handleZoom(2)} style={buttonStyle}>
//           Zoom In
//         </button>
//         <button onClick={() => handleZoom(0.5)} style={buttonStyle}>
//           Zoom Out
//         </button>
//       </div>
//       <div style={{ width: "100%", height: 400 }}>
//         <ResponsiveContainer>
//           <ComposedChart data={filteredData}>
//             <CartesianGrid stroke="#f5f5f5" />
//             <XAxis dataKey="raqam" scale="band" tick={{ fontSize: 16 }} />
//             <YAxis tick={{ fontSize: 12 }} />
//             <Tooltip content={customTooltip} />
//             <Legend wrapperStyle={{ fontSize: "12px" }} />
//             <Line
//               type="monotone"
//               dataKey="standart"
//               fill="#fca311"
//               stroke="#ff7300"
//               strokeWidth={3} // Qalin chiziq
//             />
//             <Area
//               type="monotone"
//               dataKey="tulov"
//               fill="#8884d8"
//               stroke="#8884d8"
//               strokeWidth={3} // Qalin chiziq
//             />
//             <Bar dataKey="standart" barSize={10} fill="#e5e5e5" />
//             <Brush
//               dataKey="raqam"
//               height={30}
//               stroke="#8884d8"
//               onChange={(range) => {
//                 const startIndex = range.startIndex;
//                 const endIndex = range.endIndex;
//                 setFilteredData(originalData.slice(startIndex, endIndex + 1));
//               }}
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// const buttonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#8884d8",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

/********************************* */

// import React, { useContext, useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   Line,
//   Area,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Brush,
// } from "recharts";

// import { getRequest } from "../../request";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { formatDate, formatmoney } from "../../utils/functions";
// import { MainContext } from "../../utils/context/context";

// // Pul formatlash funksiyasi
// const formatMoney = (value) => {
//   return formatmoney(value);
// };

// // Ma'lumotlarni serverdan olish funksiyasi
// const fetchData = async (id) => {
//   const data = await getRequest("contract/stats-payments/" + id);
//   return data;
// };

// export const DashboardPayments = ({ load }) => {
//   const { id } = useParams();
//   const { setTulovlar } = useContext(MainContext);

//   const [filteredData, setFilteredData] = useState([]); // Zoom uchun filtrlangan data
//   const [originalData, setOriginalData] = useState([]); // Original ma'lumotlar
//   const [range, setRange] = useState([0, 10]); // Initial range for selection

//   const { data, error, isLoading, refetch } = useQuery(
//     ["stats-payments", id],
//     () => fetchData(id),
//     { enabled: !!id }
//   );

//   // Ma'lumotlarni qayta olish
//   useEffect(() => {
//     refetch();
//   }, [load]);

//   // Diagrammaga barcha ma'lumotlarni yuklash
//   useEffect(() => {
//     if (data?.data?.data) {
//       setOriginalData(data.data.data); // Asl ma'lumotlarni saqlash
//       setFilteredData(data.data.data); // Filtrlangan ma'lumotlarni boshlash
//     }
//   }, [data]);

//   // Foydalanuvchi uchun moslashtirilgan tooltip
//   const customTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div
//           className="custom-tooltip"
//           style={{
//             backgroundColor: "#fff",
//             padding: "10px",
//             border: "1px solid #ccc",
//             fontSize: "12px",
//           }}
//         >
//           <p>{`To'lov Raqami: ${payload[0].payload.raqam}`}</p>
//           <p>{`To'langan Summa: ${formatMoney(payload[0].payload.tulov)}`}</p>
//           <p>{`Standart Summa: ${formatMoney(
//             payload[0]?.payload?.standart || 0
//           )}`}</p>
//           <p>{`Sana: ${
//             formatDate(payload[0]?.payload?.sana, true) || "Mavjud emas"
//           }`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Reset Function
//   const resetChart = () => {
//     setFilteredData(originalData); // Ma'lumotlarni asl holatga qaytarish
//   };

//   // Zoom Handling
//   const handleZoom = (zoomFactor) => {
//     const length = originalData.length;
//     const zoomedLength = Math.max(5, Math.floor(length / zoomFactor)); // Zoom factor: 2x, 3x, etc.
//     const startIndex = Math.max(0, Math.floor((length - zoomedLength) / 2));
//     const endIndex = Math.min(length, startIndex + zoomedLength);
//     setFilteredData(originalData.slice(startIndex, endIndex));
//   };

//   // Range Selection Handler
//   const handleRangeChange = (event) => {
//     const selectedRange = event.target.value.split("-").map(Number);
//     setRange(selectedRange); // Set the selected range
//     // Filter the data based on the selected range (start and end)
//     const filtered = originalData.filter((item) => {
//       const value = item.raqam; // Assuming 'raqam' is the value you're using for filtering
//       return value >= selectedRange[0] && value <= selectedRange[1];
//     });
//     setFilteredData(filtered); // Update the chart data based on the selected range
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       {/* Range selection dropdown */}
//       <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
//         <select onChange={handleRangeChange} style={selectStyle}>
//           <option value="0-10">0 - 10</option>
//           <option value="11-20">11 - 20</option>
//           <option value="21-30">21 - 30</option>
//           <option value="31-40">31 - 40</option>
//           {/* You can add more ranges based on your data */}
//         </select>

//         {/* Buttons for zooming and resetting */}
//         <button onClick={resetChart} style={buttonStyle}>
//           Diagrammani qayta yuklash
//         </button>
//         <button onClick={() => handleZoom(2)} style={buttonStyle}>
//           Zoom In
//         </button>
//         <button onClick={() => handleZoom(0.5)} style={buttonStyle}>
//           Zoom Out
//         </button>
//       </div>

//       {/* Chart container */}
//       <div style={{ width: "100%", height: 400 }}>
//         <ResponsiveContainer>
//           <ComposedChart data={filteredData}>
//             <CartesianGrid stroke="#f5f5f5" />
//             <XAxis dataKey="raqam" scale="band" tick={{ fontSize: 16 }} />
//             <YAxis tick={{ fontSize: 12 }} />
//             <Tooltip content={customTooltip} />
//             <Legend wrapperStyle={{ fontSize: "12px" }} />
//             <Line
//               type="monotone"
//               dataKey="standart"
//               fill="#fca311"
//               stroke="#ff7300"
//               strokeWidth={3} // Qalin chiziq
//             />
//             <Area
//               type="monotone"
//               dataKey="tulov"
//               fill="#8884d8"
//               stroke="#8884d8"
//               strokeWidth={3} // Qalin chiziq
//             />
//             <Bar dataKey="standart" barSize={10} fill="#e5e5e5" />
//             <Brush
//               dataKey="raqam"
//               height={30}
//               stroke="#8884d8"
//               onChange={(range) => {
//                 const startIndex = range.startIndex;
//                 const endIndex = range.endIndex;
//                 setFilteredData(originalData.slice(startIndex, endIndex + 1));
//               }}
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// // Styling for buttons and select
// const buttonStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#8884d8",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// const selectStyle = {
//   padding: "10px 20px",
//   fontSize: "16px",
//   borderRadius: "4px",
//   border: "1px solid #ccc",
// };

/************************* */

// import React, { useContext, useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   Line,
//   Area,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Brush,
// } from "recharts";

// import { getRequest } from "../../request";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { formatDate, formatmoney } from "../../utils/functions";
// import { MainContext } from "../../utils/context/context";

// // Pul formatlash funksiyasi
// const formatMoney = (value) => {
//   return formatmoney(value);
// };

// // Ma'lumotlarni serverdan olish funksiyasi
// const fetchData = async (id) => {
//   const data = await getRequest("contract/stats-payments/" + id);
//   return data;
// };

// export const DashboardPayments = ({ load }) => {
//   const { id } = useParams();
//   const { setTulovlar } = useContext(MainContext);

//   const [filteredData, setFilteredData] = useState([]); // Zoom uchun filtrlangan data
//   const [originalData, setOriginalData] = useState([]); // Original ma'lumotlar
//   const [startIndex, setStartIndex] = useState(0); // Boshlanish nuqtasi
//   const [endIndex, setEndIndex] = useState(0); // Tugash nuqtasi

//   const { data, error, isLoading, refetch } = useQuery(
//     ["stats-payments", id],
//     () => fetchData(id),
//     { enabled: !!id }
//   );

//   // Ma'lumotlarni qayta olish
//   useEffect(() => {
//     refetch();
//   }, [load]);

//   // Diagrammaga barcha ma'lumotlarni yuklash
//   useEffect(() => {
//     if (data?.data?.data) {
//       setOriginalData(data.data.data); // Asl ma'lumotlarni saqlash
//       setFilteredData(data.data.data); // Filtrlangan ma'lumotlarni boshlash

//       // Initially, set the endIndex as the length of the data
//       setEndIndex(data.data.data.length - 1);
//     }
//   }, [data]);

//   // Foydalanuvchi uchun moslashtirilgan tooltip
//   const customTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div
//           className="custom-tooltip"
//           style={{
//             backgroundColor: "#fff",
//             padding: "10px",
//             border: "1px solid #ccc",
//             fontSize: "12px",
//           }}
//         >
//           <p>{`To'lov Raqami: ${payload[0].payload.raqam}`}</p>
//           <p>{`To'langan Summa: ${formatMoney(payload[0].payload.tulov)}`}</p>
//           <p>{`Standart Summa: ${formatMoney(
//             payload[0]?.payload?.standart || 0
//           )}`}</p>
//           <p>{`Sana: ${
//             formatDate(payload[0]?.payload?.sana, true) || "Mavjud emas"
//           }`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Update filtered data when a new range is selected
//   useEffect(() => {
//     if (originalData.length > 0) {
//       const newFilteredData = originalData.slice(startIndex, endIndex + 1);
//       setFilteredData(newFilteredData);
//     }
//   }, [startIndex, endIndex, originalData]);

//   // Handle change in start and end range selection
//   const handleRangeChange = (e) => {
//     const { name, value } = e.target;

//     // Update the selected start or end index
//     if (name === "start") {
//       setStartIndex(Number(value));
//     } else if (name === "end") {
//       setEndIndex(Number(value));
//     }
//   };

//   return (
//     <div style={{ width: "100%" }}>
//       {/* Select dropdowns for range selection */}
//       <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
//         {/* Start Range Select */}
//         <select
//           name="start"
//           value={startIndex}
//           onChange={handleRangeChange}
//           style={selectStyle}
//         >
//           {originalData.map((item, index) => (
//             <option key={index} value={index}>
//               {item.raqam} - to'lovdan
//             </option>
//           ))}
//         </select>

//         {/* End Range Select */}
//         <select
//           name="end"
//           value={endIndex}
//           onChange={handleRangeChange}
//           style={selectStyle}
//         >
//           {originalData.map((item, index) => (
//             <option key={index} value={index}>
//               {item.raqam} - to'lovgacha
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Chart Display */}
//       <div style={{ width: "100%", height: 400 }}>
//         <ResponsiveContainer>
//           <ComposedChart data={filteredData}>
//             <CartesianGrid stroke="#f5f5f5" />
//             <XAxis dataKey="raqam" scale="band"  tick={{ fontSize: 16 }} />
//             <YAxis tick={{ fontSize: 12 }} />
//             <Tooltip content={customTooltip} />
//             <Legend wrapperStyle={{ fontSize: "12px" }} />
//             <Line
//               type="monotone"
//               dataKey="standart"
//               fill="#fca311"
//               stroke="#ff7300"
//               strokeWidth={3} // Qalin chiziq
//             />
//             <Area
//               type="monotone"
//               dataKey="tulov"
//               fill="#8884d8"
//               stroke="#8884d8"
//               strokeWidth={3} // Qalin chiziq
//             />
//             {/* <Bar dataKey="standart" barSize={10} fill="#e5e5e5" /> */}
//             <Brush
//               dataKey="raqam"
//               height={30}
//               stroke="#8884d8"
//               onChange={(range) => {
//                 const startIndex = range.startIndex;
//                 const endIndex = range.endIndex;
//                 setFilteredData(originalData.slice(startIndex, endIndex + 1));
//               }}
//             />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// const selectStyle = {
//   padding: "10px 20px",
//   backgroundColor: "#8884d8",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };
