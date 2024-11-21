// No status shown on API. Maybe try another
const URL = "https://data.cityofnewyork.us/resource/f9bf-2cp4.json";

async function getData(URL) {
  try {
    const response = await fetch(URL); // Make the guard clause; find an API with a status of 200 or 299
    console.log(response); // Have to log this to see status
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json();
      console.log(data);
    }
    // Log names, scores of each school.
  } catch (error) {
    alert("School not found"); // I plan to take the informaiton and insert it as HTML
  }
}

getData(URL);
