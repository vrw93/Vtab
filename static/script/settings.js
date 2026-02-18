const DB_NAME = "Vtab";
const DB_VERSION = 10;

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = function (e) {
      const db = e.target.result;

      if (!db.objectStoreNames.contains("videos")) {
        db.createObjectStore("videos");
        document.getElementById("status").innerText = "Saving!";
        console.log("STORE CREATED");
      }
    };

    request.onsuccess = function (e) {
      console.log("DB READY");
      resolve(e.target.result);
    };

    request.onerror = function (e) {
      reject(e);
    };
  });
}

document.getElementById("bgVideo").addEventListener("change", async function () {
  try {
    const file = this.files[0];
    if (!file) return;

    const db = await openDB();

    const tx = db.transaction("videos", "readwrite");
    const store = tx.objectStore("videos");

    store.put(file, "backgroundVideo");

    tx.oncomplete = () => document.getElementById("status").innerText = "Video Saved!\nPlease Reload The Page To See The Changes";;
    tx.onerror = (e) => console.error("TX error", e);

  } catch (err) {
    console.error("FULL ERROR:", err);
  }
});

