"use strict";
/*
FALTA:
[YA] 1. Crear todos los DOM ELements
[YA] 2. Mostrar modal windows al presionar el botón "+"
[YA] 3. Ocultar modal windows al presionar el botón "v"
[YA] 4. Crear función para generar el cri object
[YA] 5. Crear función para mostrar el contenido de cada cri object
6. Agregar un "autofocus" a los textareas de los Modal Windows
7. Aplicar Event Delegation al código actual [crear una segunda versión con este método]
[YA] 8. Agregar función cargar Pregunta /Respuesta 
[YA] 9. Agregar función cargar Creencia racional
[YA] 10. Estilizar los textos de los inputs
[YA] 11. Diseñar los "Info Modals"
[YA] 12. Mostrar ayudas al hacer hover a un "info-icon"

OBSERVACIONES (PARA AGREGAR):
1. Cambiar el input (D) a un input="text" para que sea mucho más agil cargar las Q/A
2. Hacer que el punto 1 sea siempre visible  una vez que se hace "click" en el botón (para no estar abriendo cada vez que se quiere agregar una nueva pregunta)
3. Hacer que no se borre al recargar la página (ver sección 15 Jonas)
4. Probar agregar un <div> como continer de los "info-icons" para hacer que el hover no sea "intermitente"
*/

// DOM Elements
const btnOpenModalCri = document.querySelector(".btn-icon--cri");
const btnOpenModalD = document.querySelector(".btn-icon--d");
const btnOpenModalCrr = document.querySelector(".btn-icon--crr");

const modalCri = document.querySelector(".modal-container--cri");
const modalD = document.querySelector(".modal-container--d");
const modalCrr = document.querySelector(".modal-container--crr");

const btnCloseModalCri = document.querySelector(".btn-icon-close-modal--cri");
const btnCloseModalD = document.querySelector(".btn-icon-close-modal--d");
const btnCloseModalCrr = document.querySelector(".btn-icon-close-modal--crr");

const btnAddCri = document.querySelector(".btn-icon-modal--cri");
const btnAddD = document.querySelector(".btn-icon-modal--d");
const btnAddCrr = document.querySelector(".btn-icon-modal--crr");

const textAreaCri = document.querySelector(".modal-input--cri");
const textAreaD = document.querySelector(".modal-input--d");
const textAreaCrr = document.querySelector(".modal-input--crr");

const criBox = document.querySelector(".box--irrational-beliefs");
const dBox = document.querySelector(".box--question-answer");
const crrBox = document.querySelector(".box--rational-beliefs");

const mainParentInfo = document.querySelector(".main-container");

/* ================== VARIABLES ================== */
let cri = -1; // cuenta la cantidad de cri objs
const criArray = []; // Contiene todos los Cri Objs
let currCriIndex = 0; // Contiene el Cri sobre el que se está trabajando (OBS: usar un data-cri="#" en la otra versión con Event Delegation)

/* ================== FUNCTIONS ================== */

// -------------------- UPDATE UI --------------------
const updateUI = function (index) {
  // Update currCriIndex
  currCriIndex = index;

  // Update Cri box
  criBox.innerHTML = "";
  for (const [i, belief] of criArray.entries()) {
    const currCri = document.createElement("div");
    const number = i + 1;
    currCri.textContent = `${number}- ${belief.text}`;
    currCri.classList.add(
      "box-item",
      "box-item--cri",
      `box-item-cri--${number}`
    );
    criBox.append(currCri);
  }

  const focusCri = document.querySelector(`.box-item-cri--${index + 1}`);
  focusCri.style.setProperty("background-color", "rgb(110, 110, 110)");

  // Update D box
  dBox.innerHTML = "";
  for (const [i, textQA] of criArray[currCriIndex].d.entries()) {
    const currD = document.createElement("div");
    currD.textContent = `${i % 2 === 0 ? "Preg" : "Resp"}:  ${textQA}`;
    currD.classList.add(
      "box-item",
      i % 2 === 0 ? "box-item--question" : "box-item--answer"
    );
    dBox.append(currD);
  }

  // Update Crr box
  crrBox.innerHTML = "";
  if (criArray[currCriIndex].crr === "") return;
  const currCrr = document.createElement("div");
  currCrr.textContent = criArray[currCriIndex].crr;
  currCrr.classList.add("box-item", "box-item--crr");
  crrBox.append(currCrr);
};

// -------------------- ADD NEW CRI (OBJ) --------------------
const addCri = function (newCri) {
  cri++; //count new cri obj
  //Create Obj
  const criObj = {
    num: cri,
    text: newCri,
    d: [], //par: pregunta, impar: respuesta
    crr: "",
  };
  criArray.push(criObj);

  updateUI(cri);
};

// -------------------- ADD NEW QUESTION/ANSWER --------------------
const addD = function (newQA) {
  if (criArray.length === 0) {
    alert("Introduzca primero un Cri");
    return;
  }
  criArray[currCriIndex].d.push(newQA);
  updateUI(currCriIndex);
};

// -------------------- ADD NEW CRR --------------------
const addCrr = function (newCrr) {
  if (criArray.length === 0) {
    alert("Introduzca primero un Cri");
    return;
  }
  criArray[currCriIndex].crr = newCrr;
  updateUI(currCriIndex);
};

