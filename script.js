const callBtn = document.querySelector(".call-btn");
const hangupBtn = document.querySelector(".hangup-btn");
const musicEffect = document.querySelector(".loading");
const peer = new Peer(
  "" +
    Math.floor(Math.random() * 2 ** 18)
      .toString(36)
      .padStart(4, 0),
  {
    host: "192.168.1.23",
    debug: 1,
    port: 8000,
    path: "/myapp",
  }
);
window.peer = peer;
function getLocalStream() {
  navigator.mediaDevices
    .getUserMedia({ video: false, audio: true })
    .then((stream) => {
      console.log({ stream });
      window.localStream = stream; // A
    })
    .catch((err) => {
      console.log("u got an error:" + err);
    });
}
getLocalStream();

peer.on("open", function () {
  window.caststatus.textContent = `Your device ID is: ${peer.id}`;
});
function showCallContent() {
  window.caststatus.textContent = `Your device ID is: ${peer.id}`;
  musicEffect.classList.contains("hidden")
    ? null
    : musicEffect.classList.add("hidden");
  callBtn.hidden = false;
  hangupBtn.hidden = true;
  window.remoteAudio.srcObject = null;
  window.peerStream = null;
}
function showConnectedContent() {
  window.caststatus.textContent = `You're connected`;
  musicEffect.classList.remove("hidden");
  callBtn.hidden = true;
  hangupBtn.hidden = false;
  conn.on("close", showCallContent);
}
let code;
function getStreamCode() {
  code = window.prompt("Please enter the sharing code");
}

let conn;
function connectPeers() {
  conn = peer.connect(code);
}
peer.on("connection", function (connection) {
  conn = connection;
});

callBtn.addEventListener("click", function () {
  getStreamCode();
  connectPeers();
  const call = peer.call(code, window.localStream); // A
  call.on("stream", function (stream) {
    // B
    window.remoteAudio.srcObject = stream; // C
    window.remoteAudio.autoplay = true; // D
    window.peerStream = stream; //E
    showConnectedContent(); //F
  });
});
peer.on("call", function (call) {
  if (window.remoteAudio.srcObject) return;

  console.log({ call });
  const answerCall = confirm("Do you want to answer?"); // A
  if (answerCall) {
    call.answer(window.localStream); // B
    showConnectedContent(); // C
    call.on("stream", function (stream) {
      window.remoteAudio.srcObject = stream;
      window.remoteAudio.autoplay = true;
      window.peerStream = stream;
    });
    return;
  }
  call.close();
  console.log("call denied"); // E
});
hangupBtn.addEventListener("click", (e) => {
  console.log({ conn });
  conn.close();
  showCallContent();
});
