import React, { useContext } from "react";
import "../pdf/contract-pdf.css";
import { MainContext } from "../../../utils/context/context";
import {
  formatDate,
  formatmoney,
  getDayFromDate,
  getMonthName,
  getYearFromDate,
  numberToUzbekWords,
} from "../../../utils/functions";

export const Bayonnoma = () => {
  const { shartnoma } = useContext(MainContext);

  if (!shartnoma) {
    window.location.assign("/contract-list");
  }

  console.log(shartnoma);

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
              қурилишида инвестиция ҳиссаси шартномасига 1 - илова
              <br />
              <br />
            </p>
            <p className="ContractPDF__desc center">
              Турар-жой биносини қуришда иштирок этиш учун инвестиция
              <br />
              ҳиссасининг шартнома нархини келишиш
              <br />
              <b>БАЁННОМАСИ</b>
              <br />
              <br />
            </p>
            <div className="ContractPDF_head">
              <p>Каттакурғон тумани. </p>
              <p>{formatDate(shartnoma?.created_at, true)}</p>
            </div>
            <p className="ContractPDF__desc md">
              ЎзР фуқароси <b>{shartnoma?.fullName}</b> , паспорт рақами{" "}
              <b>{shartnoma?.seria}</b>, <b>{shartnoma?.pass_ber_joy}</b> ТИИБ
              томонидан берилган, бундан кейин матнда “Инвестор” деб юритилади,
              бир томондан ва “ ISHBEKOV STROI SERVICE ” МЧЖ, бундан кейин
              матнда “Қурувчи” деб юритилади, Директори номидан Устав асосида иш
              юритувчи Т.И.Ишбеков, бошқа томондан, биргаликда “Томонлар”, якка
              ҳолда эса “Томон” деб юритилади, ушбу шартномани имзолаш орқали
              Томонлар инвестиция ҳиссасининг шартномавий нархи тўғрисида
              қуйидаги келишувга эришганликларини тасдиқлаймиз:
            </p>
            <table className="Contract__table">
              <thead>
                <tr>
                  <th>Уй рақами </th>
                  <th>Яшаш хоналари сони </th>
                  <th>Кириш йўлаги</th>
                  <th>Хонадоннинг умумий майдони (кв.м.)</th>
                  <th>Қават </th>
                  <th>1 кв.м учун нарх. (сўм) 12% ҚҚС билан ҳисоблаганда</th>
                  <th>Умумий сумма (сўм) 12% ҚҚС билан ҳисоблаганда </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {shartnoma?.apartment_number} ({shartnoma?.block_number}{" "}
                    Блок)
                  </td>
                  <td>{shartnoma?.number_of_rooms}</td>
                  <td>{shartnoma?.entrance}</td>
                  <td>{shartnoma?.field}</td>
                  <td>{shartnoma?.floor}</td>
                  <td>{formatmoney(shartnoma?.metr_kvadrati_puli)} сўм</td>
                  <td>{formatmoney(shartnoma?.umumiy_summa)} сўм</td>
                </tr>
                <tr>
                  <td colSpan={10}>
                    ЖАМИ: <b>{formatmoney(shartnoma?.umumiy_summa)} so'm</b> ,
                    12% ҚҚС билан ҳисоблаганда
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="ContractPDF__desc md">
              Умумий сумма сўз билан:{" "}
              <b>{numberToUzbekWords(shartnoma?.umumiy_summa)} so'm</b>, шу
              жумладан ҚҚС 12%.
            </p>
            <p className="ContractPDF__desc md">
              Объект: Турар-жой биноси, қуйидаги манзилда жойлашган: Самарканд
              вилояти, Каттакургон тумани, Яккабог МФЙ.
            </p>
            <p className="ContractPDF__desc md">
              Умумий майдони сўз билан:{" "}
              <b>{numberToUzbekWords(shartnoma?.field)}</b> кв.м.
            </p>
            <p className="ContractPDF__desc md">
              Яшаш хоналарининг умумий сони сўзлар билан:{" "}
              <b>{numberToUzbekWords(shartnoma?.number_of_rooms)}</b>.
            </p>
          </div>
        </div>
        <div className="ContractPDF__page">
          <div>
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
