// 1) 함수 선언문 : 호이스팅, 중복 선언 가능 var(벌) 방식
console.log(firstPlus);

let result = firstPlus(10,15);
console.log(result);

function firstPlus(x, y){
    let sum = x + y;
    return sum;
}

function firstPlus(){ // 함수 선언문 문제점 var 방식이라 이름이 중복된게 아래걸로 변함
    console.log('Overloading'); // return 리턴으로 확실하게 정해주지 않으면 undefined 알수없는 값 언디파인드 줄수있음
}

// 2) 함수 표현식 : 선언 이후 사용, 중복 선언 불가 let(렛) const(컨스트) 방식 주로 const 사용
// console.log(secondFunc); // Error

// result = secondFunc(11, 22); // Error
console.log(result);

const secondFunc = function(x, y) {
    return (x + y);
}

console.log(secondFunc); // 사용 위치에 따라 작동됨
result = secondFunc(11, 22);
console.log(result);

// 일급객체 및 일급함수 (JavaScript)는 일급객체이며 일급함수
/*
  일급객체의 조건
  1) 변수에 할당할 수 있다
  2) 함수의 매개변수로 전달받는다.
  3) 함수의 결과로 반환할 수 있다.

  일급함수의 조건 => 자바스크립트는 함수를 객체로 취급한다.
  1) 변수에 함수를 할당할 수 있다
  2) 함수의 매개변수로 다른 함수를 전달받는다.
  3) 함수의 결과로 다른 함수를 반환할 수 있다. 
*/

const printMsg = function(msg){ // 변수가 객체를 가지는걸 일급객체라함
    if(msg != ''){
        console.log(msg);
        return 'completed';
    }else{
        return 'fail : No Message';
    }
}

let isSuccessde = printMsg('Hello, JS');
console.log(1, isSuccessde);
isSuccessde = printMsg('');
console.log(2, isSuccessde);

function addMessage(info, funcVar){
    let newMsg = `New Msg : ${info}`;
    let result = funcVar(newMsg); // ()를써서 함수를 의미
    console.log(funcVar, result);
}

addMessage('Today is ...', printMsg);

function newFunction(){
  return function (){
        console.log('새로운 함수');
    }
}

const sampleFunc = newFunction();  // 필요에 따라 함수의 결과를 다른함수로 반환홤
console.log(newFunction, sampleFunc);
sampleFunc();

// 일급함수 => 고차함수, 콜백함수, 클로저
// 1) 고차함수 : 함수를 매개변수로 받거나 결과값으로 반환하는 함수
// 2) 콜백함수 : 매개변수로 넘아가는 함수, 함수를 실행하는 주체가 고차함수
[10, 5, 23, 1]
   .forEach(function(value, index, array){ // 함수를 매개 변수로 전달받는 forEach -포리치
       console.log(`${index} : ${value}`);
  });

// 3) 클로저 :  특정 함수를 생성할 떄 선언된 환경을 기억함 -고차함수를 만들때 사용하는 기법중하나
console.clear();

function orderSet(){
    let side = '감자튀김';
    let beverage = '콜라';
    return function selectMenu(burger) {
        console.log('Set Menu : ',burger, side, beverage);
    }
}
// -- 원칙상 사라져야함
const mcdonale = orderSet(); // 변수 선언으로 사라져야할 함수가 사라지지 않음
console.log(mcdonale);
mcdonale('맥스파이시 치킨 버거');

// 내부함수 (중첩함수) 사용이유 두가지 함수가 연관성이 깊을때
// return 리턴이없음 특징 안에서만 동작한다
function outFunc(){
    function inFunc(){
        console.log('내부 함수')
    }
    inFunc();
}
outFunc();
// inFunc(); // Error

// 즉시 실행 함수 -함수를 실행하는 순간 바로 실행
// 악명함수      - 이름이 없는 함수
(function(x){  // 이름이 없음 (x = 9) 이렇게도 사용가능 그럼 밑에 괄호안 2 지워야함
    for(let i = 1; i <=9; i++){
        console.log(`${x} X ${i} = ${ x * i}`);
    }
})(2); // () 매개변수 기본값 대신할수있는 값을 지정할수 있음

