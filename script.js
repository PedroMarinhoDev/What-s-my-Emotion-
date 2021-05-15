const video = document.getElementById("video");
const message = document.getElementById("message");
const x = document.getElementById("image");
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

var pop = document.querySelector(':root'); 


function watchingReaction() {

    console.log("watching...")

    pop.style.setProperty('--departure', '' + (Math.floor(Math.random() * (380 - (1) + 1)) + 1) - 150 +
        'px');

    var element = document.getElementById("watching-feedback");

    element.classList.toggle("transform-active");
    


}

function questioningReaction(){

    console.log("Questioning...")

    pop.style.setProperty('--departure', '' + (Math.floor(Math.random() * (380 - (1) + 1)) + 1) - 150 +
        'px');

    var element = document.getElementById("questioning-feedback");

    element.classList.toggle("transform-active");



}

function understandingReaction(){

    console.log("Understanding...")

    pop.style.setProperty('--departure', '' + (Math.floor(Math.random() * (380 - (1) + 1)) + 1) - 250 +
        'px');

    var element = document.getElementById("understanding-feedback");

    element.classList.toggle("transform-active");

}

function mindblownReaction() {

    console.log("Mindblown...")

    pop.style.setProperty('--departure', '' + (Math.floor(Math.random() * (380 - (1) + 1)) + 1) - 350 +
        'px');

    var element = document.getElementById("mindblown-feedback");

    element.classList.toggle("transform-active");

}

video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.body.append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    detections.map((detection) => {
      console.log(detection.expressions);
      if (detection.expressions.sad > 0.5) {
        questioningReaction()
      } else if (detection.expressions.happy > 0.5) {
        understandingReaction()
      } else if (detection.expressions.surprised > 0.5) {
        questioningReaction()
      } else if (detection.expressions.disgusted > 0.5) {
        understandingReaction()
      } else if (detection.expressions.fearful > 0.5) {
        questioningReaction()
      } else if (detection.expressions.angry > 0.5) {
        questioningReaction()
      } else {
        watchingReaction()      }
    });
  }, 1000);
});
