init();

// 최초 셋팅
function init() {
    // 각 태그의 이벤트 처리

    // 데이터를 가져오는 작업

    getUserList();
}

// 유저 전체목록 로드
function getUserList() {
    // 회원 데이터 전체조회
    fetch('http://192.168.0.11:8099/userList')
    .then(result => result.json())
    .then(result => {
        // 통신의 결과가 도착했음을 의미
        result.forEach(r => addTbody(r));   // 배열의 각 원소들마다 실행
    })
    .catch(error => console.log(error));
}

// 유저 1명 상세정보 로드
function findUserById(userId) {
    fetch('http://192.168.0.11:8099/userInfo?id=' + userId)
    .then(result => result.json())
    .then(result => {
        displayUserInfo(result);
    })
    .catch(error => console.log(error));
}

// 유저 정보 tr태그 추가
function addTbody(info) {
    let trTag = document.createElement('tr');
    trTag.addEventListener('click', function(event) {
        let selectId = event.currentTarget.children[1].textContent;
        findUserById(selectId);
    })

    for(let field of ['no', 'id', 'name', 'joinDate']) {
        let tdTag = document.createElement('td');
        tdTag.textContent = (field == 'joinDate') ? info[field].slice(0, 10) : info[field];
        trTag.append(tdTag);
    }

    let tbodyTag = document.querySelector('#list > tbody');
    tbodyTag.append(trTag);
}

// 유저 상세정보를 위에 폼에 표시
function displayUserInfo(info) {
    for(let key in info) {
        document.querySelector("[name='" + key + "']").value = (key == 'joinDate') ? info[key].slice(0, 10) : info[key];
    }
}