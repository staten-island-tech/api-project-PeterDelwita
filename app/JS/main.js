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
            <div class="h-120 w-[25%] border-3 border-solid border-2 bg-gray-900 border-blue-600 rounded-2xl flex m-8 p-12 flex-wrap justify-center items-center max-[1150px]:w-[40%] max-[600px]:w-[80%] max-[350px]:p-8">
              <div class="container w-full flex justify-center">
                <h2 class="text-[21px] min-[800px]:text-[24px] text-blue-600 text-center" id="school-name">School Name: ${school.school_name}</h2>
              </div>
              <ul class="sat-avg-scores">
                <li class="text-[16px] text-blue-600" id="math-scores">DBN: ${school.dbn}</li>
                <li class="text-[16px] text-blue-600" id="math-scores">Math: ${school.sat_math_avg_score}</li>
                <li class="text-[16px] text-blue-600" id="writing-scores">Writing: ${school.sat_writing_avg_score}</li>
                <li class="text-[16px] text-blue-600" id="reading-scores">Critical Reading: ${school.sat_critical_reading_avg_score}</li>
                <li class="text-[16px] text-blue-600" id="test-takers">Number of Takers: ${school.num_of_sat_test_takers}</li>
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

  const defaultReading = 400;
  const defaultWriting = 400;
  const defaultMath = 400;

  const minReading =
    parseInt(DOMSelectors.inputCriticalReading.value) || defaultReading;
  const minWriting =
    parseInt(DOMSelectors.inputWriting.value) || defaultWriting;
  const minMath = parseInt(DOMSelectors.inputMath.value) || defaultMath;

  // Reading Scores
  if (filterMode === "reading") {
    return school.sat_critical_reading_avg_score >= minReading;
    // Writing Scores
  } else if (filterMode === "writing") {
    return school.sat_writing_avg_score >= minWriting;
    // Math Scores
  } else if (filterMode === "math") {
    return school.sat_math_avg_score >= minMath;
    // All Three
  } else if (filterMode === "all") {
    return (
      school.sat_critical_reading_avg_score >= minReading &&
      school.sat_writing_avg_score >= minWriting &&
      school.sat_math_avg_score >= minMath
    );
    // Filter by Borough
  } else if (filterMode === "manhattan") {
    return school.dbn.includes("M");
  } else if (filterMode === "bronx") {
    return school.dbn.includes("X");
  } else if (filterMode === "brooklyn") {
    return school.dbn.includes("K");
  } else if (filterMode === "queens") {
    return school.dbn.includes("Q");
  } else if (filterMode === "statenisland") {
    return school.dbn.includes("R");
    // No Filter
  } else {
    return true;
  }
}

// Cards for buttons

function filterByReading() {
  DOMSelectors.container.innerHTML = "";
  getData(URL, "reading");
}

function filterByWriting() {
  DOMSelectors.container.innerHTML = "";
  getData(URL, "writing");
}

function filterByMath() {
  DOMSelectors.container.innerHTML = "";
  getData(URL, "math");
}

function filterByAll() {
  DOMSelectors.container.innerHTML = "";
  getData(URL, "all");
}

function filterManhattan() {
  DOMSelectors.container.innerHTML = "";
  getData(URL, "manhattan");
}

function filterBronx() {
  DOMSelectors.container.innerHTML = "";
  getData(URL, "bronx");
}

function filterBrooklyn() {
  DOMSelectors.container.innerHTML = "";
  getData(URL, "brooklyn");
}

function filterQueens() {
  DOMSelectors.container.innerHTML = "";
  getData(URL, "queens");
}

function filterStatenIsland() {
  DOMSelectors.container.innerHTML = "";
  getData(URL, "statenisland");
}

function resetFilters() {
  DOMSelectors.container.innerHTML = "";
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

DOMSelectors.manhattanButton.addEventListener("click", function () {
  filterManhattan();
});

DOMSelectors.bronxButton.addEventListener("click", function () {
  filterBronx();
});

DOMSelectors.brooklynButton.addEventListener("click", function () {
  filterBrooklyn();
});

DOMSelectors.queensButton.addEventListener("click", function () {
  filterQueens();
});

DOMSelectors.statenIslandButton.addEventListener("click", function () {
  filterStatenIsland();
});

DOMSelectors.resetFiltersButton.addEventListener("click", function () {
  resetFilters();
});

// Plan:
// - Make a form allowing the user to input math, critical reading, and writing scores
// - Filter thresholds will change based on what the user inputs. Text should change once user submits form
// - Make cards like in the Vite project, add filter buttons based on scores
// - API doesn't have images; make text big to compensate. Have good colors
// - If possible, add previous/next pages
// - SAT worked differently in 2012 than it did today; add explanations for site visitors on how scoring worked
// - 800 pts per section, minimum possible was 200, adding up to a minimum of 600 and a maximum of 2400
