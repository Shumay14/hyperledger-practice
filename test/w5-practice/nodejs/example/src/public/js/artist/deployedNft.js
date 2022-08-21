var data = [
  {
    artist_id: "0",
    artist_name: "eunkyung",
    artist_image: "./img/artist.jpg",
    art_num: "10",
    art_image: "./img/NFT13.jpg",
    art_name: "smile",
    art_info: "first eunkyung art",
    art_update: "2021-09-14",
    art_price: "10eth",
  },
  {
    artist_id: "1",
    artist_name: "heekyung",
    artist_image: "./img/artist.jpg",
    art_num: "11",
    art_image: "./img/NFT1.jpg",
    art_name: "happy",
    art_info: "first heekyung art",
    art_update: "2021-09-15",
    art_price: "10eth",
  },
  {
    artist_id: "2",
    artist_name: "jangyeon",
    artist_image: "./img/artist.jpg",
    art_num: "12",
    art_image: "./img/NFT2.jpg",
    art_name: "good",
    art_info: "first jangyeon art",
    art_update: "2021-09-16",
    art_price: "10eth",
  },
  {
    artist_id: "3",
    artist_name: "jeongseup",
    artist_image: "./img/artist.jpg",
    art_num: "13",
    art_image: "./img/NFT3.jpg",
    art_name: "nice",
    art_info: "first jeongseup art",
    art_update: "2021-09-17",
    art_price: "10eth",
  },
];

let deployedInfoList = "";
for (let i = 0; i < data.length; i++) {
  artistId = data[i].artist_id;
  artistName = data[i].artist_name;
  artistImage = data[i].artist_image;
  nftNum = data[i].art_num;
  artImg = data[i].art_image;
  artName = data[i].art_name;
  artInfo = data[i].art_info;
  artDate = data[i].art_update;
  artPrice = data[i].art_price;

  deployedInfoList += ` <ul class="account__ownedNftList">
  <li class="account__ownedNftRow">
    <img class="account__ownedNft" src="${artImg}" />
    <div class="account__top">
      <div class="account__title">
        <h2 class="account__nftTitle">${artName}</h2>
        <h3 class="account__number">${nftNum}</h3>
        <h6 class="account__artist">Created by ${artistName}</h6>
      </div>
      <div class="account__price">
        <span class="account__price"
          ><i class="fab fa-ethereum fa-sm"></i>${artPrice}</span
        >
      </div>
    </div>
  </li>
 
  <li class="account__ownedNftRow">
  <img class="account__ownedNft" src="${artImg}" />
  <div class="account__top">
    <div class="account__title">
      <h2 class="account__nftTitle">${artName}</h2>
      <h3 class="account__number">${nftNum}</h3>
      <h6 class="account__artist">Created by ${artistName}</h6>
    </div>
    <div class="account__price">
      <span class="account__price"
        ><i class="fab fa-ethereum fa-sm"></i>${artPrice}</span
      >
    </div>
  </div>
</li>
<li class="account__ownedNftRow">
<img class="account__ownedNft" src="${artImg}" />
<div class="account__top">
  <div class="account__title">
    <h2 class="account__nftTitle">${artName}</h2>
    <h3 class="account__number">${nftNum}</h3>
    <h6 class="account__artist">Created by ${artistName}</h6>
  </div>
  <div class="account__price">
    <span class="account__price"
      ><i class="fab fa-ethereum fa-sm"></i>${artPrice}</span
    >
  </div>
</div>
</li>
<li class="account__ownedNftRow">
<img class="account__ownedNft" src="${artImg}" />
<div class="account__top">
  <div class="account__title">
    <h2 class="account__nftTitle">${artName}</h2>
    <h3 class="account__number">${nftNum}</h3>
    <h6 class="account__artist">Created by ${artistName}</h6>
  </div>
  <div class="account__price">
    <span class="account__price"
      ><i class="fab fa-ethereum fa-sm"></i>${artPrice}</span
    >
  </div>
</div>
</li>
  </ul>
  `;
}

document.querySelector(".account__nftCardsList").innerHTML = deployedInfoList;


