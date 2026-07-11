// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAE2VcJyqu01rtqlgVoMg634FFfTGxiRgc",
  authDomain: "brain-orcamento.firebaseapp.com",
  projectId: "brain-orcamento",
  storageBucket: "brain-orcamento.firebasestorage.app",
  messagingSenderId: "991853359315",
  appId: "1:991853359315:web:b2270aab447a853b212426"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;
window.query = query;
window.where = where;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;
window.doc = doc;

console.log("✅ Firebase conectado!");
