"use strict";
/*
FALTA:
1. Crear todos los DOM ELements
2. Mostrar modal windows al presionar el botón "+"
3. 

*/

// DOM Elements
const btnAddCri = document.querySelector(".btn-icon--cri");
const btnAddD = document.querySelector(".btn-icon--d");
const btnAddCrr = document.querySelector(".btn-icon--crr");

const modalCri = document.querySelector(".modal-container--cri");
const modalD = document.querySelector(".modal-container--d");
const modalCrr = document.querySelector(".modal-container--crr");

const closeCri = document.querySelector(".btn-icon-close-modal--cri");
const closeD = document.querySelector(".btn-icon-close-modal--d");
const closeCrr = document.querySelector(".btn-icon-close-modal--crr");

// EVENT LISTENERS

/* --------------- CRI ---------------*/
// OPEN MODAL
btnAddCri.addEventListener("click", function (event) {
  event.preventDefault();
  modalCri.classList.toggle("hidden");
});

// CLOSE MODAL
closeCri.addEventListener("click", function (event) {
  event.preventDefault();
  modalCri.classList.toggle("hidden");
});

/* --------------- D ---------------*/
// OPEN MODAL
btnAddD.addEventListener("click", function (event) {
  event.preventDefault();
  modalD.classList.toggle("hidden");
});

// CLOSE MODAL
closeD.addEventListener("click", function (event) {
  event.preventDefault();
  modalD.classList.toggle("hidden");
});

/* --------------- CRR ---------------*/
// OPEN MODAL
btnAddCrr.addEventListener("click", function (event) {
  event.preventDefault();
  modalCrr.classList.toggle("hidden");
});

// CLOSE MODAL
closeCrr.addEventListener("click", function (event) {
  event.preventDefault();
  modalCrr.classList.toggle("hidden");
});
