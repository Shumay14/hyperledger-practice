function imgPreview() {
    document.addEventListener("DOMContentLoaded", () => {
        const recentImageDataUrl = localStorage.getItem("recent-image");
        if (recentImageDataUrl) {
            document
                .querySelector("#imgPreview")
                .setAttribute("src", recentImageDataUrl);
        }
    });
}
imgPreview();

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

// getproUser_axios_test
// axios({
//     method: "get",
//     url: "https://ca6ec645-a4d6-4572-82a1-6768e39df010.mock.pstmn.io/getproUser",
//     responseType: "json",
// }).then(function (response) {
//     console.log(response.data);
//     console.log(response.data.Userdata[0].user_nickname);
// });

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

document.querySelector("#artist_name").innerHTML = UserInfo[0].artist_name;
document.querySelector("#wallet_addr").innerHTML = UserInfo[0].wallet_addr;
document.querySelector("#user_email").innerHTML = UserInfo[0].user_email;
