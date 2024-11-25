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
      const data = await response.json(); // Turns response into json file we can use
      console.log(data);
    }
    // Log names, scores of each school.
  } catch (error) {
    alert("School not found"); // I plan to take the informaiton and insert it as HTML
  }
}

getData(URL);
// How about a button showing the next 150? Previous/next button? (if possible)

// What to do with this data...
// Center it around SAT scores. Make a list of schools, add filters for SAT scores, let users sort schools by DBN or school name
// Lots of schools; cards are tacky.
function loadSchools() {
  // Load schools and SAT scores. How about a list??
  getData(URL);
  data.forEach((school) =>
    DOMSelectors.container.insertAdjacentHTML(
      // Make some cards
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

// Plan:
// - Make a form allowing the user to input math, critical reading, and writing scores and test takers
// - Filter thresholds will change based on what the user inputs. Text should change once user submits form
// - Make cards like in the Vite project, add filter buttons based on scores and text takers
// - API doesn't have images; make text big to compensate. Have good colors
// - If possible, add previous/next pages
// - SAT worked differently in 2012 than it did today; add explanations for site visitors on how scoring worked
// - 800 pts per section, minimum possible was 200, adding up to a minimum of 600 and a maximum of 2400
