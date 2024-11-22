import { DOMSelectors } from "./dom.js";

const URL = "https://data.cityofnewyork.us/resource/f9bf-2cp4.json";

async function getData(URL) {
  try {
    const response = await fetch(URL);
    console.log(response); // Have to log this to see status
    if (response.status != 200) {
      // Log response for status
      throw new Error(response); // Guard clause
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

// What to do with this data...
// Center it around SAT scores. Make a list of schools, add filters for SAT scores, let users sort schools by DBN or school name
// Lots of schools; cards are tacky.
function loadSchools() {
  // Load schools and SAT scores. How about a list??
  data.forEach((school) =>
    DOMSelectors.container.insertAdjacentHTML(
      "beforeend",
      `
      <div id="list">
        <h2 class="text 2xl font-sans" id="school-name">${school.school_name}</h2>
        <h3 id="dbn">${school.dbn}</h2>
        <ul id="sat-scores">
          <li id="math-scores">${school.sat_math_avg_score}</li>
          <li id="writing-scores">${school.sat_writing_avg_score}</li>
          <li id="reading-scores">${school.sat_critical_reading_avg_score}</li>
          <li id="test-takers">${school.num_of_sat_test_takers}</li>
      </div>
  `
    )
  );
}

loadSchools();
