"use strict";

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

// 노란색 오른쪽 덮어쓰기
signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

// 노란색 왼쪽 덮어쓰기
signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

const userId = document.querySelector("#signUp-id"),
    userName = document.querySelector("#signUp-name"),
    userPs = document.querySelector("#signUp-ps"),
    userConfirmPs = document.querySelector("#signUp-confirmPs"),
    profile_image = document.querySelector("#profile_image"),
    userAddress = document.querySelector("#signUp-address"),
    registerBtn = document.querySelector("#registerBtn");

registerBtn.addEventListener("click", register);

function register() {
    let userType = document.querySelector(
        'input[name="categorize"]:checked'
    ).value;

    if (!userId.value) return alert("Please enter account ID.");
    if (userPs.value !== userConfirmPs.value)
        return alert("Incorrect password.");

    const req = new FormData();

    req.append("user_id", userId.value);
    req.append("user_name", userName.value);
    req.append("user_password", userPs.value);
    req.append("user_address", userAddress.value);
    req.append("user_type", userType);
    req.append("profile", profile_image.files[0]);

    fetch("/signUp", {
        method: "POST",
        body: req,
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
            console.error("Error occurs on register");
        });
}

const loginId = document.querySelector("#signIn__id"),
    loginPs = document.querySelector("#signIn__ps"),
    loginBtn = document.querySelector("#loginBtn");

loginBtn.addEventListener("click", login);

function login() {
    if (!loginId.value) return alert("Please enter Account ID!");
    if (!loginPs.value) return alert("Please enter Password!");

    const req = {
        user_id: loginId.value,
        user_password: loginPs.value,
    };

    console.log(req);

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
                console.log(res);
                console.log(res.accessToken);
                location.href = "/logout";
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
