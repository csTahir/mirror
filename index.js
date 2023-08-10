let video = null;
let canvas = null;
let context = null;
let scalar = 0.8;
size = { x: 0, y: 0, width: 0, height: 0 };

async function main() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  try {
    let signal = await navigator.mediaDevices.getUserMedia({ video: true });

    video = document.createElement("video");
    video.srcObject = signal;
    video.play();
    video.onloadeddata = () => {
      handleResize();
      window.addEventListener("resize", handleResize);
      updateCanvas();
    };
  } catch (error) {
    alert(`camera errror ${error}`);
  }
}

function updateCanvas() {
  context.drawImage(video, 0, 0);
  window.requestAnimationFrame(
    updateCanvas,
    size.x,
    size.y,
    size.width,
    size.height
  );
}

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let resizer =
    scalar *
    Math.min(
      window.innerHeight / video.videoWidth,
      window.innerHeight / video.videoHeight
    );

  size.width = resizer * video.videoWidth;
  size.height = resizer * video.videoHeight;
  size.x = window.innerWidth / 2 - size.width / 2;
  size.y = window.innerHeight / 2 - size.height / 2;
}
