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

/************************************* */

// import React, { useContext, useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   Line,
//   Area,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";

// import { getRequest } from "../../request";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { formatDate, formatmoney } from "../../utils/functions";
// import { MainContext } from "../../utils/context/context";

// // Format money function to display as currency
// const formatMoney = (value) => {
//   return formatmoney(value);
// };

// const fetchData = async (id) => {
//   const data = await getRequest("contract/stats-payments/" + id);
//   return data;
// };

// export const DashboardPayments = ({ load }) => {
//   const { id } = useParams();
//   const { setTulovlar } = useContext(MainContext);
//   const [chartData, setChartData] = useState([]); // Yangi array
//   const [currentIndex, setCurrentIndex] = useState(0); // Indexni kuzatish uchun

//   const { data, error, isLoading, refetch } = useQuery(
//     ["stats-payments", id],
//     () => fetchData(id),
//     { enabled: !!id }
//   );

//   useEffect(() => {
//     refetch();
//   }, [load]);

//   useEffect(() => {
//     if (data?.data?.data?.length) {
//       setTulovlar(data.data.data);

//       const interval = setInterval(() => {
//         setChartData((prev) => [...prev, data.data.data[currentIndex]]); // Yangi ma'lumot qo'shish
//         setCurrentIndex((prev) => {
//           if (prev + 1 < data.data.data.length) {
//             return prev + 1; // Keyingi indexga o'tish
//           } else {
//             clearInterval(interval); // Barcha ma'lumotlar qo'shilgandan keyin to'xtatish
//             return prev;
//           }
//         });
//       }, 1000);

//       return () => clearInterval(interval); // Cleanup
//     }
//   }, [data]);

//   console.log(chartData);

//   const customTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div
//           className="custom-tooltip"
//           style={{
//             backgroundColor: "#fff",
//             padding: "10px",
//             border: "1px solid #ccc",
//             fontSize: "12px", // Adjust tooltip font size
//           }}
//         >
//           <p className="label" style={{ fontSize: "12px" }}>
//             {`To'lov Raqami: ${payload[0].payload.raqam}`}
//           </p>
//           <p className="intro" style={{ fontSize: "12px" }}>
//             {`To'langan Summa: ${formatMoney(payload[0].payload.tulov)}`}
//           </p>
//           <p className="intro">{`Standart Summa: ${formatMoney(
//             payload[0]?.payload?.standart || 0
//           )}`}</p>
//           <p className="intro">{`Sana: ${
//             formatDate(payload[0]?.payload?.sana, true) || 0
//           }`}</p>
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <div style={{ width: "100%", height: 300 }}>
//       <ResponsiveContainer>
//         <ComposedChart width={500} height={400} data={chartData}>
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
//             strokeWidth={3}
//           />
//           <Area
//             type="monotone"
//             dataKey="tulov"
//             fill="#8884d8"
//             stroke="#8884d8"
//             strokeWidth={3}
//           />
//         </ComposedChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

/*********************************** */

// import React, { useContext, useEffect, useState } from "react";
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   Line,
//   Area,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
// } from "recharts";

// import { getRequest } from "../../request";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import { formatDate, formatmoney } from "../../utils/functions";
// import { MainContext } from "../../utils/context/context";

// // Format money function to display as currency
// const formatMoney = (value) => {
//   return formatmoney(value);
// };

// const fetchData = async (id) => {
//   const data = await getRequest("contract/stats-payments/" + id);
//   return data;
// };

// export const DashboardPayments = ({ load }) => {
//   const { id } = useParams();
//   const { setTulovlar } = useContext(MainContext);
//   const [chartData, setChartData] = useState([]); // Yangi array
//   const [currentIndex, setCurrentIndex] = useState(0); // Indexni kuzatish uchun

//   const { data, error, isLoading, refetch } = useQuery(
//     ["stats-payments", id],
//     () => fetchData(id),
//     { enabled: !!id }
//   );

//   useEffect(() => {
//     refetch();
//   }, [load]);

//   useEffect(() => {
//     if (data?.data?.data?.length) {
//       // Faqat birinchi marta setTulovlar ni chaqirish
//       if (chartData.length === 0) {
//         setTulovlar(data.data.data);
//       }

//       const interval = setInterval(() => {
//         setChartData((prev) => {
//           if (prev.length < data.data.data.length) {
//             const newData = [...prev, data.data.data[currentIndex]]; // Yangi ma'lumotni qo'shish
//             return newData;
//           }
//           return prev; // Agar barcha ma'lumotlar qo'shilgan bo'lsa, hech narsa o'zgarmaydi
//         });

//         setCurrentIndex((prev) => {
//           if (prev + 1 < data.data.data.length) {
//             return prev + 1;
//           } else {
//             clearInterval(interval); // Barcha ma'lumotlar qo'shilgandan keyin to'xtatish
//             return prev;
//           }
//         });
//       }, 2000);

//       return () => clearInterval(interval); // Cleanup interval
//     }
//   }, [data, currentIndex, chartData]); // Dependency arrayga `chartData`ni qo'shish

//   const customTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div
//           className="custom-tooltip"
//           style={{
//             backgroundColor: "#fff",
//             padding: "10px",
//             border: "1px solid #ccc",
//             fontSize: "12px", // Adjust tooltip font size
//           }}
//         >
//           <p className="label" style={{ fontSize: "12px" }}>
//             {`To'lov Raqami: ${payload[0].payload.raqam}`}
//           </p>
//           <p className="intro" style={{ fontSize: "12px" }}>
//             {`To'langan Summa: ${formatMoney(payload[0].payload.tulov)}`}
//           </p>
//           <p className="intro">{`Standart Summa: ${formatMoney(
//             payload[0]?.payload?.standart || 0
//           )}`}</p>
//           <p className="intro">{`Sana: ${
//             formatDate(payload[0]?.payload?.sana, true) || 0
//           }`}</p>
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <div style={{ width: "100%", height: 300 }}>
//       <ResponsiveContainer>
//         <ComposedChart width={500} height={400} data={chartData}>
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
//             strokeWidth={3}
//           />
//           <Area
//             type="monotone"
//             dataKey="tulov"
//             fill="#8884d8"
//             stroke="#8884d8"
//             strokeWidth={3}
//           />
//         </ComposedChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };
