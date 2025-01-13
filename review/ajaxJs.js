init();

// 최초 셋팅
function init(){
    // 각 태그의 이벤트 처리
    document.getElementById('initBtn').addEventListener('click', function(event){
        // 입력태그 초기화 
        // 1) 입력태그를 검색: input, select
        let tage = document.querySelectorAll('input, select');
        tage.forEach(function(tag, index, array){ // 매개변수는 이름이 중요한게 아니라 위치가 중요
        //   console.log(tag, index, array);
        // 2) 입력태그의 value 속성을 지우는게 초기화
        tag.value = '';
        });
    });

    document.getElementById('insertBtn').addEventListener('click', addUserInfo); // 등록작업        

    document.getElementById('updateBtn').addEventListener('click', updateUserInfo); // 수정작업

    document.getElementById('delBtn').addEventListener('click', delteUserInfo); // 삭제작업
    
    // 데이터를 가져오는 작업 페치기반
    getUserList();
}

function getUserList(){
    // 회원 데이터 전체조회
    fetch('http://192.168.0.11:8099/userList')
    .then(response => response.json()) // response -리스판스 의 처리
    .then(result => {
        // 통신의 결과가 도착했음을 의미
        addTbody(result); // 1
    })
    .catch(err => console.log(err));
    console.log('end'); // 2 비동기 작업이라 먼저 콘솔이 실행됨
}
// for(let val of 배열){ } // 배열.forEach((val,idx) =>{}); 
function addTbody(list){
    // document.querySelector('#list tbody *').replaceChildren();
    document.querySelector('#list tbody').replaceChildren(); // 리플레이스 칠드런
    // console.log(list);
    for(let info of list){
        // <td/> 들을 감쌀 <tr/>이 필요
        let trTag = document.createElement('tr');
        trTag.addEventListener('click', function(event){
            let selectTr = event.currentTarget;
            let selectId = selectTr.children[1].textContent;
            findUserById(selectId);
        });

        // 번호
        let tdTag = document.createElement('td');
        tdTag.textContent = info.no; // info['no']
        trTag.append(tdTag);

        // 아이디
        tdTag = document.createElement('td');
        tdTag.textContent = info.id; // info['id']
        trTag.append(tdTag);

        // 이름
        tdTag = document.createElement('td');
        tdTag.textContent = info.name;
        trTag.append(tdTag);

        // 가입일자
        tdTag = document.createElement('td');
        tdTag.textContent = (info.joinDate).slice(0,10); // slice -슬라이스 숫자제한으로 잘라냄
        trTag.append(tdTag);

        // console.log(info.no, info.id, info.name, info.joinDate);
        // console.log(trTag);
        document.querySelector('#list tbody') // id속성 아래에 존재하는 t바디
                .append(trTag);

    }
}
// // 코드를 간결하게 한 방식 어려우면 넘겨도됨
// function addTbody(list){
//     let tbodyTag = document.querySelector('#list tbody');
//     list.forEach(info => {
//         let trTag = addTrTag(info);
//         tbodyTag.append(trTag);
//         // document.querySelector('#list tbody').append(trTag); 이거랑같음
//     })
// }

function addTrTag(info){
    let theads = [ 'no', 'id', 'name', 'joinDate', 'password', 'gender'];
    // console.log(info);
    let trTag = document.createElement('tr');
    for(let field of theads){
        let tdTag = document.createElement('td');
        tdTag.textContent = (field == 'joinDate') ? (info[field]).slice(0,10) : info[field]; // 대괄호 표기법 변수사용가능 삼항연산자 작업
        trTag.append(tdTag);
    }
    return trTag;
}


function findUserById(userId){
    // 회원정보 단건조회
    fetch(`http://192.168.0.11:8099/userInfo?id=${userId}`) // 페치사용 템플릿 문법 권장 ``
    .then(response => response.json())
    .then(result => {
        getUserInfo(result);
    })
    .catch(err => console.log(err));
}

function getUserInfo(user){ // 데이터를 가져오는 작업
    console.log(user);

    // document.querySelector('[name="no"]');
    // document.getElementsByName('no')[0].value = user.no;
    // document.getElementsByName('id')[0].value = user.id;
    // document.getElementsByName('password')[0].value = user.password;
    // document.getElementsByName('name')[0].value = user.name;
    // document.getElementsByName('gender')[0].value = user.gender;
    // document.getElementsByName('joinDate')[0].value = user.joinDate;

    for(let field in user){ // 위에거랑 같음 간략한 코드
        if(field == 'joinDate'){
        document.getElementsByName(field)[0].value = (user[field]).slice(0,10)
        }else{
        document.getElementsByName(field)[0].value = user[field];
        }
    }   
}

function addUserInfo(event){ // 새로운 회원을 등록
    // 1) 새로운 회원정보 확인
    let userInfo = formUserInfo();

    // 2) 서버에 전송 : AJAX
    fetch('http://192.168.0.11:8099/userInsert', {
        method : 'post', // 매서드를 포스트로 보내기
        // constent-type : application/x-www-form-utlencoded
        body : new URLSearchParams(userInfo) //
    })
    .then(response => response.json()) // AJAX 가 then 으로 서버에 보내고 데이터를 받아서 끝남
    .then(result => {
        console.log(result);
        // 3) 화면에 출력
        getUserList();
        // result에서 no 값을 확인해서 input에 출력
        document.getElementsByName('no')[0].value = result.no;
    })
    .catch(err => console.log(err));   
}

function formUserInfo(){
    // 입력태그들의 값을 가져옴
    // 1) 입력태그를 검색: input, select
    let tage = document.querySelectorAll('input, select');

    let obj = {};
    tage.forEach(function(tag, index, array){
        // 2) 입력태그의 value 속성 값 가져오기
        // console.log(tag.name, tag.value);
        obj[tag.name] = tag.value;
    });

    console.log('obj', obj);
    return obj;
}

function updateUserInfo(event){ // 회원정보를 수정
    // 1) 현재 사용자가 입력한 회원정보 확인
    let userInfo = formUserInfo();

    // 2) 서버 전송 : AJAX
    fetch('http://192.168.0.11:8099/userUpdate', {
        method : 'post',
        // content-type : appilcation/json
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(userInfo) // 제이슨은 생성 매서드가 없음
    })
    .then(response => response.json())
    .then(result => {
        // 3) 화면 출력
        getUserList(); // 비동기적으로 보여줌
    })
    .catch(err => console.log(err));

}

function delteUserInfo(event){ // 회원정보 삭제
    // 1) 삭제할 회원정보 확인
    // 1-1)
    let userInfo = formUserInfo(); // 둘다같음
    let userId = userInfo.id;

    userId = document.getElementsByName('id')[0].value;

    // 2) 서버 전송 : AJAX
    fetch(`http://192.168.0.11:8099/userDelete?id=${userId}`)
    .then(response => response.json())
    .then(result => {
        // 3) 삭제 출력
        getUserList(result);
    })
    .catch(err => console.log(err)); // 캐치는 아작스가 에러 발생시 동작하는 매서드
}
