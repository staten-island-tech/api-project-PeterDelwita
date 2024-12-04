const DOMSelectors = {
  container: document.querySelector(".container"),
  button: document.querySelectorAll(".btn"),
  // Filter by grade
  criticalReadingButton: document.querySelector("#critical-reading-button"),
  writingButton: document.querySelector("#writing-button"),
  mathButton: document.querySelector("#math-button"),
  applyEverythingButton: document.querySelector("#all"),
  // Filter by borough
  manhattanButton: document.querySelector("#manhattan"),
  bronxButton: document.querySelector("#bronx"),
  brooklynButton: document.querySelector("#brooklyn"),
  queensButton: document.querySelector("#queens"),
  statenIslandButton: document.querySelector("#statenisland"),
  // Other stuff
  resetFiltersButton: document.querySelector("#reset"),
  card: document.querySelector(".card"),
  form: document.querySelector(".form"),
  inputCriticalReading: document.querySelector("#critical-reading"),
  inputWriting: document.querySelector("#writing"),
  inputMath: document.querySelector("#math"),
};

export { DOMSelectors };
