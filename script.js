"use strict";
/*
FALTA:
[YA] 1. Crear todos los DOM ELements
[YA] 2. Mostrar modal windows al presionar el botón "+"
[YA] 3. Ocultar modal windows al presionar el botón "v"
[YA]4. Crear función para generar el cri object
[YA]5. Crear función para mostrar el contenido de cada cri object
6. Agregar un "autofocus" a los textareas de los Modal Windows
7. Aplicar Event Delegation al código actual [crear una segunda versión con este método]
8. Agregar función cargar Pregunta /Respuesta 
9. Agregar función cargar Creencia racional
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

/* ================== VARIABLES ================== */
let cri = -1; // cuenta la cantidad de cri objs
const criArray = []; // Contiene todos los Cri Objs
let currCriIndex = 0; // Contiene el Cri sobre el que se está trabajando (OBS: usar un data-cri="#")

/* ================== FUNCTIONS ================== */

// --------------- ADD EVENT LISTENERS TO EACH CRI ---------------

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
  console.log(focusCri);
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
  const currCrr = document.createElement("div");
  currCrr.textContent = criArray[currCriIndex].crr;
  currCrr.classList.add("box-item", "box-item--crr");
  crrBox.append(currCrr);
};

// -------------------- ADD CRI OBJ --------------------
const addCri = function (newCri) {
  cri++; //count new cri obj
  //Create Obj
  const criObj = {
    num: cri,
    text: newCri,
    d: ["hola", "que", "tal", "mundo"], //par: pregunta, impar: respuesta
    crr: "Así no es",
  };

  criArray.push(criObj);
  console.log(criObj);

  updateUI(cri);
};

// ================== EVENT LISTENERS ==================

/* --------------- CRI ---------------*/
// OPEN MODAL
btnOpenModalCri.addEventListener("click", function (event) {
  event.preventDefault();
  modalCri.classList.toggle("hidden");
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
  const criText = textAreaCri.value;
  addCri(criText);
  modalCri.classList.toggle("hidden");
});

// SELECT EACH CRI OBJ TO SHOW DATA
criBox.addEventListener("click", function (event) {
  const clicked = event.target.closest(".box-item--cri");

  if (!clicked) return;

  const criNum = +clicked.textContent[0] - 1;
  console.log(criNum);

  updateUI(criNum);
});

/* --------------- D ---------------*/
// OPEN MODAL
btnOpenModalD.addEventListener("click", function (event) {
  event.preventDefault();
  modalD.classList.toggle("hidden");
  textAreaD.value = "";
});

// CLOSE MODAL
btnCloseModalD.addEventListener("click", function (event) {
  event.preventDefault();
  modalD.classList.toggle("hidden");
});

/* --------------- CRR ---------------*/
// OPEN MODAL
btnOpenModalCrr.addEventListener("click", function (event) {
  event.preventDefault();
  modalCrr.classList.toggle("hidden");
  textAreaCrr.value = "";
});

// CLOSE MODAL
btnCloseModalCrr.addEventListener("click", function (event) {
  event.preventDefault();
  modalCrr.classList.toggle("hidden");
});
