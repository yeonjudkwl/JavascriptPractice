# 할 일 목록을 만들어 보자.

### `html`로 내용을 구성합니다.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Worklist</title>
</head>
<body>
    <h1 id="title">할 일 목록</h1><hr>
    <button id="add-btn">목록 추가</button>

    <ul id="list">
        <li>제목 1</li>
        <li>제목 2</li>
        <li>제목 3</li>
        <li>제목 4</li>
    </ul>
</body>
</html> -->
```
`javascript`작업을 위해 각 태그에 `id`를 부여합니다.  
'목록 추가' 버튼을 누르면 일정을 추가할 수 있고,
각 일정을 클릭하면 `heading`에 그 내용이 표시되도록 할 예정입니다.

### `css`로 꾸며보자.
```css
#add-btn{
    padding: 5px 10px;
    border: 0;
    background-color: #f80;
    color: white;
    border-radius: 5px;
}
ul{
    padding: 0;
    list-style-position: inside;
}
li{
    border-bottom: 1px solid #999;
    padding: 5px 0;
}
.active{
    background-color: #abc;
}
```
`.active`는 목록을 클릭했을 때 변경될 스타일입니다.  
`javascript`에서 클래스를 동적으로 처리할 것입니다.

###  `javascript`로 동적 제어 하자.
```js
var title = document.getElementById('title');
var list = document.getElementById('list');
var li = list.getElementsByTagName('li');
var addBtn = document.getElementById('add-btn');

for(var i = 0; i < li.length; i++){
    li[i].addEventListener('click', activeItem);
}

function activeItem(){
    //목록을 클릭하면 heading에 나타내준다.
    .
    .
}

addBtn.addEventListener('click',function(){
    //버튼을 클릭하면 목록을 추가할 수 있다.
    .
    .
})
```
`for`문을 통해 모든 목록에 이벤트 리스너를 연결해줍니다.  
`activeItem`은 이벤트 리스너가 호출하는 콜백 함수입니다.  
함수는 아래에 별도로 정의되어 있는데,  이벤트 리스너가 외부 함수를 매개 변수로 참조하는 방식을 '이벤트 바인딩'이라고 합니다.  
`addEventListener`를 통해 버튼에 이벤트 리스너를 연결해줍니다.

```js
function activeItem(){
    title.innerHTML = this.innerText;
    for(var i = 0; i<li.length; i++){
        li[i].removeAttribute('class');
    }
    this.setAttribute('class','active');
}
```
`heading`에 이벤트 타겟의 내용을 넣어줍니다.  
계속 다른 목록을 클릭할 때 스타일 효과도 바꿔주기 위해 반복문을 통해 모든 목록의 스타일을 지운 후, 이벤트 타겟의 스타일만 효과를 줍니다.
```js
addBtn.addEventListener('click',function(){
    var txt = prompt('목록 입력');
    list.innerHTML += '<li>'+txt+'</li>';
})
```
'목록 추가' 버튼을 클릭한 이용자로부터 입력을 받아 `list`에 계속 추가해줍니다.  
주의해야 할 점은 대입 연산자(=)가 아닌 추가 연산자(+=)를 사용해야 한다는 것입니다. 대입 연산자를 사용하게 되면 목록의 내용이 새로운 내용으로 초기화 됩니다.

### 오류를 수정해보자.
> 버튼을 통해 새로운 목록을 추가하게 되면 더이상 Javascript가 동작하지 않게됩니다.  
이 오류를 해결하기위해 코드를 아래와 같이 수정해줍니다.

이벤트 리스너에 지정된 요소는 문서에 먼저 작성된 정적인 요소를 대상으로 합니다. 그런데 사용자가 목록을 추가하면 목록의 배열이 변경되는 동적인 상황이 발생합니다. 왜냐하면 나중에 추가된 목록은 참조하는 위치가 달라져 이벤트 리스너가 인식하지 못하기 때문입니다.이럴때는 이벤트 리스너 지정을 li 요소 전체가 아닌 부모ul로 수정해야 합니다. 그리고 변경된 목록의 내용도 이벤트 리스너에게 다시 알려 주어야 합니다.   

>수정 전
```js
for(var i =0; i<li.length; i++){
    li[i].addEventListener('click', activeItem);
}
```
>수정 후
```js
list.addEventListener('click', activeItem);
```
li요소 전체에 이벤트 리스너를 연결하는 것이 아니라 부모요소인 ul에 이벤트 리스너를 연결해줍니다.

>수정 전
```js
function activeItem(){
    title.innerHTML = this.innerText;
    for(var i = 0; i<li.length; i++){
        li[i].removeAttribute('class');
    }
    this.setAttribute('class','active');
}
```
>수정 후
```js
function activeItem(event){
    if(event.target.nodeName == 'LI'){
        title.innerHTML = event.target.innerText;
    
    for(var i = 0; i<event.target.parentNode.children.length; i++){
        event.target.parentNode.children[i].removeAttribute('class');
        }
    event.target.setAttribute('class','active');
    }
}
```
변경된 목록의 내용도 이벤트 리스너에게 다시 알려 주어야 합니다.
그러기 위해서 콜백함수 activeItem에 매개 변수(event)를 전달합니다. 자바스크립트 이벤트 객체의 속성인 target.nodeName으로 클릭한 요소를 동적으로 참조할 수 있습니다.  
`event.target.nodeName == 'LI'`으로 기존의 `li`요소와 새로 추가된 `li`요소를 모두 파악합니다.

배열의 길이도 `event.target.parentNode.children.length`으로 이벤트 타겟의 부모를 탐색한 후 다시 자식 li들을 탐색해 동적으로 알아냅니다.  