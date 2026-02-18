//Date Clock Day
function updateClock(){
  const now = new Date();
    const timeString = now.toLocaleTimeString([], { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                });
  document.getElementById('clock').textContent = `- ${timeString} -`;
}
updateClock();
setInterval(updateClock, 1000);

function updateDay(){
    const day = new Date();
    const Days = day.toLocaleString('en-US', { weekday: 'long' });
    document.getElementById('day').textContent = Days.toUpperCase();
}

updateDay();

function updateDate(){
    const dates = new Date();
    const date = dates.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('dates').textContent = date;
}

updateDate();

//3D Effect

const card = document.querySelector(".date");

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

window.addEventListener("pointermove", (e) => {
  targetX = (e.clientX / innerWidth - 0.5) * 20;
  targetY = (e.clientY / innerHeight - 0.5) * -20;
});

function animate() {
  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  card.style.transform =
    `rotateY(${currentX}deg) rotateX(${currentY}deg)`;

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("pointermove", e => {
  const x = (e.clientX / innerWidth - .5) * 8;
  document.documentElement.style.setProperty("--cx", `${x}px`);
});

window.addEventListener("pointermove", e => {
  const x = (e.clientX / innerWidth - .5) * 8;
  document.documentElement.style.setProperty("--cx", `${x}px`);
});

//3D background
const video = document.querySelector("#bg");

let tx = 0, ty = 0;
let cx = 0, cy = 0;

window.addEventListener("pointermove", e => {
  tx = (e.clientX / innerWidth - 0.5) * -10;
  ty = (e.clientY / innerHeight - 0.5) * -10;
});

function animateBG() {
  cx += (tx - cx) * 0.08;
  cy += (ty - cy) * 0.08;

  video.style.transform = `translate(${cx}px, ${cy}px)`;

  requestAnimationFrame(animateBG);
}
animateBG();

//load settings
const request = indexedDB.open("Vtab", 10);

request.onupgradeneeded = function (e) {
      const db = e.target.result;

      if (!db.objectStoreNames.contains("videos")) {
        db.createObjectStore("videos");
        console.log("STORE CREATED");
        document.getElementById("bg").src = "/Wallpaper/columbina.webm";
      }
    };

request.onsuccess = function(e) {
  const db = e.target.result;
  console.log("Loading Settings");

  try{
    const tx = db.transaction("videos", "readonly");
    const store = tx.objectStore("videos");

    const getReq = store.get("backgroundVideo");

    try{
      getReq.onsuccess = function() {
        if (getReq.result) {
          const url = URL.createObjectURL(getReq.result);
          document.getElementById("bg").src = url;
          console.log("done");
        }
      };
    }catch{
      document.getElementById("bg").src = "/Wallpaper/columbina.webm";
    }
  }catch{
    document.getElementById("bg").src = "/Wallpaper/columbina.webm";
  }
};
