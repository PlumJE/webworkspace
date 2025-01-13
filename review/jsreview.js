// jsreview.js => 그자체가 <script/> 태그
// HTML, CSS 작성 불가

// document.getElementById('insertBtn')
document.addEventListener('DOMContentLoaded', function(event){ // 특정 태그의 이벤트 처리 등록 -애드 이벤트 리스너
            /*  // 기본적인 4가지 외우기
            -- 필드
            event.target;               // 고정, 실제 이벤트 발생 태그
            event.currentTarget;        // 유동, 이벤트 버블링을 따라 변함 - 이벤트 커런트 타겟 - 이벤트 핸들러가 등록된 태그

            -- 메소드
            event.preventDefault(); // 각 이벤트의 기본 동작을 일시정지 - 프리벤트 디폴트
            event.stopPropagation(); // 이벤트 버블링을 정지 - 스탑 프러파게이션
            */
          console.log('해당 이벤트 발생시 작업');

          // DOMContentLoaded : 화면을 구성하는 DOM이 완성된 시점 - 돔 콘텐트 로디드
          // => 실제 이벤트 처리를 등록하는 경우
          document.getElementById('insertBtn')
                  .addEventListener('click', insertTrTag);

          let trList = document.querySelectorAll('tbody > tr');
          trList.forEach(trTag => {                     // 포리치 반복분사용
            trTag.addEventListener('click', function(e){
                if(e.target.tagName == 'SELECT') return;

                console.log('target Tag', e.target);
                console.log('currentTarget Tag', e.currentTarget);
            });
          });
         }); // 함수 방식은 제거가 힘듬 다양한 형태가능

document.getElementById('insertBtn')
        .addEventListener('click', insertTrTag); // 권장하는 방식

function insertTrTag(event){
    let trTag = document.createElement('tr');
    trTag.addEventListener('click', function(e){
        if(e.target.tagName == 'SELECT') return;

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
// tdTag.textContent = 1;
trTag.append(tdTag);

// 아이디
tdTag = document.createElement('td');
inputTag = document.createElement('input');
inputTag.type = 'text';
inputTag.name = 'id';

tdTag.append(inputTag);
trTag.append(tdTag);

// 비밀번호
tdTag =
`<td>
    <input type='password' name='password'></input>
</td>`;
trTag.insertAdjacentHTML("beforeend", tdTag);

// 구분
tdTag =
 `<td>
    <select name = "gender">
      <option value="Male">남자</option>
      <option value="Female">여자</option>
    </select>
  </td>`;
 trTag.insertAdjacentHTML("beforeend", tdTag);

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
  btnTag.addEventListener('click', function(event){
    let delBtn = event.currentTarget;
    let trTag = delBtn.closest('tr');
    trTag.remove();
  })
  tdTag.append(btnTag);
  trTag.append(tdTag);
  console.log(trTag); // 단순 변수의 값

  // 기존 DOM에 등록된 태그에 추가
  document.querySelector('tbody').append(trTag);

}

function getNextNo(){
    let noList = document.querySelectorAll('tbody > tr >  td:nth-of-type(2)');
    
    return ('00' + (Number(noList[noList.length-1].textContent) + 1)).slice(-3);
  };