"use strict";

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});


signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});


const account_id = document.querySelector("#account_id"),
  name_str = document.querySelector("#name"),
  password = document.querySelector("#password"),
  confirmPassword = document.querySelector("#confirm_password"),
  emali = document.querySelector("#email"),
  profile_image = document.querySelector("#profile_image"),
  wallet_address = document.querySelector("#wallet_address"),
  registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
  if (!account_id.value) return alert("Please enter account ID.");
  if (password.value !== confirmPassword.value)
    return alert("Incorrect password.");

  const req = {
    account_id: account_id.value,
    name: name_str.value,
    password: password.value,
    email: emali.value,
    wallet_address: wallet_address.value
  };

  fetch("/profile", {
      method: "POST",
      body: new FormData(profile_image.file)
    });

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/login";
      } else {
        if (res.err) return alert(res.err);
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error("Error occurs on register");
    });
}
