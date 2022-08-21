const {
    ArtIPFSTokenCA,
    ArtIPFSTokenABI,
} = require("../../contracts/ArtIPFSToken.js");
console.log(ArtIPFSTokenCA);
// let provider;

// async function login() {
//     // console.log("Donate Application Binary Interface is ", donateABI);
//     // console.log("Donate Contract Address is ", donateCA);

//     if (window.ethereum) {
//         web3 = new Web3(window.ethereum);
//         try {
//             // connect
//             // await getContract();
//             // await getTotalGivers();
//             // await loadGiverList();
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     // Legacy dapp browsers...
//     else if (window.web3) {
//         // Use Mist/MetaMask's provider.
//         web3 = window.web3;
//         console.log("Injected web3 detected.");
//     }
// }

// 사용자 지갑에 연결합니다.
async function connectWallet() {
    console.log("Use connectWallet function!");

    // Request account access if needed
    console.log(await window.ethereum.enable());

    // get balacne in connected account
    web3.eth.getAccounts().then(function (accounts) {
        account = accounts[0];
        console.log("Login Address is :", account);

        web3.eth.getBalance(account).then(function (balance) {
            // parse & convert balacne
            var sBalance = web3.utils
                .fromWei(String(balance), "ether")
                .slice(0, 8);
            console.log(sBalance);

            var item = document.getElementById("btn_connectwallet");
            item.innerText = "Connected";
            item.classList.add("disabled");

            // document.getElementById("input_mybalacne").innerHTML =
            //     `<h3> Your Current Balane is ${balance} ether !<h3>`;
        });
    });
}
