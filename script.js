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
  criArray[currCriIndex].d.push(newQA);
  updateUI(currCriIndex);
};

// -------------------- ADD NEW CRR --------------------
const addCrr = function (newCrr) {
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
});

// CLOSE MODAL
btnCloseModalCri.addEventListener("click", function (event) {
  event.preventDefault();
  modalCri.classList.toggle("hidden");
});

// ADD NEW CRI
btnAddCri.addEventListener("click", function (event) {
  event.preventDefault();
  const newCri = textAreaCri.value;
  if (newCri !== "") addCri(newCri);
  modalCri.classList.toggle("hidden");
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
  textAreaD.value = "";
});

// CLOSE MODAL
btnCloseModalD.addEventListener("click", function (event) {
  event.preventDefault();
  modalD.classList.toggle("hidden");
});

// ADD NEW QUESTION/ANSWER
btnAddD.addEventListener("click", function (event) {
  event.preventDefault();
  const newQA = textAreaD.value;
  if (newQA !== "") addD(newQA);
  modalD.classList.toggle("hidden");
});

/* --------------- CRR ---------------*/
// OPEN MODAL
btnOpenModalCrr.addEventListener("click", function (event) {
  event.preventDefault();
  modalCrr.classList.toggle("hidden");
  document.querySelector(".modal-input--crr").focus();
  textAreaCrr.value = "";
});

// CLOSE MODAL
btnCloseModalCrr.addEventListener("click", function (event) {
  event.preventDefault();
  modalCrr.classList.toggle("hidden");
});

// ADD NEW CRR
btnAddCrr.addEventListener("click", function (event) {
  event.preventDefault();
  const newCrr = textAreaCrr.value;
  if (newCrr !== "") addCrr(newCrr);
  modalCrr.classList.toggle("hidden");
});

/* --------------- SHOW INFO WHILE HOVER ---------------*/
const transformHover = function (info) {
  const infoModal = document.querySelector(`.modal-info--${info}`);
  infoModal.classList.toggle("hidden");
};

// OBS: se usa un event delegation
mainParentInfo.addEventListener("mouseover", function (event) {
  const hovered = event.target;
  if (!hovered.classList.contains("info-icon")) return;
  transformHover(hovered.dataset.infoType);
});

mainParentInfo.addEventListener("mouseout", function (event) {
  const hovered = event.target;
  if (!hovered.classList.contains("info-icon")) return;
  transformHover(hovered.dataset.infoType);
});