// ================== EVENT LISTENERS ==================
/* --------------- A ---------------*/
// AUTOFOCUS WHEN PAGE FINISH LOAD
window.addEventListener("load", function () {
  document.querySelector(".a-input").focus();
});

/* --------------- CRI ---------------*/
// OPEN MODAL
btnOpenModalCri.addEventListener("click", function (event) {
  event.preventDefault();
  modalCri.classList.toggle("hidden");
  document.querySelector(".modal-input--cri").focus();
  textAreaCri.value = "";

  // Reduce height to view the last item in the box
  criBox.style.setProperty("height", "calc(70vh - 90px)");
  criBox.style.setProperty("margin-bottom", "10.2rem");
});

// CLOSE MODAL (2 methods)
btnCloseModalCri.addEventListener("click", function (event) {
  event.preventDefault();
  modalCri.classList.toggle("hidden");

  // Return box height to its initial value
  criBox.style.setProperty("height", "70vh");
  criBox.style.setProperty("margin-bottom", "1.2rem");
});

// ADD NEW CRI (2 methods)
const addNewCri = function () {
  const newCri = textAreaCri.value;
  if (newCri !== "") addCri(newCri);
  textAreaCri.value = "";
  document.querySelector(".modal-input--cri").focus();
};

// 1. Using the "+" btn
btnAddCri.addEventListener("click", function (event) {
  event.preventDefault();
  addNewCri();
});

// 2. Pressing "enter" in the input field
textAreaCri.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewCri();
  }
});

// SELECT EACH CRI OBJ TO SHOW DATA
criBox.addEventListener("click", function (event) {
  const clicked = event.target.closest(".box-item--cri");
  if (!clicked) return;
  const criNum = +clicked.textContent[0] - 1;
  updateUI(criNum);
});

/* --------------- D ---------------*/
// OPEN MODAL
btnOpenModalD.addEventListener("click", function (event) {
  event.preventDefault();
  modalD.classList.toggle("hidden");
  document.querySelector(".modal-input--d").focus();
  // textAreaD.value = "";

  // Reduce height to view the last item in the box
  dBox.style.setProperty("height", "calc(70vh - 90px)");
  dBox.style.setProperty("margin-bottom", "10.2rem");
});

// CLOSE MODAL
btnCloseModalD.addEventListener("click", function (event) {
  event.preventDefault();
  modalD.classList.toggle("hidden");

  // Return box height to its initial value
  dBox.style.setProperty("height", "70vh");
  dBox.style.setProperty("margin-bottom", "1.2rem");
});

// ADD NEW QUESTION/ANSWER (2 methods)
const addNewQA = function () {
  const newQA = textAreaD.value;
  if (newQA !== "") addD(newQA);
  textAreaD.value = "";
  document.querySelector(".modal-input--d").focus();
};

// 1. Using the "+" btn
btnAddD.addEventListener("click", function (event) {
  event.preventDefault();
  addNewQA();
});

// 2. Pressing "enter" in the input field
textAreaD.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewQA();
  }
});
/* --------------- CRR ---------------*/
// OPEN MODAL
btnOpenModalCrr.addEventListener("click", function (event) {
  event.preventDefault();
  modalCrr.classList.toggle("hidden");
  document.querySelector(".modal-input--crr").focus();

  // Reduce height to view the last item in the box
  crrBox.style.setProperty("height", "calc(70vh - 90px)");
  crrBox.style.setProperty("margin-bottom", "10.2rem");
});

// CLOSE MODAL
const closeModalCrr = function () {
  modalCrr.classList.toggle("hidden");

  // Return box height to its initial value
  crrBox.style.setProperty("height", "70vh");
  crrBox.style.setProperty("margin-bottom", "1.2rem");
};

btnCloseModalCrr.addEventListener("click", function (event) {
  event.preventDefault();
  closeModalCrr();
});

// ADD NEW CRR OR REPLACE CURRENT CRR (2 methods)
const addNewCrr = function () {
  const newCrr = textAreaCrr.value;
  if (newCrr !== "") addCrr(newCrr);
  textAreaCrr.value = "";
  document.querySelector(".modal-input--crr");
  modalCrr.classList.toggle("hidden");
  closeModalCrr();
};

// 1. Using the "+" btn
btnAddCrr.addEventListener("click", function (event) {
  event.preventDefault();
  addNewCrr();
});

// 2. Pressing "enter" in the input field
textAreaCrr.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addNewCrr();
  }
});

/* --------------- SHOW INFO WHILE HOVER ---------------*/
const transformHover = function (info) {
  const infoModal = document.querySelector(`.modal-info--${info}`);
  infoModal.classList.toggle("hidden");
};

// OBS: se usa un event delegation
// mainParentInfo.addEventListener("click", function (event) {
//   event.preventDefault();
//   const hovered = event.target;
//   if (
//     !hovered.classList.contains("info-icon") ||
//     !hovered.classList.contains("info-btn")
//   )
//     return;
//   transformHover(hovered.dataset.infoType);
// });

mainParentInfo.addEventListener("click", function (event) {
  const hovered = event.target;
  if (!hovered.classList.contains("info-icon")) return;
  transformHover(hovered.dataset.infoType);
});
