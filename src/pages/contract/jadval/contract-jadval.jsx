// import React, { Fragment, useContext } from "react";
// import "./contract-jadval.css";
// import { MainContext } from "../../../utils/context/context";
// import {
//   formatDate,
//   formatmoney,
//   getDayFromDate,
//   getMonthlyDatesWithAmounts,
//   getMonthName,
//   getYearFromDate,
//   numberToUzbekWords,
// } from "../../../utils/functions";

// const ContractJadval = () => {
//   const { shartnoma } = useContext(MainContext);

//   if (!shartnoma) {
//     window.location.assign("/contract-list");
//   }

//   return (
//     <div className="ContractPDF">
//       <div className="ContractPDF__list">
//         <div className="ContractPDF__page">
//           <div>
//             <p className="ContractPDF__desc right">
//               <b>{getDayFromDate(shartnoma?.created_at)}</b>{" "}
//               <b>{getMonthName(shartnoma?.created_at)} </b>
//               <b>{getYearFromDate(shartnoma?.created_at)}</b> йилдаги{" "}
//             </p>
//             <p className="ContractPDF__desc right">
//               <b>{shartnoma?.block_number}</b> сонли турар-жой биноси
//             </p>
//             <p className="ContractPDF__desc right">
//               қурилишида инвестиция ҳиссаси шартномасига 2 - илова
//               <br />
//               <br />
//             </p>
//             <p className="ContractPDF__desc center">
//               Инвестиция ҳиссасини киритиш <br /> <b>ЖАДВАЛИ</b>
//             </p>
//             <table className="Contract__table">
//               <thead>
//                 <tr>
//                   <th>№</th>
//                   <th>Тўлов муддати</th>
//                   <th>Тўлов суммаси</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {getMonthlyDatesWithAmounts(
//                   shartnoma?.created_at,
//                   shartnoma?.muddatli_tulov_oyi,
//                   shartnoma?.oyiga_qanchadan_tushadi
//                 ).map((elem, idx) => (
//                   <Fragment key={idx}>
//                     <tr>
//                       <td>{elem?.monthNumber}</td>
//                       <td>{formatDate(elem?.date, true)}</td>
//                       <td>{formatmoney(elem?.amount)} so'm</td>
//                     </tr>
//                   </Fragment>
//                 ))}
//                 <tr>
//                   <td colSpan={10}>
//                     ЖАМИ: <b>{formatmoney(shartnoma?.umumiy_summa)} so'm</b> ,
//                     12% ҚҚС билан ҳисоблаганда
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContractJadval;

// import React, { Fragment, useContext } from "react";
// import "./contract-jadval.css";
// import { MainContext } from "../../../utils/context/context";
// import {
//   formatDate,
//   formatmoney,
//   getDayFromDate,
//   getMonthlyDatesWithAmounts,
//   getMonthName,
//   getYearFromDate,
// } from "../../../utils/functions";

// const ContractJadval = () => {
//   const { shartnoma } = useContext(MainContext);

//   if (!shartnoma) {
//     window.location.assign("/contract-list");
//   }

//   // Har qatorga nechta ustun qo'shishni tanlash
//   const columnsPerRow = 2; // Masalan, har bir qatorga 4 oy ma'lumotlarini qo'shish

//   // Oylik ma'lumotlarni qatorlarga bo'lib chiqish
//   const groupedMonthlyData = () => {
//     const allMonthsData = getMonthlyDatesWithAmounts(
//       shartnoma?.created_at,
//       shartnoma?.muddatli_tulov_oyi,
//       shartnoma?.oyiga_qanchadan_tushadi
//     );

//     const rows = [];
//     for (let i = 0; i < allMonthsData.length; i += columnsPerRow) {
//       rows.push(allMonthsData.slice(i, i + columnsPerRow));
//     }
//     return rows;
//   };

//   return (
//     <div className="ContractPDF">
//       <div className="ContractPDF__list">
//         <div className="ContractPDF__page">
//           <div>
//             <p className="ContractPDF__desc right">
//               <b>{getDayFromDate(shartnoma?.created_at)}</b>{" "}
//               <b>{getMonthName(shartnoma?.created_at)} </b>
//               <b>{getYearFromDate(shartnoma?.created_at)}</b> йилдаги{" "}
//             </p>
//             <p className="ContractPDF__desc right">
//               <b>{shartnoma?.block_number}</b> сонли турар-жой биноси
//             </p>
//             <p className="ContractPDF__desc right">
//               қурилишида инвестиция ҳиссаси шартномасига 2 - илова
//               <br />
//               <br />
//             </p>
//             <p className="ContractPDF__desc center">
//               Инвестиция ҳиссасини киритиш <br /> <b>ЖАДВАЛИ</b>
//             </p>
//             <table className="Contract__table">
//               <thead>
//                 <tr>
//                   <th>№</th>
//                   {Array(columnsPerRow)
//                     .fill()
//                     .map((_, i) => (
//                       <>
//                         <th>Тўлов муддати {i + 1}</th>
//                         <th>Тўлов суммаси {i + 1}</th>
//                       </>
//                     ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {groupedMonthlyData().map((row, rowIndex) => (
//                   <tr key={rowIndex}>
//                     <td>{rowIndex * columnsPerRow + 1}</td>
//                     {row.map((elem, colIndex) => (
//                       <Fragment key={colIndex}>
//                         <td>{formatDate(elem?.date, true)}</td>
//                         <td>{formatmoney(elem?.amount)} so'm</td>
//                       </Fragment>
//                     ))}
//                   </tr>
//                 ))}
//                 <tr>
//                   <td colSpan={10}>
//                     ЖАМИ: <b>{formatmoney(shartnoma?.umumiy_summa)} so'm</b> ,
//                     12% ҚҚС билан ҳисоблаганда
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContractJadval;

