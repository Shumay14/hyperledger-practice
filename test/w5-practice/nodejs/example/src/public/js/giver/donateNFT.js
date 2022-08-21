// All NFTs 페이지
"use strict";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

let artList = [];

// DB에서 아트리스트 불러오기
function getArtList() {
    axios({
        method: "post",
        url: "/getArtList",
    })
        .catch((e) => {
            console.log("catch");
            console.log(e);
            // s;
        })
        .then(function (res) {
            // console.log("res");
            artList = res.data;
            console.table(artList);
            // 불러온 아트리스트 그리기
            loadArtList(artList);
        });
}

// 아트리스트 그리기
function loadArtList(artList) {
    let artSelectList = "";

    for (let i = 0; i < artList.length; i++) {
        let art_id = artList[i].art_id;
        let user_name = artList[i].user_name;
        let art_name = artList[i].art_name;
        let art_created_at = artList[i].art_created_at;
        let art_price = artList[i].art_price;
        let art_image_path = artList[i].art_image_path;
        let art_description = artList[i].art_description;
        let artist_img = artList[i].profile_image_path;

        artSelectList += `

        <article id="${art_id}" onclick="linkClickEvent(this.id);">
        <img class="nftImgs" src="/images/${art_image_path}"} />
        <div class="text">
          <h3 class="nftText nftText__title" id="nftName">${art_name}</h3>
          <div class="donate__price">price</div>
          <div class="donate__eth">
              <h3 id="nftPrice">
                  <i class="fab fa-ethereum fa-sm"></i>
                  ${art_price}
              </h3>
          </div>
          <p class="nftText__description" id="nftDescribe">
          ${art_description}
          </p>
        </div>
          <div class="container__profile">
            <img class="artist__img"
             src="/images/${artist_img}"
            />
            <div class="container__profile__text">
             <p class="nftText nftText__id" id="nftCreatedBy">Created By ${user_name}</p>
             <h2 class="nftText nftText__date" id="nftDate">${art_created_at}</h2>
            </div>
        </div>
       </article>`;
    }
    document.querySelector(".grid").innerHTML = artSelectList;
    // addClickListener();
}

function linkClickEvent(element) {
    // console.log(element);
    location.href = `artInfo?art_id=${element}`;
}

// donate Platform 버튼 누르면 paymentPlatform.html로 이동
function donatePlatform() {
    location.href = "paymentPlatform";
}
