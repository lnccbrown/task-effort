import { jsPsych } from "jspsych-react";

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// hide cursor on screen
const removeCursor = (elementId) => {
  let element = document.getElementById(elementId);
  element.classList.add("nocursor");
};

// add cursor back on screen
const addCursor = (elementId) => {
  let element = document.getElementById(elementId);
  element.classList.remove("nocursor");
};

// response time
const rt = (start) => Date.now() - start;

// add a random number between 0 and offset to the base number
const jitter = (base, offset) =>
  base + Math.floor(Math.random() * Math.floor(offset));

// add a random number between 0 and 50 to the base number
const jitter50 = (base) => jitter(base, 50);

// flip a coin
const randomTrue = () => Math.random() > 0.5;

// deeply copy an object
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

// format a number as a dollar amount
const formatDollars = (amount) => "$" + parseFloat(amount).toFixed(2);

// create a pre-trial wait period
const generateWaitSet = (trial, waitTime) => {
  let waitTrial = Object.assign({}, trial);
  waitTrial.trial_duration = waitTime;
  waitTrial.response_ends_trial = false;
  waitTrial.prompt = "-";

  return [waitTrial, trial];
};

const keypressResponse = (info) => {
  const data = {
    key_press: info.key,
  };

  jsPsych.finishTrial(data);
};

const startKeypressListener = () => {
  let keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
    callback_function: keypressResponse,
    valid_responses: jsPsych.ALL_KEYS,
    persist: false,
  });

  return keyboardListener;
};

// if use images in task, uncomment this
// and make sure there are images in the src/assets/images folder!
// otherwise the build will fail
// // import images
// const importAll = (r) => {
//   return r.keys().map(r);
// };

// const images = importAll(
//   requireContext("../assets/images", false, /\.(png|jpe?g|svg)$/)
// );

const getTurkUniqueId = () => {
  const turkInfo = jsPsych.turk.turkInfo();
  const uniqueId = `${turkInfo.workerId}:${turkInfo.assignmentId}`;
  return uniqueId;
};

const getProlificId = (data) => {
  const currWindowURL = window.location.href;
  console.log(currWindowURL); // url

  // function to parse URL and only get value of desired variables
  function getQueryVariable(variable) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  }

  const prolificId = getQueryVariable("PROLIFIC_PID");
  // const sessionId = getQueryVariable("SESSION_ID");
  // const studyId = getQueryVariable("STUDY_ID");

  console.log(prolificId);
  const uniqueId = `${prolificId}`;
  console.log(uniqueId);
  jsPsych.data.addProperties({ uniqueId: uniqueId, timestamp: Date.now() });
};

const getUserId = (data) => {
  const patientId = JSON.parse(data.responses)["Q0"];
  jsPsych.data.addProperties({ patient_id: patientId, timestamp: Date.now() });
  console.log("ID", patientId);
};

export {
  sleep,
  removeCursor,
  addCursor,
  rt,
  jitter,
  jitter50,
  randomTrue,
  deepCopy,
  formatDollars,
  generateWaitSet,
  // images,
  startKeypressListener,
  getUserId,
  getTurkUniqueId,
  getProlificId,
};
