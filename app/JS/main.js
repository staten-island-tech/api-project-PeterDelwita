import "../css/style.css";
import { DOMSelectors } from "./dom.js";

const URL = "https://data.cityofnewyork.us/resource/f9bf-2cp4.json";

async function getData(URL, filterMode) {
  try {
    const response = await fetch(URL);
    console.log(response); // Have to log this to see status
    if (response.status != 200) {
      // Log response for status
      throw new Error(response); // Guard clause
    } else {
      const data = await response.json(); // Turns response into json file we can use
      console.log(data);
      // Make cards
      data
        .filter((school) => filterCards(school, filterMode))
        .forEach((school) => {
          const cardHTML = `
            <div class="card h-80 w-[22%] border-3 border-black rounded-sm m-8 p-8 flex flex-wrap justify-center items-center">
              <h2 class="text 2xl font-sans" id="school-name">School Name: ${school.school_name}</h2>
              <h3 class="dbn">DBN: ${school.dbn}</h2>
              <ul class="sat-avg-scores">
                <li id="math-scores">Math: ${school.sat_math_avg_score}</li>
                <li id="writing-scores">Writing: ${school.sat_writing_avg_score}</li>
                <li id="reading-scores">Critical Reading: ${school.sat_critical_reading_avg_score}</li>
                <li id="test-takers">Number of Takers: ${school.num_of_sat_test_takers}</li>
            </div>
          `;
          DOMSelectors.container.insertAdjacentHTML(
            // Make some cards
            "beforeend",
            cardHTML
          );
        }); // Supposed to insert the cards into the container.
    }
    // Log names, scores of each school.
  } catch (error) {
    alert("School not found");
  }
}

getData(URL, "");
// How about a button showing the next 150? Previous/next button? (if possible)

// Make form function and add event listener

function filterCards(school, filterMode) {
  // Run only when we change filtermode
  if (
    school.sat_critical_reading_avg_score === "s" ||
    school.sat_writing_avg_score === "s" ||
    school.sat_math_avg_score === "s" ||
    !school
  ) {
    return false; // Guard clause, remove invalid scores (don't list schools saying "s")
  }
  // Reading Scores
  if (filterMode === "reading") {
    return (
      school.sat_critical_reading_avg_score >=
      DOMSelectors.inputCriticalReading.value
    );
    // Writing Scores
  } else if (filterMode === "writing") {
    return school.sat_writing_avg_score >= DOMSelectors.inputWriting.value;
    // Math Scores
  } else if (filterMode === "math") {
    return school.sat_math_avg_score >= DOMSelectors.inputMath.value;
    // All Three
  } else if (filterMode === "all") {
    return (
      school.sat_critical_reading_avg_score >=
        DOMSelectors.inputCriticalReading.value &&
      school.sat_writing_avg_score >= DOMSelectors.inputWriting.value &&
      school.sat_math_avg_score >= DOMSelectors.inputMath.value
    );
    // No Filter
  } else {
    return true;
  }
}

// Cards for buttons (must update with API)

function filterByReading() {
  DOMSelectors.container.innerHTML("");
  getData(URL, "reading");
}

function filterByWriting() {
  DOMSelectors.container.innerHTML("");
  getData(URL, "writing");
}

function filterByMath() {
  DOMSelectors.container.innerHTML("");
  getData(URL, "math");
}

function filterByAll() {
  DOMSelectors.container.innerHTML("");
  getData(URL, "all");
}

// function filterUnknownValues() {
//   DOMSelectors.container.innerHTML("");
//   getData(URL, "s");
// }

function resetFilters() {
  DOMSelectors.container.innerHTML("");
  getData(URL, "");
}

DOMSelectors.criticalReadingButton.addEventListener("click", function () {
  filterByReading();
});

DOMSelectors.writingButton.addEventListener("click", function () {
  filterByWriting();
});

DOMSelectors.mathButton.addEventListener("click", function () {
  filterByMath();
});

DOMSelectors.applyEverythingButton.addEventListener("click", function () {
  filterByAll();
});

// DOMSelectors.unknownButton.addEventListener("click", function () {
//   filterUnknownValues();
// });

DOMSelectors.resetFiltersButton.addEventListener("click", function () {
  resetFilters();
});

DOMSelectors.form.addEventListener("submit", function (event) {
  event.preventDefault();
});
// Plan:
// - Make a form allowing the user to input math, critical reading, and writing scores and test takers
// - Filter thresholds will change based on what the user inputs. Text should change once user submits form
// - Make cards like in the Vite project, add filter buttons based on scores and text takers
// - API doesn't have images; make text big to compensate. Have good colors
// - If possible, add previous/next pages
// - SAT worked differently in 2012 than it did today; add explanations for site visitors on how scoring worked
// - 800 pts per section, minimum possible was 200, adding up to a minimum of 600 and a maximum of 2400
