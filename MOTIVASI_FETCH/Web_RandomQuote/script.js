const playBtn = document.getElementById("RunQuote");
const outputWords = document.getElementById("word");
const outputAuthor = document.getElementById("Author");
const copyQuote = document.getElementById("GetQuote");
const nav = document.getElementById("Menu");
const saveBtn = document.getElementById("Save");
const parentsData = document.getElementById("ParentsData");
const dataMenu = document.getElementById("DataMenu");
const count_Save = document.getElementById("JumlahChild");
const parents_Saved = document.getElementById("Parents").children.length;
const parentsContainer = document.getElementById("Parents");
const closeMenu = document.getElementById("CloseMenu");
const DataResult = document.getElementById("DataResult");
const api = "https://dummyjson.com/quotes/random";

let dataUser = [
];

function checksizeData() {
  let totalChars = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    totalChars += value.length;
  }

  const totalKB = totalChars / 1024;
  const totalMB = totalKB / 1024;

  console.log(`LocalStorage:
    - ${totalChars} chars
    - ${totalKB.toFixed(2)} KB
    - ${totalMB.toFixed(2)} MB`);
}

const questionElement = document.getElementById("Question");
let all_deletBtn;
let buttons_Delet = 0;

function delet() {
  all_deletBtn.forEach((btn) => {
    btn.addEventListener("click", async function () {
      let containerDivs = btn.parentElement.parentElement;
      containerDivs.classList.remove("h-0");
      await delay(100);
      containerDivs.classList.add("opacity-0");
      await delay(500);
      containerDivs.remove();
      let jumlahData = parentsContainer.children.length;
      DataResult.textContent = jumlahData;
      localStorage.setItem("JumlahData", DataResult.textContent);
      localStorage.setItem("containerDiv", parentsContainer.innerHTML);
    });
  });
}

const maxLength = 140;
let onlyOnce = false;
let tryFetch = 0;
let dots = "";
// let i = 0;

let status_quote = false;
let status_menu = false;

let dataMotivateStorage = localStorage.getItem("Motivate");

if (dataMotivateStorage) {
}

let dataAuthorStorage = localStorage.getItem("Author");

if (dataAuthorStorage) {
}

let storage_JumlahData = localStorage.getItem("JumlahData") || 0;

if (storage_JumlahData) {
  DataResult.textContent = String(storage_JumlahData);
}

let storage_ContainerDiv = localStorage.getItem("containerDiv") || null;

if (storage_ContainerDiv !== null) {
  parentsContainer.innerHTML = storage_ContainerDiv;
  all_deletBtn = document.querySelectorAll("#DeletData");
}

let dataUsers = localStorage.getItem("dataUser") || null;

