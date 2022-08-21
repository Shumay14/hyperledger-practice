function profile() {
    document
        .querySelector("#myFileInput")
        .addEventListener("change", function () {
            // console.log(this.files);
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                // console.log(reader.result);
                localStorage.setItem("recent-image", reader.result);
            });
            reader.readAsDataURL(this.files[0]);
        });

    document.addEventListener("DOMContentLoaded", () => {
        const recentImageDataUrl = localStorage.getItem("recent-image");
        if (recentImageDataUrl) {
            document
                .querySelector("#imgPreview")
                .setAttribute("src", recentImageDataUrl);
        }
    });
}

profile();

//button _ 변경사항저장
function submit() {
    let nickName = document.getElementById("nickName").value;
    let emailAddr = document.getElementById("emailAddr").value;
    console.log("nickName:" + nickName + "emailAddr:" + emailAddr);

    //순서에 맞게 넣고, 빼고를 하려고 사용하는것이다.
    var dataList = []; //배열 이 리스트이다. / 클래스는 객체

    var data = {
        nickName: nickName,
        emailAddr: emailAddr,
    };

    console.log(data);

    dataList.push(data);
    // dataList.push(data);
    // dataList.push(data);
    console.log("dataList :", dataList);
}

var UserInfo = [
    {
        user_id: "0",
        artist_name: "eunkyung",
        wallet_addr: "0x602289e292739x39372s",
        user_email: "ek@gmail.com",
    },
    {
        user_id: "1",
        artist_name: "heekyung",
        wallet_addr: "0x60239e292739x3922312s",
        user_email: "hk@gmail.com",
    },
    {
        user_id: "2",
        artist_name: "jangyeon",
        wallet_addr: "0x642289e291739x246572s",
        user_email: "jy@gmail.com",
    },
    {
        user_id: "3",
        artist_name: "jeongseup",
        wallet_addr: "0x602283e292e7539x39372s",
        user_email: "js@gmail.com",
    },
];

console.log(UserInfo[0].user_id);
console.log(UserInfo[0].artist_name);
console.log(UserInfo[0].wallet_addr);
console.log(UserInfo[0].user_email);

document.querySelector("#nickName").innerHTML = UserInfo[0].artist_name;
document.querySelector("#emailAddr").innerHTML = UserInfo[0].user_email;
