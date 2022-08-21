"use strict";

const { updateNFT } = require("../../../config/sql");

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

var art_id;
var mintArt;
var artList;
var web3;
var userAccount;
var myContract;

const cardLeftImgDiv = document.getElementsByClassName("left")[0];
const cardRightImgDiv1 = document.getElementById("rightArtist");
const cardRightImgDiv2 = document.getElementById("rightArt");

(async function init() {
    web3 = new Web3(Web3.givenProvider);
    const userAccounts = await web3.eth.requestAccounts();
    userAccount = userAccounts[0];
    console.log("Current User Account is", userAccount);

    getContract();
})();

function getArtId() {
    var url_string = window.location.href.toLocaleLowerCase();
    var url = new URL(url_string);
    art_id = url.searchParams.get("art_id");
}

async function getArt() {
    getArtId();
    try {
        var result = await axios({
            method: "post",
            url: "/getArt",
            data: {
                param: [art_id],
            },
        });

        mintArt = result.data[0];
    } catch (err) {
        console.log(err);
    }

    const artist_name = mintArt.user_name;
    console.log(artist_name);

    try {
        var result2 = await axios({
            method: "post",
            url: "/getSpecifiedArtList",
            data: {
                param: [artist_name],
            },
        });
        artList = result2.data;
    } catch (err) {
        console.log(err);
    }

    loadLeftArt(mintArt);
    loadRightArt(artList);
}

// 왼쪽 아트 및 오른쪽 아티스트 이미지와 글
function loadLeftArt(art) {
    let imagePath = art.art_image_path;
    let artistName = art.user_name;
    let artName = art.art_name;
    let artCreated_at = art.art_created_at;
    let artPrice = art.art_price;
    let artDescription = art.art_description;
    let artistImagePath = art.profile_image_path;
    let serialNumber = art.serial_number;
    let artistQuotes = art.artist_quotes;

    // 왼쪽 부분 아트 이미지
    let artInfo = `
      <div class="artInfo__cardImg">
      <img class="artInfo__img" src="/images/${imagePath}"} />
      </div>
      <!-- NFT Card 제목, 아티스트 이름, NFT 넘버 -->
      <div class="artInfo__textBox">
        <div class="artInfo__top">
          <div class="artInfo__title">
            <h2 class="nftText__title">${artName}</h2>
            <h3 style="margin-top:20px">${serialNumber}</h3>
            <h6 class="nftText__artist">Created by ${artistName}</h6>
          </div>
          <div class="artInfo__price">
            <span class="nftText__price">
              <i class="fab fa-ethereum fa-sm"></i>
              <!-- ETH 가격 -->
              ${artPrice}
            </span>
          </div>
        </div>
        <div class="artInfo__description">
          <h5>작품 설명</h5>
          <p class="nftText__description" style="margin-bottom:8px;">
            ${artDescription}
          </p>
          <p
          >${artCreated_at}</p>
        </div>
        <div class="artInfo__btn">
          <button class="nftText__btn" onclick="artInfo__donateBtn()">
            Donate
          </button>
        </div>
      </div>
    </div>`;
    cardLeftImgDiv.innerHTML = artInfo;

    // 오른쪽 부분 아티스트 프로필 이미지
    let artistInfo = `
    <div class="artistProfile">
        <div class="artistProfile__imgs">
            <img class="artistProfile__img" src="/images/${artistImagePath}" alt="" />
        </div>
        <div class="artistProfile__info">
            <h4 class="artistProfile__name">${artistName}</h4>
            <p>
            ${artistQuotes}
            </p>
        </div>
    </div>`;
    cardRightImgDiv1.innerHTML = artistInfo;
}

function loadRightArt(artList) {
    // console.log(artList);

    var h = [];
    h.push(
        `<div class="artist__nftList">
            <span class="artist__nftListTitle"> 아티스트가 발행가능한 NFT </span>
         </div>
         `
    );
    h.push(
        `<div class="artist__nftCardsList">
            <div id="box">
    `
    );
    // 오른쪽 부분 카드리스트
    for (var art of artList) {
        h.push(`
        <div class="card test2">
            <div class="thumb">
                <img
                    class="artInfo__img2"
                    src="/images/${art.art_image_path}"
                />
            </div>
            <div class="infos">
                <h2 class="title">${art.art_name}</h2>
                <h3 class="composition">
                    <span class="color"></span>
                </h3>
                <h3 class="type">${art.art_created_at}</h3>
                <h4 class="price">${art.art_price}</h4>
                <h4 class="code"></h4>
                <p class="txt">${art.art_description}</p>
                <a href="/artInfo?art_id=${art.art_id}">
                    <h3 class="details">view details</h3>
                </a>
            </div>
        </div>
    `);
    }

    h.push(
        `</div>
        </div>
        `
    );
    cardRightImgDiv2.innerHTML = h.join("");
}

// 사용자 지갑을 확인 후 결제창
function artInfo__donateBtn() {
    if (userAccount) {
        console.log("donate!");
        // getMetaData();
        // getTokenURI();

        var ipfs_data_path = "QmRkHFhuaxtueYhMiyLzs3uFXhxEY9SoNESSEMzpPWGArA";
        // console.log(mintArt.ipfs_data_path);
        mint(userAccount, ipfs_data_path);
        updateNFT();
    } else {
        alert("Metamask connect first!");

        web3.eth.requestAccounts().then((accounts) => {
            userAccount = accounts[0];
            console.log("Login Address is :", userAccount);
        });
    }
}

// init function 1
function getContract() {
    myContract = new web3.eth.Contract(ArtIPFSTokenABI, ArtIPFSTokenCA);
    console.log("myContract Contract Connected!", myContract);

    myContract.events
        .allEvents({}, function (error, event) {
            console.log("Now on, Watching NewArt event in my contract!");
            if (!error) console.log("event", event);
        })
        .on("data", function (event) {
            console.log(event);
            updateArt();
            location.href = `ownedNft?user_address=${userAccount}`;
        });

    console.log("Now on, Watching NewArt event in my contract!");
}

async function getMetaData() {
    var tokenName = await myContract.methods.name().call();
    var tokenSymbol = await myContract.methods.symbol().call();
    var tokenSupply = await myContract.methods.totalSupply().call();
    console.log(
        `tokenName is ${tokenName} \r
         tokenSymbol is ${tokenSymbol} \r 
         currentSupply is ${tokenSupply}
         `
    );
}

async function getTokenURI(_tokenId) {
    var _tokenId = 1;

    var tokenURI = await myContract.methods.tokenURI(_tokenId).call();
    console.log(tokenURI);
}

function mint(_to, _ipfsHash) {
    console.log("Use mint function!");

    alert(`token owner account is ${_to}`);
    alert(`token ipfs address is ${_ipfsHash}`);

    myContract.methods
        .mint(_to, _ipfsHash)
        .send({ from: userAccount })
        .on("transactionHash", function (hash) {
            console.log(hash);
        })
        .on("receipt", function (receipt) {
            console.log(receipt);
        })
        .on("error", function (error, receipt) {
            console.log(error, receipt);
        });
}

// 결제 완료 후 "나의 NFT 확인" 버튼 등장
// const artInfoModal = document.querySelector(".artInfoModal");
// const artInfoBtn = document.querySelector(".artInfoModal__btn");

// artInfoBtn.addEventListener ("" {
//   modal.style.display="block";
// })

function updateNFT() {
    axios({
        method: "post",
        url: "/updateNFT",
    }).then((res) => {
        console.log(res);
    });
}
