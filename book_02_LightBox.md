# 라이트 박스(모달)를 만들어보자.

### 우선 `html`로 모달 틀을 만들자.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Modal</title>
    <link rel="stylesheet" href="./styles/02_LightBox.css">
</head>
<body>
    <div>
        
    </div>
    <!-- 라이트박스 배경  -->
    <div id="block">

    </div>
    <!-- 라이트박스 -->
    <div id="lightbox">
        
    </div>
    
    <script src="./scripts/02_LightBox.js"></script>
</body>
</html>
```
main페이지의 `div`, 라이트 박스 배경의 `div`, 라이트 박스의 `div`를 만들어줍니다.
```html
<div>
    <h1>light box</h1>
    <img src="./02_images/img01.jpg" alt="" class="thumb" onclick="lightbox_open(1)" />
    <img src="./02_images/img02.jpg" alt="" class="thumb" onclick="lightbox_open(2)" />
    <img src="./02_images/img03.jpg" alt="" class="thumb" onclick="lightbox_open(3)" />
    <img src="./02_images/img04.jpg" alt="" class="thumb" onclick="lightbox_open(4)" />
</div>
```
main페이지의 `div`에 `img`를 넣어주고, 'class'와 `onclick`이벤트를 등록합니다.  
`onclick`속성으로 라이트박스 창을 여는 함수를 실행하도록 합니다. 이미지 번호 값을 매개 변수로 전달하여 현재 선택된 이미지를 라이트 박스안에 나타나도록 합니다.

```html
<!-- 라이트박스 배경  -->
<div id="block">

</div>
<!-- 라이트박스 -->
<div id="lightbox">
    <h2>라이트 박스</h2>
    <figure>
        <img src="./02_images/img01.jpg" alt="" />
        <img src="./02_images/img02.jpg" alt="" />
        <img src="./02_images/img03.jpg" alt="" />
        <img src="./02_images/img04.jpg" alt="" />
    </figure>
    <div class="indicator">
        <button onclick="change_img(this.innerHTML)">1</button>
        <button onclick="change_img(this.innerHTML)">2</button>
        <button onclick="change_img(this.innerHTML)">3</button>
        <button onclick="change_img(this.innerHTML)">4</button>
    </div>
    <div class="btn_close" onclick="lightbox_close()">X</div>
</div>
```
`#block`은 라이트 박스가 팝업될 때 어두운 배경으로 처리될 영역입니다.  
`#lightbox`는 '이미지영역'과 '이미지 페이지 버튼(indicator button)' 그리고 '닫기 버튼'으로 구성되어 있습니다.  
'이미지 페이지 버튼(indicator button)'을 클릭하면' change_img() 함수'를 실행합니다. 
여기서 this는 클릭한 button이며, this.innerHTML은 해당 버튼 태그 내의 내용을 의미합니다. 
만약 첫 번째 버튼을 클릭할 경우 '1'을 매개 변수로 하여 change_img함수를 실행합니다.
'닫기 버튼'을 클릭할 경우 lightbox_close()함수를 실행합니다.


### `css`로 꾸며보자.
```css
*{
    margin: 0;
}
body{
    padding: 20px;
}
h1, h2{
    margin: 5px 0;
}
.thumb{
    width: 100px;
}
#lightbox{
    display: none;          /* 평상시에 라이트 박스를 안 보이게 함. */
}
#lightbox.active{           
    position: absolute;
    overflow: hidden;
    background: #333;
    width: 800px;
    left: 50%;
    margin-left: -25%;
    top: 50%;
    margin-top: -250px;
    box-sizing: border-box;
    padding: 30px;
    z-index: 99;
    display: block;         /* 활성화(active 클래스)될 때 라이트 박스를 보이게 함. */
}
#lightbox h2{
    color: white;
    text-align: center;
    margin-bottom: 10px;
}
figure{
    width: 500px;
    height: 300px;
    position: relative;
    margin: 10px auto;
    overflow: hidden;
}
figure img{
    display: none;
    position: absolute;
}
figure img.active{
    display: block;
    width: 100%;
}
.btn_close{
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
    color:white;
    font-size: large;
}
.btn_close:hover{
    background-color: #666;
}
#block{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #111;
    opacity: 0.5;
    z-index: 9;
    display: none;
}
#block.active{
    display: block;
}
.indicator{
    text-align: center;
}
.indicator button{
    background: #666;
    color: white;
    font-size: 12px;
    border: none;
    padding: 2px 5px;
}
.indicator button:focus{
    background: #38f;
}
```
`#lightbox`, `figure img`, `#block`는 'active클래스'가 추가될 때만 활성화 되도록 합니다.

