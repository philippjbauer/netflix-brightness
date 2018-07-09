function setBrightness(output, brightness) {
  output.value = `${brightness}%`;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { brightness });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("#slider");
  const output = document.querySelector("#current");

  chrome.storage.local.get("brightness", (data) => {
    if (data.brightness) {
      slider.value = data.brightness / 100;
      setBrightness(output, data.brightness);
    }
  });

  slider.addEventListener("input", () => {
    const brightness = Math.floor(slider.value * 100);
    chrome.storage.local.set({brightness: brightness});
    setBrightness(output, brightness);
  });
});