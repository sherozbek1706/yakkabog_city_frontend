export const formatmoney = (money) => {
  const formattedNumber = money.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
  });

  return formattedNumber;
};

export const formatDate = (time, sana = false) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = addLeadingZero(date.getMonth() + 1);
  const day = addLeadingZero(date.getDate());
  const hours = addLeadingZero(date.getHours());
  const minutes = addLeadingZero(date.getMinutes());
  const seconds = addLeadingZero(date.getSeconds());

  if (sana == true) {
    return `${year}-${month}-${day}`;
  } else {
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};

const addLeadingZero = (number) => {
  return number < 10 ? "0" + number : number;
};

export const metr_kvadrat_chegirma = (foiz) => {
  const birinchi20 = 200000; // 20% qiymati
  const keyingi10 = 200000; // 10% qiymati
  const uchinchi20 = 200000; // Yana bir 20% qiymati
  const tortinchi50 = 600000; // 50% qiymati

  let natija = 0;

  if (foiz <= 20) {
    natija = (foiz / 20) * birinchi20;
  } else if (foiz <= 30) {
    // 20% ni to'liq olamiz va qolgan qismi keyingi 10% dan hisoblaymiz
    natija = birinchi20 + ((foiz - 20) / 10) * keyingi10;
  } else if (foiz <= 50) {
    // 30% ni to'liq olamiz va qolgan qismi yana 20% dan hisoblaymiz
    natija = birinchi20 + keyingi10 + ((foiz - 30) / 20) * uchinchi20;
  } else if (foiz <= 100) {
    // 50% ni to'liq olamiz va qolgan qismi 50% dan hisoblaymiz
    natija =
      birinchi20 + keyingi10 + uchinchi20 + ((foiz - 50) / 50) * tortinchi50;
  }

  return Math.round(natija);
  // return natija;
};

export const ipotekaSummaMinus = (summ) => {
  let ipoteka = 330000000;
  if (summ >= ipoteka) {
    return { qolgan_summa: summ - ipoteka, ipoteka };
  } else {
    return { qolgan_summa: 0, ipoteka: Math.abs(summ) };
  }
};

//  *****************

export const numberToUzbekWords = (num) => {
  if (num === 0) return "nol";

  const units = [
    "",
    "bir",
    "ikki",
    "uch",
    "to'rt",
    "besh",
    "olti",
    "yetti",
    "sakkiz",
    "to'qqiz",
  ];
  const tens = [
    "",
    "o'n",
    "yigirma",
    "o'ttiz",
    "qirq",
    "ellik",
    "oltmish",
    "yetmish",
    "sakson",
    "to'qson",
  ];
  const hundreds = [
    "",
    "yuz",
    "ikki yuz",
    "uch yuz",
    "to'rt yuz",
    "besh yuz",
    "olti yuz",
    "yetti yuz",
    "sakkiz yuz",
    "to'qqiz yuz",
  ];
  const thousands = ["", "ming", "million", "milliard", "trillion"];

  // Helper function to convert integers to Uzbek words
  function integerToWords(number) {
    let words = [];
    let scale = 0;

    while (number > 0) {
      let chunk = number % 1000;
      if (chunk > 0) {
        let chunkWords = [];
        let hundred = Math.floor(chunk / 100);
        let ten = Math.floor((chunk % 100) / 10);
        let unit = chunk % 10;

        if (hundred > 0) chunkWords.push(hundreds[hundred]);
        if (ten > 0) chunkWords.push(tens[ten]);
        if (unit > 0) chunkWords.push(units[unit]);

        if (scale > 0) chunkWords.push(thousands[scale]);
        words.unshift(chunkWords.join(" "));
      }
      number = Math.floor(number / 1000);
      scale++;
    }

    return words.join(" ");
  }

  // Separate integer and decimal parts
  const [integerPart, decimalPart] = num.toString().split(".");

  let result = integerToWords(parseInt(integerPart));

  // Process decimal part if it exists
  if (decimalPart) {
    result += " butun";
    const decimalValue = parseInt(decimalPart);

    // Process the decimal digits separately
    const decimalWords = [];
    const decimalLength = decimalPart.length;

    for (let i = 0; i < decimalLength; i++) {
      const digit = parseInt(decimalPart[i]);
      decimalWords.push(units[digit]);
    }

    if (decimalLength === 1) {
      result += ` ${decimalWords.join(" ")} o'n`;
    } else if (decimalLength === 2) {
      result += ` ${integerToWords(decimalValue)} yuz`;
    } else if (decimalLength === 3) {
      result += ` ${integerToWords(decimalValue)} ming`;
    } else {
      result += ` ${integerToWords(decimalValue)}`;
    }
  }

  return result;
};

// ********************

export const getMonthName = (date) => {
  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  // Sana `Date` formatida kelishini ta'minlash
  const inputDate = new Date(date);

  // Oyni indeksiga qarab nomini olish
  const monthName = months[inputDate.getMonth()];

  return monthName || "Noto'g'ri sana";
};

// *******************

export const getYearFromDate = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

// ********************

export const getDayFromDate = (dateString) => {
  const date = new Date(dateString);
  return date.getDate();
};
