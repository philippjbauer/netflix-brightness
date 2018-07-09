chrome.runtime.onMessage.addListener((message) => {
  const video = document.querySelector("video");
  video.style.filter = `brightness(${message.brightness}%)`;
})

const observer = new MutationObserver((mutations) => {
  for (let mutation of mutations) {
    if (mutation.addedNodes[0] !== undefined && mutation.addedNodes[0].classList.contains("PlayerControls--control-element")) {
      const playerControls = document.querySelector(".PlayerControls--control-element.text-control.video-title");
      playerControls.innerHTML = '<div><label for="slider" style="display: block;">Brightness (<output for="slider" id="nbce-current">100%</output>)</label><input type="range" name="brightness" id="nbce-slider" min="0.1" value="1" max="3" step="0.1"></div>';
      playerControls.classList.remove("hidden");

      const video = document.querySelector("video");
      const slider = document.querySelector("#nbce-slider");
      const output = document.querySelector("#nbce-current");

      slider.addEventListener("input", () => {
        const brightness = Math.floor(slider.value * 100);
        output.value = `${brightness}%`;
        video.style.filter = `brightness(${brightness}%)`;
      });
    }
  }
});

observer.observe(document.querySelector("#appMountPoint"), {
  childList: true,
  subtree: true
});