// 생성자 함수 - 정해진 함수를 반복적으로 만들떄 
let obj = { 
    id : 'Hog',
     pwd : 1234 ,
      showInfo : function(){
       console.log(this.id, this.pwd);
}};
function User(id, pwd){ // 함수 이름을 대문자로 해야함 - 자바스크립트는 대문자를 생성자 함수로 인식함
    // 필드
    this.id = id; // 키워드는 this -디스 기반으로 만듬
    this.pwd = pwd; // 디스는 생성자 함수 객체를 가리킴 new 연산자를 통해 호출해야 의미있음

    // 메서드 -객체 내부에 등록되어있는 함수
    this.showInfo = function(){        // 메서드는 소유한 객체를 통하지 않고는 접근이 불가능함 - 예시 은행의 계좌번호 (메서드)
        console.log(this.id + ' : ' + this.pwd);
    }
}

let hong = new User('Hong', 1234); // new 를 연산자를 빼면 그냥 함수로 인식해 생성을 못함
let kang = new User('Kang', 1111); // new 1) 빈객체를 생성 2) this에 선언된값을 할당 하고 3) hong에 값을 담아줌
console.log(hong);
console.log(kang);
hong.id = 'Kil-Dang';
hong.showInfo();
kang.id = 'KangHan';
kang.showInfo();

// 메서드 -객체 내부에 등록되어있는 함수

// 화살표 함수 : () => {}, 콜백함수에서 가장 많이 사용, 기본적으로 이름이없는 익명함수, 이벤트 핸들러에선 안쓰는걸 권장
console.clear();
[10, 5, 23, 1]
  .forEach((value, index, array) => {
    console.log(`${index} : ${value}`);
});

// 함수표현식
let testFunc = (id, message) => { return `${id}, ${message}`};
let msg = testFunc('First', 'Wellcomd!');
console.log(msg)

// 1. 매개변수가 없는 경우 2. 하나의 값만 반환하는 경우
testFunc = () => `매개변수가 없는 화살표 함수`;
msg = testFunc();
console.log(msg);

// 3.매개변수가 하나밖에 없는 경우 4.실행하고자 하는 명령어가 하나인 경우
testFunc = data => console.log(`${data}를 매개변수로 받았습니다.`);
testFunc(100);

// 매개변수 
// 메서드 오버로딩  - 같은 이름이지만 실제로 실행되는건 다른 , 자바스크립트는 메서드 오버로딩이 없음
function logger(){
    for(let arg of arguments){ // arguments(알규먼츠) : 자동생성, 매개변수들 값 저장, 요즘 사용안함 다불러와서
        console.log(arg);
    }
}

logger('a');
logger('a', 'b', 'c');

// Rest(레스트) 매개변수 : 선언된 매개변수외 추가로 들어오는 값을 저장, // x, y, 이미선언된 매개변수 말고 나머지를 가져옴, 배열임
// 매개변수 기본값 : 주어진 인자값이 없는 경우 사용할 값 -인자값 매개변수에서 넘어오는 값
// function plus(x, y, ...rest){ // ... 을 붙여야 배열로 인식함
function plus(x = 0, y = 0, ...rest){ // 매개변수 기본값
    let sum = x + y;
    for(let num of rest){
        sum += num;
    }
    return sum;
}
console.log(plus(1,1));
console.log(plus(1,2,3,4));
console.log(plus(1));

// Spread(스프레드) 문법 : 펼침연산자
let aAry = [1, 2, 3]; 
let bAry = [9, 8, 7];
let newAry = [...bAry , ...aAry]; // 스프레드 문법 - 펼침 연산자
// let newAry = [bAry , aAry]; // 그냥쓰면 이중 배열이됨
console.log(newAry);
console.log(...newAry);