### Javascript로 동적 제어 하자.
```javascript
var lightbox = document.querySelector('#lightbox');
var block = document.querySelector('#block');

function lightbox_open(num){
    lightbox.setAttribute('class','active');
    block.setAttribute('class','active');
}

function lightbox_close(){
    lightbox.removeAttribute('class');
    block.removeAttribute('class');
}
```
`setAttribute(속성명, 속성값)`메서드를 통해 '라이트 박스'와 '라이트 박스 배경'이 활성화 되도록 합니다.  
`removeAttribute(속성명)`메서드를 통해 '라이트 박스'와 '라이트 박스 배경'이 비활성화 되도록 합니다.

```javascript
var indicator = document.querySelectorAll('.indicator button');

function lightbox_open(num){
    . //setAttribute 메서드 내용.
    .
    change_img(num);
    indicator[num-1].focus(); //인디케이터 버튼을 클릭하지 않아도 버튼에 포커스를 활성화 함.
}
function change_img(n){
    var imgs = document.querySelectorAll('figure > img');

    for(var i = 0; i< imgs.length; i++){
        imgs[i].removeAttribute('class');
    }
    imgs[n-1].setAttribute('class','active');
}
```
이미지 목록 중 하나의 이미지를 클릭하여 라이트 박스를 열 때 (lightbox_open(num)=> change_img(num)),  
indicator 버튼을 클릭하여 이미지를 변경할 때 (change_img(this.innerHTML)) change_img(n)함수가 실행됩니다.  
change_img(n)함수는 `for`문을 통해 모든 이미지에서 'active 클래스'를 지운 뒤, 매개 변수로 받은 번호의 이미지에만 'active 클래스'를 추가하여 활성화 시킵니다.

### jQuery로 변환해보자.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
```
`head`영역에 제이쿼리 라이브러리를 추가합니다.  

> 변수 선언 및 함수 정의
```js
$(function(){
    var $indicator = $('.indicator button');
    var $lightbox = $('#lightbox');
    var $block = $('#block');

    function lightbox_open(num){
        $lightbox.addClass('active');
        $block.addClass('active');
        change_img(num);
        $indicator.eq(num).focus();
    }

    function lightbox_close(){
        $lightbox.removeAttr('class');
        $block.removeAttr('class');
    }

    function change_img(n){
        var $imgs = $('figure > img');

        for(var i = 0; i < $imgs.length; i++){          //imgs.length에 $꼭 붙이기.
            $imgs.eq(i).removeAttr('class');
        }
        // imgs.eq(n).attr('class','active');
        $imgs.eq(n).addClass('active');
    }
});
```
`eq()`메서드는 지정된 요소의 위치를 탐색하는 메서드 입니다. 배열의 index와 같은 역할을 합니다.


> 문서 내의 이벤트 속성 제거
```html
<div>
    <h1>light box</h1>
    <img src="./02_images/img01.jpg" alt="" class="thumb" />
    <img src="./02_images/img02.jpg" alt="" class="thumb" />
    <img src="./02_images/img03.jpg" alt="" class="thumb" />
    <img src="./02_images/img04.jpg" alt="" class="thumb" />
</div>
<div id="lightbox">
    .
    .
    <div class="indicator">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
    </div>
    <div class="btn_close">X</div>
</div>
```
> JQuery 이벤트 추가
```js
$('img.thumb').click(function(){
    var img_num = $(this).index() - 1;
    lightbox_open(img_num);
});

$indicator.click(function(){
    var img_num = $(this).index();
    change_img(img_num);
});

$('.btn_close').click(function(){
    lightbox_close();
});
```