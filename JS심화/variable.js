/*
  변수의 데이터 타입 : 기본 타입 VS 참조 타입

  변수 선언
  1) var(벌)
    - 호이스팅 : 실제 선언 위치와 상관없이 자유롭게 사용 가능 
    - 함수 스코프 : 변수 유효범위는 함수 기준
    - 중복 선언 허용
*/
    // 값이 없으면 null,undefined 둘중 하나
     console.log(1, text);
     text ='First';        // 변수 선언전에 값을 변경
     console.log(3, text);
     var text = 'Hello';  // 실제 변수 위치
     console.log(2, text);   

     var text ='Second';
     console.log(4, text);

     console.clear();

     (function funcScope(){
        console.log(i, j);
        for(var i = 1; i <= 3; i++){
          for(var j = 1; j <= 3; j++){
            console.log(`${i} X ${j} = ${(i * j)}`);
          }
        };
        console.log('last', i, j);
     })();
    //  console.log(i, j);

/*     
     2015년 이후부터 : let, const 추가
     - 공통점 :  변수 선언 후 사용, 중복 선언 불가, 불록 스코프,
     - 차이점 : 
     2) let   : 변수
     3) const : 상수 => Object, Array의 경우 내부 값은 변경가능 (상수 변하지 않는값)
*/
// (function blockScope(){
//     console.log(i, j);
//     for(var i = 1; i <= 3; i++){
//       for(var j = 1; j <= 3; j++){
//         console.log(`${i} X ${j} = ${(i * j)}`);
//       }
//     };
//     console.log('last', i, j);
//  })();
/*
   변수의 데이터 타입 : NUMBER, STRING, OBJECT, ARRAY, BOOLEAN, ETC(기타)
   1) 기본 타입 : NUMBER, STRING, BOOLEAN
   2) 참조 타입 : OBJECT, ARRAY
*/
// 1. 기본 타입
let name = 'Hong kil-Dang';
let age = 28;
let isChecked = true;

let newName = 'Hong kil-Dang';
let newAge = 28;
let isSelected = true;

newName = name;
newName = 'kang Ho-Dong';
console.log(name);
console.log(newName);

// 2. 참조 타입 // 
let person = {
    name : 'Hong kli-Dong',
    age : 28,
    isChecked : true
};

let newPers = person; // 참조 타입은 복사가 아니라 객체를 공유
newPers.name = 'Han Sang-kli';
console.log(person);
console.log(newPers);

// == 상수
const x = 1;
// x = 10; // Error Code

const y = {
    id : 'L',
    pwd : 1234
};

y.id = 'K';
y.pwd = 1024;
console.log(y);

// y = {}; // Error Code // 참조 타입은 const 사용하면 값을 바꾸는게 가능

/*
   -값이 존재하지 않는 변수를 사용했을 때
   undefined : 자바스크립트 -> 자동으로 해당 변수에 값이 존재하지 않다고 알려줌
   null : 개발자가 해당 변수의 값을 삭제
*/

let a;  //  undefined 이경우 언디파인드
console.log(a);
let b = null; // null 내가 의도적으로 준 경우
console.log(b);