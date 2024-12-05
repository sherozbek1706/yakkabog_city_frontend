function findApartment(etaj, podyezd, xonaningetajdagiraqami) {
  const etajdanechtaxonabor = 4;
  const podyezdaNechataEtajBor = 5;

  // Birinchi podyezdning birinchi kvartirasi raqami
  const startingApartment =
    (podyezd - 1) * etajdanechtaxonabor * podyezdaNechataEtajBor;

  // Umumiy kvartira raqami
  const apartmentNumber =
    startingApartment +
    (etaj - 1) * etajdanechtaxonabor +
    xonaningetajdagiraqami;

  return apartmentNumber;
}

const etaj = 4;
const podyezd = 3;
const xonaningetajdagiraqami = 3;

// export const getMonthlyDatesWithAmounts = (startDate, monthsCount, amount) => {
//   const datesWithAmounts = [];
//   const start = new Date(startDate);

//   for (let i = 1; i <= monthsCount; i++) {
//     const date = new Date(start);
//     date.setMonth(start.getMonth() + (i - 1));

//     datesWithAmounts.push({
//       monthNumber: i,
//       date: date.toISOString(),
//       amount: amount,
//     });
//   }

//   return datesWithAmounts;
// };

const startDate = "2024-11-04T17:10:10.051Z";
const monthsCount = 60;
const amount = 1000;
console.log(getMonthlyDatesWithAmounts(startDate, monthsCount, amount));
