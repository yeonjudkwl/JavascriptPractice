# 계산기를 만들어보자.

### 우선 `html`로 계산기 틀을 만들자.

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Calculator</title>
</head>
<body>
    <form name="cal" action="">
        <table>
            <caption>계산기</caption>
            <tr>
                <th colspan="4"><input type="text" name="result" value="0"></th>
            </tr>
            <tr>
                <td><input type="button" value="7"></td>
                <td><input type="button" value="8"></td>
                <td><input type="button" value="9"></td>
                <td><input type="button" value="+"></td>
            </tr>
            <tr>
                <td><input type="button" value="4"></td>
                <td><input type="button" value="5"></td>
                <td><input type="button" value="6"></td>
                <td><input type="button" value="-"></td>
            </tr>
            <tr>
                <td><input type="button" value="1"></td>
                <td><input type="button" value="2"></td>
                <td><input type="button" value="3"></td>
                <td><input type="button" value="*"></td>
            </tr>
            <tr>
                <td colspan="2"><input type="button" value="0"></td>
                <td><input type="button" value="%"></td>
                <td><input type="button" value="/"></td>
            </tr>
            <tr>
                <td colspan="2"><input type="button" class="cls_btn" value="clear"></td>
                <td colspan="2"><input type="button" class="result_btn" value="="></td>
            </tr>
        </table>
    </form>
</body>
</html>
```
`form`에 name값('cal')을 부여합니다.  
결과값을 보여주는 `input`태그에도 name값('result')을 부여합니다.  
각 버튼에 `value`값을 설정해주고, 'clear'와 'result_btn'에 클래스명을 부여해줍니다.

### `css`로 꾸며보자.
```css
<style>
    caption{
        font-size: 32px;
    }
    table{
        width: 320px;
    }
    table, th{
        background: #333;
    }
    th{
        padding-right: 10px;
        height: 80px;
    }
    td{
        height: 75px;
        text-align: center;
    }
    th>input{
        width: 100%;
        border: none;
        background: #333;
        color: white;
        text-align: right;
        font-size: 48px;
    }
    td>input[type="button"]{
        width: 100%;
        height: inherit;
        color: #333;
        font-size: 36px;
        border: none;
    }
    td>input[type="button"]:hover{
        background: #999;
    }
    td:last-child > input{
        background: orange;
        color: white;
    }
</style>
```
계산기처럼 스타일링 해줍니다.

### Javascript로 동적 제어 하자.
```javascript
var inp = document.forms['cal'];
var input = inp.getElementsByTagName('input');
var cls_btn = document.getElementsByClassName('cls_btn')[0];
var result_btn = document.getElementsByClassName('result_btn')[0];

function calc(value){
    //이용자가 입력하는대로 'result'입력창에 출력합니다.
}

function clr(){
    //clear하는 메소드 입니다.
}

function my_result(){
   //입력된 값을 계산하여 보여주는 메소드 입니다.
}

for(var i=0; i < input.length; i++){
   //숫자와 사칙연산 부호에만 
   //이벤트 핸들러를 등록하여 calc함수를 호출합니다.
}

cls_btn.onclick = function(){
    //clear버튼에 이벤트 핸들러를 등록하여 clr함수를 호출합니다.
}

result_btn.onclick = function(){
   //result버튼에 이벤트 핸들러를 등록하여 my_result함수를 호출합니다.
}
```
변수를 선언하고, 함수 정의 및 이벤트 핸들러를 등록해줍니다.  
`document.forms['formName']['typeName']`은 form 요소에 접근하는 방법입니다.

```javascript
function calc(value){
    //아무것도 입력을 받지 않았을 때
    if(inp['result'].value == 0){
        inp['result'].value = ' ';
    }
    //입력을 받았을 때
    inp['result'].value += value;
}

