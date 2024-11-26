import "../css/style.css";
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
    alert("School not found");
  }
}

getData(URL);
// How about a button showing the next 150? Previous/next button? (if possible)

// Make form function and add event listener

function maintainScoreThresholds() {
  let readingThreshold = document.inputCriticalReading;
  let writingThreshold = document.inputWriting;
  let mathThreshold = document.inputMath;
}

function createCards(filterMode) {
  // Load schools and SAT scores. How about a list??
  data
    .filter((school) => {
      if ((filterMode = "reading")) {
        school.sat_critical_reading_avg_score >= readingThreshold;
      } else if (filterMode === "writing") {
        school.sat_writing_avg_score >= writingThreshold;
      } else if (filterMode === "math") {
        school.sat_math_avg_score >= mathThreshold;
      } else if (filterMode === "all") {
        school.sat_critical_reading_avg_score >= readingThreshold;
        school.sat_writing_avg_score >= writingThreshold;
        school.sat_math_avg_score >= mathThreshold;
      } else if (filterMode === "") {
        school.dbn.includes("");
      } else {
        return;
      }
    })
    .forEach((school) => {
      const cardHTML = `
      <div class="card h-80 w-[22%] border-3 border-black rounded-sm m-8 p-8 flex flex-wrap justify-center items-center">
        <h2 class="text 2xl font-sans" id="school-name">${school.school_name}</h2>
        <h3 class="dbn">${school.dbn}</h2>
        <ul class="sat-avg-scores">
          <li id="math-scores">${school.sat_math_avg_score}</li>
          <li id="writing-scores">${school.sat_writing_avg_score}</li>
          <li id="reading-scores">${school.sat_critical_reading_avg_score}</li>
          <li id="test-takers">${school.num_of_sat_test_takers}</li>
      </div>
  `;
      DOMSelectors.container.insertAdjacentHTML(
        // Make some cards
        "beforeend",
        cardHTML
      );
    });
}

createCards("");

// Cards for buttons

function filterByReading() {
  DOMSelectors.container.innerHTML("");
  createCards("reading");
}

function filterByWriting() {
  DOMSelectors.container.innnerHTML("");
  createCards("writing");
}

function filterByMath() {
  DOMSelectors.container.innerHTML("");
  createCards("math");
}

function filterByAll() {
  DOMSelectors.container.innerHTML("");
  createCards("all");
}

function resetFilters() {
  DOMSelectors.container.innerHTML("");
  createCards("");
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

DOMSelectors.resetFiltersButton.addEventListener("click", function () {
  resetFilters();
});
// Plan:
// - Make a form allowing the user to input math, critical reading, and writing scores and test takers
// - Filter thresholds will change based on what the user inputs. Text should change once user submits form
// - Make cards like in the Vite project, add filter buttons based on scores and text takers
// - API doesn't have images; make text big to compensate. Have good colors
// - If possible, add previous/next pages
// - SAT worked differently in 2012 than it did today; add explanations for site visitors on how scoring worked
// - 800 pts per section, minimum possible was 200, adding up to a minimum of 600 and a maximum of 2400
