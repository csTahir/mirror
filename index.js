let video = null;
let canvas = null;
let context = null;

async function main() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  try {
    let signal = await navigator.mediaDevices.getUserMedia({ video: true });

    video = document.createElement("video");
    video.srcObject = signal;
    video.play();
    video.onloadeddata = () => updateCanvas();
  } catch (error) {
    alert(`camera errror ${error}`);
  }
}

function updateCanvas() {
  context.drawImage(video, 0, 0);
}
