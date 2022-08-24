// 버튼클릭시
// ID와 PASSWORD를 가져와서 /admin POST를 요청 -> Response를 화면에 출력
$("#gen-btn").click(() => {
  const id = $("#userid").val();
  const userrole = $("#userrole").val();

  console.log(id, userrole);

  $.post("/user", { id, userrole }, (data, status) => {
    console.log(status);

    $("#ttablebody").empty();
    $("#ttablebody").append(
      "<tr><td>result</td><td>" + data.result + "</td></tr>"
    );
    $("#ttablebody").append(
      "<tr><td>message</td><td>" + data.msg + "</td></tr>"
    );
    $("#ttable").attr("class", "table");
  });
});