for(var i = 0; i < input.length; i++){
    if(input[i].value != '=' && input[i].value != 'clear'){
        input[i].onclick = function(){
            calc(this.value);
        }
    }
}
```
`for`문을 통해 '숫자' 및 '사칙연산 부호'버튼에만 이벤트 핸들러를 등록해줍니다. 그 후 이벤트 타겟의 value값을 매개변수로 하여 calc함수를 호출합니다.  
calc함수에서 이벤트 타겟의 value값(value)을 입력창의 value값(inp['result'].value)에 추가해줍니다.

```javascript
function my_result(){
    var result = document.forms['cal']['result'];
    var calc = eval(result.value);

    inp['result'].value = calc;
}
```
입력된 값은 문자열 입니다. 문자열을 계산을 할 수 없으므로 `eval()`함수를 사용합니다. `eval()`함수는 입력된 문자열('result.value'값)을 숫자처럼 처리할 수 있게 해줍니다.

```javascript
var inp = document.forms['cal'];
var input = inp.getElementsByTagName('input');
var cls_btn = document.getElementsByClassName('cls_btn')[0];
var result_btn = document.getElementsByClassName('result_btn')[0];

function calc(value){
    if(inp['result'].value == 0){
        inp['result'].value = ' ';
    }
    inp['result'].value += value;
}

function clr(){
    inp['result'].value = 0;
}

function my_result(){
    var result = document.forms['cal']['result'];
    var calc = eval(result.value);

    inp['result'].value = calc;
}

for(var i=0; i < input.length; i++){
    if(input[i].value != '=' && input[i].value != 'clear'){
        input[i].onclick = function(){
            calc(this.value);
        }
    }
}

cls_btn.onclick = function(){
    clr();
}

result_btn.onclick = function(){
    my_result();
}
```
'clear'버튼과 '='버튼을 클릭했을 때 이벤트 핸들러 및 함수를 정의해줍니다.  
완성된 Javascript는 위와 같습니다.


### `try~catch`문으로 오류를 해결해보자.
>현재 계산기는 예외 처리가 안 되어 있습니다.  
계산기가 처리하지 못하는 수식을 입력했을 때를 대비하여 기능을 개선해 보겠습니다.

> 수정 전
```js
result_btn.onclick = function(){
    my_result();
}
```

> 수정 후
```js
result_btn.onclick = function(){
    try{
        my_result();
    }
    catch(err){
        var result = inp['result'];
        result.value = '입력오류';
    }
}
```
`catch`의 매개 변수 `err`에는 에러 메시지가 반환 됩니다.  
오류가 발생했을 때에는 '입력오류'를 출력합니다.

### jQuery로 변환해보자.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
```
`head`영역에 제이쿼리 라이브러리를 추가합니다.  
>변수 선언
```js
var $inp = $('form[name=cal]');
var $input = $inp.find('input');
var $cls_btn = $('.cls_btn');
var $result_btn = $('.result_btn');
var $result = $inp.find('input[name=result]');
```
'$'는 제이쿼리 선택자를 지정한 변수라는 의미입니다.  
find()는 현재 지정된 선택자의 후손을 찾는 제이쿼리 메서드입니다.  
>함수 정의
```js
function calc(value){
    if($result.val() == 0){
        $result.val(' ');
    }
    var val = $result.val() + value;
    $result.val(val);
}

function clr(){
    $result.val(0);
}

function my_result(){
    var calc = eval($result.val());

    $result.val(calc);
}
```
val()은 입력 요소의 value값을 읽거나 지정하는 메서드입니다.  
>이벤트 핸들러
```js
$('input').click(function(){
    var $input_value = $(this).val();

    if($input_value != '=' && $input_value != 'clear'){
        calc($input_value);
    }
});

$('.cls_btn').click(function(){
    clr();
});

$('.result_btn').click(function(){
    try{
        my_result();
    }
    catch(err){
        $result.val('입력 오류');
    }
});
```
두 번째 줄의 '$(this)'는 현재 사용자가 클릭한 이벤트 타켓만을 반환합니다.