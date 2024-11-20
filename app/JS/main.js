import "../css/style.css";

// No status shown on API. Maybe try another

async function getAPI() {
  try {
    const response = await fetch(
      "https://data.cityofnewyork.us/resource/f9bf-2cp4.json"
    ); // Make the guard clause; find an API with a status of 200 or 299
    const data = await response.json();
    console.log(data);
    // Log names, scores of each school.
  } catch (error) {
    alert("I could not find those schools");
  }
}

getAPI();
