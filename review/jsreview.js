// jsreview.js => 그 자체가 <script>태그
// HTML, CSS 사용 불가

document.addEventListener('DOMContentLoaded', function(event) {
    /*
        -- 필드
        event.target        실제 이벤트 발생 태그
        event.currentTarget 이벤트 버블링을 따라 변함, 이벤트 핸들러가 등록된 태그
        -- 메소드
        event.preventDefault()  form.submit, a.href의 자동 실행을 막는다
        event.stopPropagation() 이벤트 버블링을 정지, 내 부모 태그에 이벤트 전파를 막음
    */
    // DOMContentLoaded : 화면을 구성하는 DOM이 완성된 시점(로딩을 완료한 시점)
    // => 실제 이벤트 처리를 등록하는 경우

    document.getElementById('insertBtn').addEventListener('click', insertTrTag);

    let trList = document.querySelectorAll('tbody > tr');
    trList.forEach(trTag => {
        trTag.addEventListener('click', function(e) {
            if(e.target.tagName == 'SELECT')
                return;

            console.log('target Tag', e.target);
            console.log('currentTarget Tag', e.currentTarget);
        });
    });
});

function insertTrTag(event) {
    let trTag = document.createElement('tr');
    trTag.addEventListener('click', function(e) {
        if(e.target.tagName == 'SELECT')
            return;

        console.log('target Tag', e.target);
        console.log('currentTarget Tag', e.currentTarget);
    });

    // 체크박스
    let tdTag = document.createElement('td');
    let inputTag = document.createElement('input');
    inputTag.type = 'checkbox';
    inputTag.disabled = true;

    tdTag.append(inputTag);
    trTag.append(tdTag);

    // No.
    tdTag = document.createElement('td');
    tdTag.textContent = getNextNo();

    trTag.append(tdTag);

    // 아이디
    tdTag = document.createElement('td');
    inputTag = document.createElement('input');
    inputTag.type = 'text';
    inputTag.name = 'id';

    tdTag.append(inputTag);
    trTag.append(tdTag);

    // 비밀번호
    tdTag = document.createElement('td');
    inputTag = document.createElement('input');
    inputTag.type = 'password';
    inputTag.name = 'password';

    tdTag.append(inputTag);
    trTag.append(tdTag);

    // 구분
    tdTag = document.createElement('td');
    selectTag = document.createElement('select');

    let optionTag = document.createElement('option');
    optionTag.value = '남자';
    optionTag.text = '남자';
    selectTag.append(optionTag);

    optionTag = document.createElement('option');
    optionTag.value = '여자';
    optionTag.text = '여자';
    selectTag.append(optionTag);

    tdTag.append(selectTag);
    trTag.append(tdTag);

    // 이름
    tdTag = document.createElement('td');
    inputTag = document.createElement('input');
    inputTag.type = 'text';
    inputTag.name = 'name';

    tdTag.append(inputTag);
    trTag.append(tdTag);

    // 가입날짜
    tdTag = document.createElement('td');
    inputTag = document.createElement('input');
    inputTag.type = 'date';
    inputTag.name = 'joinDate';

    tdTag.append(inputTag);
    trTag.append(tdTag);

    // 삭제
    tdTag = document.createElement('td');
    let btnTag = document.createElement('button');
    btnTag.type = 'button';
    btnTag.textContent = '삭제';
    btnTag.addEventListener('click', function(event) {
        let delBtn = event.currentTarget;
        let trTag = delBtn.closest('tr');
        trTag.remove();
    })

    tdTag.append(btnTag);
    trTag.append(tdTag);

    console.log(trTag);     // 단순히 tr객체를 console에 출력

    // DOM에 등록된 태그 치하에 추가!
    document.querySelector('tbody').append(trTag);
};

function getNextNo(){
    let noList = document.querySelectorAll('tbody > tr > td:nth-of-type(2)');
    
    return ('00' + (Number(noList[noList.length - 1].textContent) + 1)).slice(-3);
};

// abracadabra