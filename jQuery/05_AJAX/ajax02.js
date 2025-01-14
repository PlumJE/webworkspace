init();

// 최초 셋팅
function init() {
    // 각 태그의 이벤트 처리

    // 데이터 초기화
    getUserList();
}

function getUserList() {
    // 서버가 가지고 있는 회원 데이터 전체 조회
    // GET, http://192.168.0.11:8099/userList
    $.ajax('http://192.168.0.11:8099/userList')
    .done(result => {
        addBody(result);
    })
    .fail(error => console.log(error));
}

function addBody(list) {
    $.each(list, function(idx, info) {
        // <td/>들을 감쌀 <tr/>이 필요
        let trTag = $('<tr></tr>');

        // 필요한 <td/>를 생성
        // 1) 번호
        let tdTag = $('<td></td>');
        tdTag.text(info.no);
        trTag.append(tdTag);

        // 2) 아이디

        // 3) 이름

        // 4) 가입일자
        console.log(info);

        // 새로운 태그를 화면에 출력 => DOM에 추가 필요
        // console.log(trTag);
        $('#list tbody').append(trTag);
    })
}