import React, { Fragment, useContext } from "react";
import "./contract-jadval.css";
import { MainContext } from "../../../utils/context/context";
import {
  formatDate,
  formatmoney,
  getDayFromDate,
  getMonthlyDatesWithAmounts,
  getMonthName,
  getYearFromDate,
} from "../../../utils/functions";

const ContractJadval = () => {
  const { shartnoma } = useContext(MainContext);

  if (!shartnoma) {
    window.location.assign("/contract-list");
  }

  // Number of columns per row
  const columnsPerRow = 2;

  // Group monthly data by rows
  const groupedMonthlyData = () => {
    const allMonthsData = getMonthlyDatesWithAmounts(
      shartnoma?.created_at,
      shartnoma?.muddatli_tulov_oyi,
      shartnoma?.oyiga_qanchadan_tushadi
    );

    const rows = [];
    for (let i = 0; i < allMonthsData.length; i += columnsPerRow) {
      rows.push(allMonthsData.slice(i, i + columnsPerRow));
    }
    return rows;
  };

  let serialNumber = 1; // Initialize a serial counter for each payment date

  return (
    <div className="ContractPDF">
      <div className="ContractPDF__list">
        <div className="ContractPDF__page">
          <div>
            <p className="ContractPDF__desc right">
              <b>{getDayFromDate(shartnoma?.created_at)}</b>{" "}
              <b>{getMonthName(shartnoma?.created_at)} </b>
              <b>{getYearFromDate(shartnoma?.created_at)}</b> йилдаги{" "}
            </p>
            <p className="ContractPDF__desc right">
              <b>{shartnoma?.block_number}</b> сонли турар-жой биноси
            </p>
            <p className="ContractPDF__desc right">
              қурилишида инвестиция ҳиссаси шартномасига 2 - илова
              <br />
              <br />
            </p>
            <p className="ContractPDF__desc center">
              Инвестиция ҳиссасини киритиш <br /> <b>ЖАДВАЛИ</b>
            </p>
            <table className="Contract__table">
              <thead>
                <tr>
                  {Array(columnsPerRow)
                    .fill()
                    .map((_, i) => (
                      <Fragment key={i}>
                        <th>№</th>
                        <th>Тўлов муддати {i + 1}</th>
                        <th>Тўлов суммаси {i + 1}</th>
                      </Fragment>
                    ))}
                </tr>
              </thead>
              <tbody>
                {groupedMonthlyData().map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((elem, colIndex) => (
                      <Fragment key={colIndex}>
                        <td>
                          <b>{serialNumber++} </b>
                        </td>
                        <td>
                          {getDayFromDate(shartnoma?.created_at)}-
                          {getMonthName(shartnoma?.created_at)}{" "}
                          {getYearFromDate(shartnoma?.created_at)}-yil
                        </td>
                        <td>{formatmoney(elem?.amount)} so'm</td>
                      </Fragment>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td colSpan={10}>
                    ЖАМИ: <b>{formatmoney(shartnoma?.umumiy_summa)} so'm</b>,
                    12% ҚҚС билан ҳисоблаганда
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="checking">
              <div className="checking__left">
                <h4 className="checking__title">ҚУРУВЧИ</h4>
                <h3 className="checking__headname">
                  “ISHBEKOV STROI SERVICE” МЧЖ{" "}
                </h3>
                <p className="checking__address">
                  Манзил:{" "}
                  <b>
                    Самарканд вилояти, Каттакургон тумани, Яккабог МФЙ, Иска
                    қишлоғи, 1-уй.
                  </b>
                  <br />
                  <br />
                  <b>Ўз.Р. ТИФ Миллий Банкдаги</b>
                  <br />
                  ҳ/р: <b>20208000305559306001</b>
                  <br />
                  <br />
                  МФО: <b>00450</b> <br /> СТИР: <b>309793993</b> <br /> ОКЭД:{" "}
                  <b>41201</b> <br /> Тел: <b>+998770050038</b>
                  <br />
                  <br />
                  <br />
                  <br />
                  <b>Директор:_____________Т.И. Ишбеков </b>
                </p>
              </div>
              <div className="checking__right">
                <h4 className="checking__title">ИНВЕСТОР</h4>
                <h3 className="checking__headname">
                  <i>{shartnoma?.fullName}</i>
                </h3>
                <p className="checking__address">
                  Манзил: <b>{shartnoma?.address}</b>
                  <br />
                  <br />
                  <br /> Паспорт: № <b>{shartnoma?.seria}</b> берилган{" "}
                  <b>{shartnoma?.pass_ber_joy}</b> ТИИБ ,
                  <br />
                  <br />
                  PINFL: <b>{shartnoma?.pinfl}</b>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  ______________________
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractJadval;
