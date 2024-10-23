// import React, { useContext, useState } from "react";
// import "./contract-add.css";
// import { Fragment } from "react";
// import { Header } from "../../../components";
// import { MainContext } from "../../../utils/context/context";
// import { Errors } from "../../../utils/errors";
// import { info_notify } from "../../../shared/notify";

// export const ContractAdd = () => {
//   const { getModel } = useContext(MainContext);

//   const [fullName, setFullName] = useState(getModel?.full_name || "");
//   const [phone_number1, setPhone_number1] = useState(
//     getModel?.phone_number1 || ""
//   );
//   const [phone_number2, setPhone_number2] = useState(
//     getModel?.phone_number2 || ""
//   );
//   const [pinfl, setPinfl] = useState("");
//   const [seria, setSeria] = useState("");
//   const [address, setAddress] = useState("");
//   const [birtday, setBirthday] = useState("");
//   const [give_pass_date, setGive_pass_date] = useState("");
//   const [pass_amal_qil_mud, setPass_amal_qil_mud] = useState("");
//   const [pass_ber_joy, setPass_ber_joy] = useState("");

//   const validate = () => {
//     const phoneRegex = /^\+(998|7)\d{9}$/; // Updated regex to allow "+" at the start
//     const pinflRegex = /^\d{14}$/;
//     const seriaRegex = /^[A-Z]{2} \d{7}$/;
//     const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

//     if (!phoneRegex.test(phone_number1)) {
//       info_notify("Номер телефона должен быть в формате +998 или +7");
//       return false;
//     }
//     if (!phoneRegex.test(phone_number2) || phone_number1 === phone_number2) {
//       info_notify(
//         "Дополнительный номер телефона должен отличаться от первого и быть в формате +998 или +7"
//       );
//       return false;
//     }
//     if (!pinflRegex.test(pinfl)) {
//       info_notify("ПИНФЛ должен содержать 14 цифр");
//       return false;
//     }
//     if (!seriaRegex.test(seria)) {
//       info_notify(
//         "Паспорт серии должен состоять из 2 букв и 7 цифр, разделенных пробелом"
//       );
//       return false;
//     }
//     if (!dateRegex.test(birtday)) {
//       info_notify("Дата рождения должна быть в формате ДД-ММ-ГГГГ");
//       return false;
//     }
//     if (!dateRegex.test(give_pass_date)) {
//       info_notify("Дата выдачи паспорта должна быть в формате ДД-ММ-ГГГГ");
//       return false;
//     }
//     if (!dateRegex.test(pass_amal_qil_mud)) {
//       info_notify("Срок действия паспорта должен быть в формате ДД-ММ-ГГГГ");
//       return false;
//     }
//     if (!address) {
//       info_notify("Адрес проживания обязателен");
//       return false;
//     }
//     if (!pass_ber_joy) {
//       info_notify("Место выдачи паспорта обязательно");
//       return false;
//     }
//     return true;
//   };

//   const handleSeriaChange = (e) => {
//     let input = e.target.value.toUpperCase();

//     // Only allow letters in the first two positions and numbers in the rest
//     if (input.length <= 2) {
//       input = input.replace(/[^A-Z]/g, ""); // Only allow letters
//     } else {
//       input = input.slice(0, 2) + " " + input.slice(2).replace(/[^0-9]/g, ""); // Add space and allow only numbers after
//     }

//     setSeria(input.slice(0, 10)); // Limit to two letters, space, and seven digits
//   };

//   const handleDateChange = (setter) => (e) => {
//     let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

//     // Initialize formatted date
//     let formattedDate = "";

//     // Format as DD-MM-YYYY
//     if (input.length > 0) {
//       // Handle day
//       let day = input.slice(0, 2);
//       if (parseInt(day, 10) > 31) day = "31"; // Limit to maximum day of 31
//       formattedDate = day;
//     }

//     if (input.length > 2) {
//       // Handle month
//       let month = input.slice(2, 4);
//       if (parseInt(month, 10) > 12) month = "12"; // Limit to maximum month of 12
//       formattedDate = `${formattedDate}-${month}`;
//     }

//     if (input.length > 4) {
//       // Handle year only if all four digits are present
//       let year = input.slice(4, 8);
//       const currentYear = new Date().getFullYear();
//       const minYear = 1900; // Set a reasonable minimum year