if(dataUsers !== null) {
  dataUser = JSON.parse(dataUsers);
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

playBtn.addEventListener("click", async function () {
  if (onlyOnce === false) {
    playBtn.disabled = true;
    playBtn.style.background = "grey";
    onlyOnce = true;
    for (let i = 0; i < 4; i++) {
      dots += ".";
      playBtn.innerHTML = "Wait" + dots;
      await delay(100);
    }
    await fetch(api)
      .then((result) => {
        if (!result.ok) {
          throw new Error(`ERROR HTTP CODE:${result.ok}`);
        }
        return result.json();
      })
      .then((data) => {
        let valueQuote = data.quote.length;
        while (valueQuote >= maxLength && tryFetch === 0) {
          if (tryFetch <= 5) {
            tryFetch++;
            outputWords.textContent = `"${data.quote}"`;
            outputAuthor.textContent = `— ${data.author}`;
          } else {
            tryFetch = 0;
            return;
          }
        }
        outputWords.textContent = `"${data.quote}"`;
        outputAuthor.textContent = `— ${data.author}`;
      })
      .catch((error) => console.log(error));
    dots = "";
    await delay(100);
    playBtn.innerHTML = `<i class='bx bx-play'></i> Play`;
    playBtn.disabled = false;
    playBtn.style.background = "#059669";
    onlyOnce = false;
  }
});

copyQuote.addEventListener("click", function () {
  const copySelect = outputWords.textContent;
  navigator.clipboard.writeText(`${copySelect}\n${outputAuthor.textContent}`);
});

saveBtn.addEventListener("click", async function () {
  if (status_quote !== true) {
    if (Number(DataResult.textContent) >= 500) {
      saveBtn.disabled = false;
      saveBtn.classList.add("text-sm");
      saveBtn.classList.remove("text-base");
      saveBtn.innerHTML = `<i class='bx  bx-form'></i> FULL STORAGE!!!`;
      await delay(550);
      saveBtn.classList.add("text-base");
      saveBtn.classList.remove("text-sm");
      saveBtn.innerHTML = `<i class='bx  bx-form'></i> Save Quote`;
      return;
    } else if (Number(DataResult.textContent) <= 500) {
      saveBtn.classList.add("text-base");
      saveBtn.classList.remove("text-sm");
      saveBtn.innerHTML = `<i class='bx  bx-form'></i> Save Quote`;
    }
    status_quote = true;
    let containerDiv = document.createElement("div");
    let judulSaveDataDiv = document.createElement("div");
    let paragphJudul = document.createElement("div");
    let Container_openBtnData = document.createElement("div");
    let openBtnData = document.createElement("button");
    let Container_deletBtnData = document.createElement("div");
    let deletBtnData = document.createElement("button");
    containerDiv.classList.add(
      "relative",
      "mb-6",
      "w-40",
      "h-25",
      "bg-gray-200",
      "rounded-sm",
      "transition-all",
      "duration-300",
    );
    containerDiv.setAttribute("id", "containerDiv");
    parentsContainer.appendChild(containerDiv);
    judulSaveDataDiv.classList.add("absolute", "top-1", "left-2");
    containerDiv.appendChild(judulSaveDataDiv);
    paragphJudul.classList.add("text-base", "font-medium");
    paragphJudul.textContent = outputAuthor.textContent + ":";
    judulSaveDataDiv.appendChild(paragphJudul);
    Container_openBtnData.classList.add("absolute", "left-2", "bottom-2");
    containerDiv.appendChild(Container_openBtnData);
    openBtnData.classList.add(
      "cursor-pointer",
      "w-16",
      "h-7",
      "text-center",
      "text-base",
      "bg-emerald-500",
      "text-white",
      "rounded-sm",
      "hover:bg-emerald-600",
    );
    openBtnData.textContent = "Open";
    openBtnData.setAttribute("id", "OpenData");
    Container_openBtnData.appendChild(openBtnData);
    Container_deletBtnData.classList.add("absolute", "right-4", "bottom-2");
    containerDiv.appendChild(Container_deletBtnData);
    deletBtnData.classList.add(
      "cursor-pointer",
      "w-16",
      "h-7",
      "text-center",
      "text-base",
      "bg-red-500",
      "text-white",
      "rounded-sm",
      "hover:bg-red-600",
    );
    deletBtnData.textContent = "Delet";
    deletBtnData.setAttribute("id", "DeletData");
    Container_deletBtnData.appendChild(deletBtnData);
    buttons_Delet += 1;
    let motivate = outputWords.textContent;
    let authorMotivate = outputAuthor.textContent;
    let jsondata_motivate = JSON.stringify(motivate);
    let jsondata_author = JSON.stringify(authorMotivate);
    localStorage.setItem("Motivate", jsondata_motivate);
    localStorage.setItem("Author", jsondata_author);
    let jumlahData = parentsContainer.children.length;
    let containerElement = parentsContainer.innerHTML;
    DataResult.textContent = jumlahData;
    localStorage.setItem("JumlahData", DataResult.textContent);
    localStorage.setItem("containerDiv", containerElement);
    await delay(250);
    saveBtn.innerHTML = `<i class='bx  bx-form'></i> Saved Quote`;
    all_deletBtn = document.querySelectorAll("#DeletData");
    dataUser.push({
      name: outputAuthor.textContent,
      word: outputWords.textContent
    });
    localStorage.setItem('dataUser', JSON.stringify(dataUser))
    await delay(300);
    delet();
    await delay(50);
    checksizeData();
  }
  if (status_quote !== false) {
    status_quote = false;
    await delay(500);
    saveBtn.innerHTML = `<i class='bx  bx-form'></i> Save Quote`;
    await delay(250);
  }
});

nav.addEventListener("click", function () {
  if (status_menu !== true) {
    status_menu = true;
    parentsData.classList.remove("opacity-0", "h-0");
    parentsData.classList.add("h-96");
  } else if (status_menu !== false) {
    status_menu = false;
    parentsData.classList.remove("h-96");
    parentsData.classList.add("opacity-0", "h-0");
  }
});

closeMenu.addEventListener("click", function () {
  status_menu = false;
  parentsData.classList.remove("h-96");
  parentsData.classList.add("opacity-0", "h-0");
});

if (!all_deletBtn) {
  console.warn("502");
} else if (all_deletBtn) {
  all_deletBtn.forEach((btn) => {
    btn.addEventListener("click", async function () {
      let containerDivs = btn.parentElement.parentElement;
      containerDivs.classList.remove("h-0");
      await delay(500);
      containerDivs.remove();
      let jumlahData = parentsContainer.children.length;
      DataResult.textContent = jumlahData;
      localStorage.setItem("JumlahData", DataResult.textContent);
      localStorage.setItem("containerDiv", parentsContainer.innerHTML);
      checksizeData();
    });
  });
}

dataMenu.addEventListener('click', function(button) {
  if(button.target && button.target.id === 'OpenData') {
    const card = button.target.parentElement.parentElement; 
    const index = Array.from(card.parentElement.children).indexOf(card);
    outputAuthor.textContent = dataUser[index].name
    outputWords.textContent = dataUser[index].word
  }
})