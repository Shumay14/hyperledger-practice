"use strict";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

let artList = [];

// DB에서 아트리스트 불러오기
function getArtList() {
    console.log("use axios");
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
            console.log("res");
            artList = res.data;
            console.table(artList);
            // 불러온 아트리스트 그리기
            loadArtLeft(artList);
            loadArtRight(artList);
        });
}

// modal test _ show
function viewF() {
    let openLink = document.querySelector(".open-link");
    console.log(openLink);
    openLink.style.display = "inline-block";
}

//test_remove
function removeF() {
    let openLink = document.querySelector(".open-link");
    openLink.style.display = "none";
}



function loadArtLeft(artList) {
    let artSelectList = "";

    for (let i = 0; i < 6; i++) {
        artSelectList += `<div class="grid-item-con">
          <div class="grid-item">
              <img src="/images/${artList[i].art_image_path}" alt="" />
              artist_name : ${artList[i].account_id}<br/>
              art_num : ${artList[i].art_id}<br/>
              art_name : ${artList[i].art_name}<br/>
              art_created_at : ${artList[i].art_created_at}<br/>
              art_price : ${artList[i].art_price}<br/>
              art_info : ${artList[i].art_description}<br/>
          </div>
          <button class="item-button-left" onclick="viewF()"> </button>
      </div>
      `;
    }

    document.querySelector(".wall-grid-items").innerHTML = artSelectList;
}

function loadArtRight(artList) {
    let artSelectList = "";
    console.log(artList);
    for (let i = 7; i < 12; i++) {
        artSelectList += `<div class="grid-item-con">
        <div class="grid-item">
            <img src="/images/${artList[i].art_image_path}" alt="" />
            artist_name : ${artList[i].account_id}<br/>
            art_num : ${artList[i].art_id}<br/>
            art_name : ${artList[i].art_name}<br/>
            art_created_at : ${artList[i].art_created_at}<br/>
            art_price : ${artList[i].art_price}<br/>
            art_info : ${artList[i].art_description}<br/>
        </div>
        <button class="item-button-right" onclick="viewF()"> </button>
    </div>
    `;
    }
    document.querySelector(".wall-grid-items2").innerHTML = artSelectList;
}

//전역변수는 전역공간에 정의가 되는 애들이라서, 누구나 접근할 수 있는 변수이기때문에
//나중에 충돌 가능성도 많기때문에 최대한 안쓰는것이 좋다.
//따라서 전역변수를 회피하기 가장 좋은 방법은,  즉시 실행함수 안에다가 넣는것이다. () () ;
(function () {
    //house를 이동시키기위해 가져온다.
    const stageElem = document.querySelector(".stage");
    const houseElem = document.querySelector(".house");
    const barElem = document.querySelector(".progress-bar");
    const mousePos = { x: 0, y: 0 };
    //스크롤바 전체 높이 body에 접근해야된다. 여기서 window의 높이 (현재 창 사이즈 )
    //즉, 현재문서 높이에서 창 높이를 빼준다. 따라서 전체 스크롤 할 수 있는 범위가 된다.
    let maxScrollValue; //초기값 0

    //(창의 크기가 바뀔때마다) resize가 될때마다 resizeHandler가 실행이 되면서, maxScrollValue가 새로 세팅이된다.
    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    //scroll이벤트를 발생시킨다.
    window.addEventListener("scroll", function () {
        //스크롤된 양에따라 움직여야하므로, 우리가 얼마나 스크롤을 했는지 수치화 할 수 있어야한다.
        //얼마나 스크롤을 했는지를 수치화 할 수 있어야한다  그 속성이바로 window객체의 pageYOffset 이며, px값이 찍힌다.
        //이 값을 이용하여, zoom in zoom out 처리를 해준다.

        //pageYOffset / maxScrollValue 이렇게만 쓰면 0~1 부터 작은 값이 출력이 되기때문에, *1000을 해준다.
        //그럼 0~1000이 된다. 그럼 멤시멈이 0부터 1이아닌, 0부터 1000이 된다 그리고 -490은 .house에있는 거리를
        //스크롤 했을때 바로 글씨 벽이 튀어나오지않게 하게끔 하기위해서이다.
        //스크롤 되는 양을 줄이기 위해서 즉, 맨 끝에 있는 벽의 공간을 주기위해 1000값을 980으로 조정했다.

        //console.log(pageYOffset / maxScrollValue); //비율로 나타냄 -> 이 비율을 이용해서 house조절
        const scrollPer = pageYOffset / maxScrollValue;
        const zMove = scrollPer * 980 - 490;
        // .gallery -> position: fixed; 를 해주어서 가운데로 보이는 것이 가능하다.
        houseElem.style.transform = "translateZ(" + zMove + "vw)";

        //progress bar 시작
        //전체 스크롤 할 수 있는 값 분의 현재스크롤 얼만큼 했는지 *100% 로 만들어준다.
        barElem.style.width = scrollPer * 100 + "%";
    });

    //마우스 현재 위치 알아내기
    window.addEventListener("mousemove", function (e) {
        //console.log(e.clientX, e.clientY);
        //가운데가 0 됐으니까, 비율대로 회전각도만 전해주면된다.
        //전체윈도우 폭 분에 현재 마우스의 X위치 에다가 비율 *2 한 값을 -1 해줬다
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        //전체윈도우 길이 분에 현재 마우스의 y위치 에다가 비율 *2 한 값을 +1 해줬다
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;

        //위의 계산한 값으로 활용하자.
        stageElem.style.transform =
            "rotateX(" +
            mousePos.y * 50 +
            "deg) rotateY(" +
            mousePos.x * 50 +
            "deg)";
    });

    // 윈도우 사이즈가 변경될 때 마다  maxScrollValue가 변경되게 해줄 필요가 있다.
    // 왜냐하면 사용자는 수시로 창 사이즈를 변경하는 경우가 허다하고, 모바일 기기같은 경우는
    // 회전을 할 수 있는 경우도있다. -> 따라서 이러한것을 다 대응해줘야한다.
    window.addEventListener("resize", resizeHandler);
    resizeHandler();
})();