//       // Only apply min and max year limits if all 4 digits are entered
//       if (year.length === 4) {
//         if (parseInt(year, 10) > currentYear) year = `${currentYear}`;
//         else if (parseInt(year, 10) < minYear) year = `${minYear}`;
//       }

//       formattedDate = `${formattedDate}-${year}`;
//     }

//     setter(formattedDate.slice(0, 10)); // Set formatted date, max length 10
//   };

//   const handlePhoneChange = (setter) => (e) => {
//     let input = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters

//     // Add "+" if not already present and detect the number type for formatting
//     if (input && !input.startsWith("998") && !input.startsWith("7")) {
//       input = "+" + input;
//     }

//     // Format for Uzbekistan: +998 (XX) XXX XX XX
//     if (input.startsWith("998")) {
//       input = "+" + input.slice(0, 12); // Limit to 12 digits after "998"
//       if (input.length > 4) input = input.slice(0, 4) + " (" + input.slice(4);
//       if (input.length > 7) input = input.slice(0, 8) + ") " + input.slice(8);
//       if (input.length > 12) input = input.slice(0, 13) + " " + input.slice(13);
//       if (input.length > 15) input = input.slice(0, 16) + " " + input.slice(16);
//     }
//     // Format for Russia: +7 (XXX) XXX XX XX
//     else if (input.startsWith("7")) {
//       input = "+" + input.slice(0, 11); // Limit to 11 digits after "7"
//       if (input.length > 2) input = input.slice(0, 2) + " (" + input.slice(2);
//       if (input.length > 6) input = input.slice(0, 6) + ") " + input.slice(6);
//       if (input.length > 10) input = input.slice(0, 10) + " " + input.slice(10);
//       if (input.length > 12) input = input.slice(0, 13) + " " + input.slice(13);
//     }

//     // Handle backspace behavior specifically at formatting characters
//     if (e.nativeEvent.inputType === "deleteContentBackward") {
//       // Remove trailing space or formatting character if the backspace is at one
//       if (input.endsWith(" ") || input.endsWith(")") || input.endsWith("(")) {
//         input = input.slice(0, -1); // Remove last character
//       }
//     }

