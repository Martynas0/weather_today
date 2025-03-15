export const api = (function () {
  const apiKey = "X3C3GDAYS9SA7H8V7SSUD6LPC";

  const cleanData = (data) => {
    // if next 12 hours is 2 seperate days
    let twelveHours;
    if (data.days[1]) {
      twelveHours = [...data.days[0].hours, ...data.days[1].hours];
    } else {
      twelveHours = [...data.days[0].hours];
    }

    // Match the api's datetime format
    const timeNow =
      new Date().getHours() <= 9
        ? "0" + new Date().getHours()
        : new Date().getHours();

    // get index from which to slice out following 12 items
    const startIndex = twelveHours.findIndex((item) => {
      return item.datetime.substring(0, 2) === timeNow.toString();
    });

    twelveHours = twelveHours.slice(startIndex, startIndex + 12);
    return { loc: data.resolvedAddress, twelveHours };
  };

  const fetchData = async (unit, location) => {
    location = location ? location : "Manchester";
    unit = unit ? "uk" : "us";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next12hours?unitGroup=${unit}&key=${apiKey}&include=hours&elements=temp,humidity,windspeed,datetime`;

    try {
      const response = await fetch(url, { mode: "cors" });
      const result = await response.json();
      console.log(result);
      return cleanData(result);
    } catch (err) {
      console.error(err);
    }
  };

  return { fetchData };
})();
