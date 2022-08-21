// randomize the drawingStuff on the page
let speed = [];
let position = [];
var web3;
var userAccount;

const loginLink = document.getElementById("loginLink");

// donate 버튼 누르면 donateNFT.html로 이동
function donateBtn() {
    console.log("donateBtn click");
    location.href = "donateNft";
}

//get all the drawingStuff divs
const drawingStuff = document.querySelectorAll(".drawingStuff");

for (let i = 0; i < drawingStuff.length; i++) {
    //set the position of the drawingStuff to a random location
    let height = Math.floor(Math.random() * window.innerHeight);
    let width = Math.random() * window.innerWidth;

    drawingStuff[i].style.top = `${height}px`;
    drawingStuff[i].style.left = `${width}px`;

    //push a random speed between 20 + 35 into the speed array to determine how fast the drawingStuff will fall
    speed.push(Math.ceil(Math.random() * 35) + 20);
    //push the drawingStuff current top value into the position array
    position.push(height);
}

// set the make it rain function...
function makeItRain() {
    // go through the drawingStuff array...
    for (let i = 0; i < drawingStuff.length; i++) {
        //set the drawingStuff position to the new position, which is it's current position plus the speed it is falling
        position[i] += speed[i];
        drawingStuff[i].style.top = `${position[i]}px`;

        //if the drawingStuff falls below the end of the screen, reset it and choose a new position
        if (position[i] > window.innerHeight + 50) {
            position[i] = -75;
            drawingStuff[i].style.left = `${
                Math.random() * window.innerWidth
            }px`;
        }
    }
}

//set the interval to re-reun the makeItRain function every 100ms
setInterval(makeItRain, 100);

const signs = document.querySelectorAll("x-sign");
const randomIn = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

const mixupInterval = (el) => {
    const ms = randomIn(2000, 4000);
    el.style.setProperty("--interval", `${ms}ms`);
};

signs.forEach((el) => {
    mixupInterval(el);
    el.addEventListener("webkitAnimationIteration", () => {
        mixupInterval(el);
    });
});

async function connectWallet() {
    web3 = new Web3(Web3.givenProvider);

    if (window.ethereum) {
        try {
            const userAccounts = await web3.eth.requestAccounts();
            userAccount = userAccounts[0];
            // if (userAccount != undefined) {
            //     console.log(userAccount);
            //     myProfile();

            //     axios({
            //         method: "post",
            //         url: "/login",
            //         data: {
            //             param: [userAccount],
            //         },
            //     }).then((res) => {
            //         var result = res.data[0];

            //         console.log(result);
            //         alert(`Hello, ${result.user_name}`);
            //         location.href = "/signUp";
            //     });
            // }
            // axios 로 디비에 유저정보 있는지 확인
            location.href = "signUp";
        } catch (error) {
            console.log(error);
            alert("Please, MetaMask Login First");
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        // Use Mist/MetaMask's provider.
        web3 = window.web3;

        console.log("Injected web3 detected.");
    }
}

function myProfile() {
    let n = `
    <li class="nav__item">
        <a class="nav__link" onclick="connectWallet();">
            My Profile
        </a>
    </li>
    `;
    loginLink.innerHTML = n;
}
