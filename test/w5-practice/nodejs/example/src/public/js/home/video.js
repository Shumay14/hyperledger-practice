// 1. .wall-grid-items에다가
// grid-item-com을 넣어야된다.
// 근데, 바뀌는게,  관련 액자의 사진, 타이틀, 가격이잖아?
// 그래서 안의 데이터들을 넣어줘야된다.

// const canvas = documnet.querySelector(".canvas");
(function () {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d");
    // ctx.font = "bold 50px serif";
    ctx.font = " bold 100px Permanent Marker";
    ctx.fillStyle = "black";

    const videoElem = document.querySelector(".video");
    videoElem.addEventListener("canplaythrough", render);

    const messages = [
        { time: 1, message: "Art, ", x: 200, y: 150 },
        { time: 3, message: "landscape!", x: 200, y: 250 },
    ];

    function render() {
        // console.log(videoElem.currentTime);
        ctx.drawImage(videoElem, 0, 0, 1200, 900);

        for (let i = 0; i < messages.length; i++) {
            if (videoElem.currentTime > messages[i].time) {
                ctx.fillText(messages[i].message, messages[i].x, messages[i].y);
            }
        }

        requestAnimationFrame(render);
    }
})();
