"use strict";

const account_id = document.querySelector("#account_id"),
  password = document.querySelector("#password"),
  loginBtn = document.querySelector("#button");
  // loginBtn2 = document.querySelector("#button2");

loginBtn.addEventListener("click", login);

function login() {
  if (!account_id.value) return alert("Please enter Account ID!");
  if (!password.value) return alert("Please enter Password!");
  
  const req = {
    account_id: account_id.value,
    password: password.value,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/";
      } else {
        if (res.err) return alert(res.err);
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error("Errors!");
    });
}

const home_ctrl = require("../../routes/home.ctrl");

loginBtn2.addEventListener("click", showProfile);

showProfile

function showProfile() {
  const Data = home_ctrl.output.login.img_path;

  console.log("login.js Data", Data);
  return Data;

  // fetch("/profile", {
  //   method: "POST",
  //   body: new FormData(Data.file)
  // })
  // .then((res) => res.json())
  // .then((res) => {
  //   if (res.success) {
  //     location.href = "/login";
  //   } else {
  //     if (res.err) return alert(res.err);
  //     alert(res.msg);
  //   }
  // })
  // .catch((err) => {
  //   console.error("Error occurs on register");
  // });

}

function getImage(imagePath) {
  const cardImgDiv = document.getElementsByClassName("artInfo__cardImg")[0];

  let imageHTML = `<img class="artInfo__img" src="/images/${imagePath}"} />`;

  cardImgDiv.innerHTML = imageHTML;
}

`<img class="artInfo__img" src="/images/${imagePath}"} />`;