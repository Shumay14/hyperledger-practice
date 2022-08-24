// 버튼클릭시
// ID와 PASSWORD를 가져와서 /admin POST를 요청 -> Response를 화면에 출력
$("#gen-btn").click(() => {
  const id = $("#adminid").val();
  const password = $("#adminpw").val();

  console.log(id, password);

  $.post("/admin", { id, password }, (data, status) => {
    console.log(status);

    $("#result").empty();
    const res = JSON.stringify(data);
    $("#result").append(res);
  });
});
