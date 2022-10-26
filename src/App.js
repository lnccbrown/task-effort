import React from "react";
import { Experiment } from "jspsych-react";
import { tl } from "./timelines/main";
import {
  ONLINE,
  MTURK,
  IS_ELECTRON,
  FIREBASE,
  PROLIFIC,
  AT_HOME,
} from "./config/main";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { getTurkUniqueId, sleep } from "./lib/utils";
import { addToFirebase, createFirebaseDocument } from "./firebase.js";
require("dotenv").config();

let ipcRenderer = false;
let psiturk = false;
if (IS_ELECTRON) {
  const electron = window.require("electron");
  ipcRenderer = electron.ipcRenderer;
} else if (MTURK) {
  /* eslint-disable */
  window.lodash = _.noConflict();
  psiturk = new PsiTurk(getTurkUniqueId(), "/complete");
  /* eslint-enable */
}

class App extends React.Component {
  render() {
    console.log("Online:", ONLINE);
    console.log("MTurk:", MTURK);
    console.log("Firebase:", FIREBASE);
    console.log("Prolific:", PROLIFIC);
    console.log("Electron:", IS_ELECTRON);
    console.log("At Home:", AT_HOME);
    console.log("Settings Overload:", process.env.REACT_APP_settingsOverload )
    return (
      <div className="App">
        <Experiment
          settings={{
            timeline: tl,
            on_data_update: (data) => {
              if (FIREBASE) {
                if (data.trial_index === 1) {
                  createFirebaseDocument(data.uniqueId);
                  addToFirebase(data);
                }
                if (data.trial_index > 1) {
                  addToFirebase(data);
                }
              }
              // electron
              if (ipcRenderer) {
                ipcRenderer.send("data", data);
              } else if (psiturk) {
                psiturk.recordTrialData(data);
              }
            },
            on_finish: (data) => {
              if (ipcRenderer) {
                ipcRenderer.send("end", "true");
              } else if (psiturk) {
                const completePsiturk = async () => {
                  psiturk.saveData();
                  await sleep(5000);
                  psiturk.completeHIT();
                };
                completePsiturk();
              } else {
                // jsPsych.data.get().localSave("csv", "task-effort.csv");
              }
            },
          }}
        />
      </div>
    );
  }
}

export default App;
