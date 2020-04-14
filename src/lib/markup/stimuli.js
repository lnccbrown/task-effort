const baseStimulus = (element, prompt = false) => {
  const class_ = prompt ? "main-prompt" : "effort-container";
  return `<div class=${class_}>${element}</div>`;
};

export { baseStimulus };
