init();

function init() {
    // 초기 셋팅
    document.getElementById('init').addEventListener('click',function(event) {
        // 입력태그 초기화 버튼
        let tage = document.querySelectorAll('input, select');
        tage.forEach(function(tag, index, array) {
        // 입력태그 valut 밸류속성 초기화
            tag.value = '';
        });
    });

    document.getElementById('insert').addEventListener('click', addUserInfo);
    
    document.getElementById('update').addEventListener('click', updateUserInfo);
            
    document.getElementById('del').addEventListener('click', delteUserInfo);

    getUserList();
}

// 회원 데이터 전체조회
function getUserList(){
    fetch('http://192.168.0.11:8099/empList')
    .then(response => response.json())
    .then(result => {
        addTbody(result);
    })
    .catch(err => console.log(err));
    console.log('end');
}

function addTbody(list){
    document.querySelector('#empList tbody').replaceChildren();
    console.log(list);
    for(let info of list){
        let trTag = document.createElement('tr');
        trTag.addEventListener('click', function(event){
            let selectTr = event.currentTarget;
            let selectId = selectTr.children[1].textContent;
            findUserById(selectId);
        });

        // 넘버
        let tdTag = document.createElement('td');
        tdTag.textContent = info.employeeId;
        trTag.append(tdTag);

        // 이름
        tdTag = document.createElement('td');
        tdTag.textContent = info.lastName;
        trTag.append(tdTag);

        // 업무
        tdTag = document.createElement('td');
        tdTag.textConetnt = info.jobId;
        trTag.append(tdTag);

        // console.log(info.no, info.name, info.jobId,);
        // console.log(trTag);
        document.querySelector('#empList tbody')
                .append(trTag);
    }
}

// // 회원정보 단건조회
// function findUserById(empId){
//     fetch(`http://192.168.0.11:8099/empInfo?Id=${empId}`)
//     .then(response => response.json())
//     .then(result => {
//         getUserList(result);
//     })
//     .catch(err => console.log(err));
// }

// function getUserInfo(user){
//     console.log(user);

//     for(let field in user){
//         if(field == 'hireDate'){
//             document.getElementsByName(field[0].value = (user[field]).slice(0,10))
//         }else{
//             document.getElementsByName(field[0].value = user[field]);
//         }
//     }
// }

// 사원번호를 기준으로 서버에 단건조회 요청 : AJAX
function findUserById(empId) {
    fetch(`http://192.168.0.11:8099/empInfo?employeeId=${empId}`)
    .then(response => response.json())
    .then(result =>{
        // 사원정보를 <input> 태그에 출력
        displayEmpInfo(result);
    })
    .catch(err => console.log(err));
}

function getUserInfo(emp) {
    // 사원이 가진 정보를 각 <input> 태그에 출력하기
    document.getElementsByName('employeeId')[0].value = emp.employeeId; // 사원 정보 중 사원번호
    document.getElementsByName('lastName')[0].value = emp.lastName; // 사원 정보 중 이름
    document.getElementsByName('email')[0].value = emp.email; // 사원 정보 중 이메일
    document.getElementsByName('hireDate')[0].value = emp.hireDate; // 사원 정보 중 입사일자
    document.getElementsByName('jobId')[0].value = emp.jobId; // 사원 정보 중 업무

    // 반복문 이런방식도 있음
    let tagList = document.querySelectorAll('#empInfo input');
    tagList.forEach(tag =>{ // 인풋태그
      tag.value = emp[tag.name]; // 값을 결정하는건 인풋네임 속성    
    });
}

// 새로운 회원등록
function addUserInfo(event){
    let userInfo = formUserInfo();

    fetch('http://192.168.0.11:8099/empInsert', {
        method : 'post',
        body : new URLSearchParams(userInfo)
    })
    .then(response => response.json())
    .then(result => {
        getUserList();
        document.getElementsByName('no')[0].value = result.no;
    })
    .catch(err => console.log(err));
}

function formUserInfo(){
    let tage = document.querySelectorAll('input, select');

    let obj = {};
    tage.forEach(function(tag, index, array){
        obj[tag.name] = tag.value;
    })
    console.log('obj',obj);
}

// 회원정보 수정
function updateUserInfo(event){
    let userInfo = formUserInfo();

    fetch('http://192.168.0.11:8099/empUpdate', {
        method : 'post',
        headers : {
            'content-type' : 'addlication/json'
        },
        body : JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(result =>{
        getUserList();
    })
    .catch(err => console.log(err));
}

// 회원정보 삭제
function delteUserInfo(event){
    let userInfo = formUserInfo();
    let userId = userInfo.id;

    userId = document.getElementsByName('id')[0].value;

    fetch(`http://192.168.0.11:8099/empDelete?employeeId=${empId}`)
    .then(response => response.json())
    .then(result =>{
        getUserList(result);
    })
    .catch(err => console.log(err));
}