//     setter(input); // Update state with formatted phone number
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const obj = {
//         fullName,
//         phone_number1,
//         phone_number2,
//         pinfl,
//         seria,
//         address,
//         birtday,
//         give_pass_date,
//         pass_amal_qil_mud,
//         pass_ber_joy,
//       };
//       console.log(obj);
//     } catch (error) {
//       Errors(error);
//     }
//   };

//   return (
//     <Fragment>
//       <Header title={"ПОДПИСАНИЯ ДОГОВОРА"} />
//       <div className="ContractAdd">
//         <div className="ContractForms">
//           <form className="ContractForm" onSubmit={handleSubmit}>
//             <div className="ContractFormClaster">
//               <div className="FormInputField">
//                 <label>Полное имя</label>
//                 <input
//                   type="text"
//                   placeholder="Введите полное имя"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="FormInputField">
//                 <label>Номер телефона</label>
//                 <input
//                   type="text"
//                   placeholder="Введите номер телефона"
//                   value={phone_number1}
//                   onChange={handlePhoneChange(setPhone_number1)}
//                   required
//                 />
//               </div>
//               <div className="FormInputField">
//                 <label>Дополнительный номер телефона</label>
//                 <input
//                   type="text"
//                   placeholder="Введите дополнительный номер телефона"
//                   value={phone_number2}
//                   onChange={handlePhoneChange(setPhone_number2)}
//                   required
//                 />
//               </div>
//               <div className="FormInputField">
//                 <label>ПИНФЛ</label>
//                 <input
//                   type="number"
//                   placeholder="Введите ПИНФЛ"
//                   value={pinfl}
//                   onChange={(e) => setPinfl(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="FormInputField">
//                 <label>Паспорт серии</label>
//                 <input
//                   type="text"
//                   placeholder="Введите паспорт серии"
//                   value={seria}
//                   onChange={(e) => handleSeriaChange(e)}
//                   required
//                 />
//               </div>
//               <div className="FormInputField">
//                 <label>Дата рождения (день-месяц-год)</label>
//                 <input
//                   type="text"
//                   placeholder="Введите дата рождения"
//                   value={birtday}
//                   onChange={handleDateChange(setBirthday)}
//                   required
//                 />
//               </div>
//               <div className="FormInputField">
//                 <label>Адрес проживания</label>
//                 <input
//                   type="text"
//                   placeholder="Введите адрес проживания"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="FormInputField">
//                 <label>Дата выдачи паспорта (день-месяц-год)</label>
//                 <input
//                   type="text"
//                   placeholder="Введите дата выдачи паспорта"
//                   value={give_pass_date}
//                   onChange={handleDateChange(setGive_pass_date)}
//                   required
//                 />
//               </div>
//               <div className="FormInputField">
//                 <label>Срок действия паспорта (день-месяц-год)</label>
//                 <input
//                   type="text"
//                   placeholder="Введите срок действия паспорта"
//                   value={pass_amal_qil_mud}
//                   onChange={handleDateChange(setPass_amal_qil_mud)}
//                   required
//                 />
//               </div>
//               <div className="FormInputField">
//                 <label>Место выдачи паспорта</label>
//                 <input
//                   type="text"
//                   placeholder="Введите место выдачи паспорта"
//                   value={pass_ber_joy}
//                   onChange={(e) => setPass_ber_joy(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="AnketaBtns">
//               <button type="submit" className="AnketaFormBtn Btn-Black">
//                 TASDIQLASH
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

import React, { useContext, useState } from "react";
import "./contract-add.css";
import { Fragment } from "react";
import { Header } from "../../../components";
import { MainContext } from "../../../utils/context/context";
import { Errors } from "../../../utils/errors";
import { info_notify } from "../../../shared/notify";

export const ContractAdd = () => {
  const { getModel } = useContext(MainContext);

  const [fullName, setFullName] = useState(getModel?.full_name || "");
  const [phone_number1, setPhone_number1] = useState(
    getModel?.phone_number1 || ""
  );
  const [phone_number2, setPhone_number2] = useState(
    getModel?.phone_number2 || ""
  );
  const [pinfl, setPinfl] = useState("");
  const [seria, setSeria] = useState("");
  const [address, setAddress] = useState("");
  const [birtday, setBirthday] = useState("");
  const [give_pass_date, setGive_pass_date] = useState("");
  const [pass_amal_qil_mud, setPass_amal_qil_mud] = useState("");
  const [pass_ber_joy, setPass_ber_joy] = useState("");

  const validate = () => {
    // Regex to match Uzbek numbers (+998) with 9 digits after the country code
    const uzbPhoneRegex = /^\+998\d{9}$/;
    // Regex to match Russian numbers (+7) with 10 digits after the country code
    const rusPhoneRegex = /^\+7\d{10}$/;

    const pinflRegex = /^\d{14}$/;
    const seriaRegex = /^[A-Z]{2}\d{7}$/;
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

    // Validate primary phone number
    if (
      !uzbPhoneRegex.test(phone_number1) &&
      !rusPhoneRegex.test(phone_number1)
    ) {
      info_notify("Номер телефона должен быть в формате +998 или +7");
      return false;
    }

    // Validate secondary phone number and ensure it's different from the primary number
    if (
      (!uzbPhoneRegex.test(phone_number2) &&
        !rusPhoneRegex.test(phone_number2)) ||
      phone_number1 === phone_number2
    ) {
      info_notify(
        "Дополнительный номер телефона должен отличаться от первого и быть в формате +998 или +7"
      );
      return false;
    }

    // Validate other fields
    if (!pinflRegex.test(pinfl)) {
      info_notify("ПИНФЛ должен содержать 14 цифр");
      return false;
    }
    if (!seriaRegex.test(seria)) {
      info_notify(
        "Паспорт серии должен состоять из 2 букв и 7 цифр"
      );
      return false;
    }
    if (!dateRegex.test(birtday)) {
      info_notify("Дата рождения должна быть в формате ДД-ММ-ГГГГ");
      return false;
    }
    if (!dateRegex.test(give_pass_date)) {
      info_notify("Дата выдачи паспорта должна быть в формате ДД-ММ-ГГГГ");
      return false;
    }
    if (!dateRegex.test(pass_amal_qil_mud)) {
      info_notify("Срок действия паспорта должен быть в формате ДД-ММ-ГГГГ");
      return false;
    }
    if (!address) {
      info_notify("Адрес проживания обязателен");
      return false;
    }
    if (!pass_ber_joy) {
      info_notify("Место выдачи паспорта обязательно");
      return false;
    }

    return true;
  };

  const handleDateChange = (setter) => (e) => {
    let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Initialize formatted date
    let formattedDate = "";

    // Format as DD-MM-YYYY
    if (input.length > 0) {
      // Handle day
      let day = input.slice(0, 2);
      if (parseInt(day, 10) > 31) day = "31"; // Limit to maximum day of 31
      formattedDate = day;
    }

    if (input.length > 2) {
      // Handle month
      let month = input.slice(2, 4);
      if (parseInt(month, 10) > 12) month = "12"; // Limit to maximum month of 12
      formattedDate = `${formattedDate}-${month}`;
    }

    if (input.length > 4) {
      // Handle year only if all four digits are present
      let year = input.slice(4, 8);
      const currentYear = new Date().getFullYear();
      const minYear = 1900; // Set a reasonable minimum year

      // Only apply min and max year limits if all 4 digits are entered
      if (year.length === 4) {
        if (parseInt(year, 10) > currentYear) year = `${currentYear}`;
        else if (parseInt(year, 10) < minYear) year = `${minYear}`;
      }

      formattedDate = `${formattedDate}-${year}`;
    }

    setter(formattedDate.slice(0, 10)); // Set formatted date, max length 10
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const obj = {
        fullName,
        phone_number1,
        phone_number2,
        pinfl,
        seria,
        address,
        birtday,
        give_pass_date,
        pass_amal_qil_mud,
        pass_ber_joy,
      };
      console.log(obj);
    } catch (error) {
      Errors(error);
    }
  };

  return (
    <Fragment>
      <Header title={"ПОДПИСАНИЯ ДОГОВОРА"} />
      <div className="ContractAdd">
        <div className="ContractForms">
          <form className="ContractForm" onSubmit={handleSubmit}>
            <div className="ContractFormClaster">
              <div className="FormInputField">
                <label>Полное имя</label>
                <input
                  type="text"
                  placeholder="Введите полное имя"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="FormInputField">
                <label>Номер телефона</label>
                <input
                  type="text"
                  placeholder="Введите номер телефона"
                  value={phone_number1}
                  onChange={(e) => setPhone_number1(e.target.value)}
                  required
                />
              </div>
              <div className="FormInputField">
                <label>Дополнительный номер телефона</label>
                <input
                  type="text"
                  placeholder="Введите дополнительный номер телефона"
                  value={phone_number2}
                  onChange={(e) => setPhone_number2(e.target.value)}
                  required
                />
              </div>
              <div className="FormInputField">
                <label>ПИНФЛ</label>
                <input
                  type="number"
                  placeholder="Введите ПИНФЛ"
                  value={pinfl}
                  onChange={(e) => setPinfl(e.target.value)}
                  required
                />
              </div>
              <div className="FormInputField">
                <label>Паспорт серии</label>
                <input
                  type="text"
                  placeholder="Введите паспорт серии"
                  value={seria}
                  onChange={(e) => setSeria(e.target.value)}
                  required
                />
              </div>
              <div className="FormInputField">
                <label>Дата рождения (день-месяц-год)</label>
                <input
                  type="text"
                  placeholder="Введите дату рождения"
                  value={birtday}
                  onChange={handleDateChange(setBirthday)}
                  required
                />
              </div>
              <div className="FormInputField">
                <label>Адрес проживания</label>
                <input
                  type="text"
                  placeholder="Введите адрес проживания"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="FormInputField">
                <label>Дата выдачи паспорта (день-месяц-год)</label>
                <input
                  type="text"
                  placeholder="Введите дату выдачи паспорта"
                  value={give_pass_date}
                  onChange={handleDateChange(setGive_pass_date)}
                  required
                />
              </div>
              <div className="FormInputField">
                <label>Срок действия паспорта (день-месяц-год)</label>
                <input
                  type="text"
                  placeholder="Введите срок действия паспорта"
                  value={pass_amal_qil_mud}
                  onChange={handleDateChange(setPass_amal_qil_mud)}
                  required
                />
              </div>
              <div className="FormInputField">
                <label>Место выдачи паспорта</label>
                <input
                  type="text"
                  placeholder="Введите место выдачи паспорта"
                  value={pass_ber_joy}
                  onChange={(e) => setPass_ber_joy(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="AnketaBtns">
              <button type="submit" className="AnketaFormBtn Btn-Black">
                TASDIQLASH
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};
