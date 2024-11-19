import "../css/style.css";

// No status shown on API. Maybe try another

async function getAPI() {
  try {
    const response = await fetch(
      "https://data.cityofnewyork.us/resource/f9bf-2cp4.json"
    );
  } catch (error) {
    alert("I could not find that agent");
  }
}
