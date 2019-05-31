# 배너를 만들어보자.

### 우선 `html`로 배너 틀을 만들자.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Banner</title>
	<link rel="stylesheet" href="./styles/05_Banner.css">
</head>
<body>
    <div id="banner_wrap">
		<figure id='banner' class="active">
		    <img src='./05_images/balloon1.png' alt='h'>
		   	<img src='./05_images/balloon2.png' alt='e'>
		    <img src='./05_images/balloon3.png' alt='l'>
		    <img src='./05_images/balloon4.png' alt='l'>
		    <img src='./05_images/balloon5.png' alt='o'>
		    <img src='./05_images/balloon1.png' alt='h'>
		    <img src='./05_images/balloon2.png' alt='e'>
		    <img src='./05_images/balloon3.png' alt='l'>
		    <img src='./05_images/balloon4.png' alt='l'>
			<img src='./05_images/balloon5.png' alt='o'>
		    <input id='sound_btn' type='image' src='./05_images/sound_off.png' alt='sound'>
		</figure>
		<a id="toggle" href="#">배너 닫기</a>
    </div>
    
    <script src="./scripts/05_Banner.js"></script>
</body>
</html>
```

### `css`로 꾸며보자.
```css
*{ 
    margin: 0; 
}
body{ 
    padding: 300px 50px;
}
#banner_wrap{
    position: relative;
    width: 600px;
}
#banner{
    width:600px;
    height: 0px;                                /* 안 보이게 함 */
    position: relative;
    overflow: hidden;
    background: url('../05_images/bg.png');
    border-bottom: 1px solid #666;
    border-top: 1px solid #ccc;
    box-sizing: border-box;
    transition-duration: 0.5s;
}
#banner.active{
    height: 190px;                              /*보이게 함 */
    border: 1px solid #ccc;
}
#banner:hover{
    cursor: pointer;
}
#banner img{
    display: block;
    position: absolute;
}
#sound_btn{
    position: absolute;
    left: 10px; 
    bottom: 10px;
    outline: none;
}
#toggle{
    position: absolute;
    right: 0; 
    bottom: -18px;
    background: #666;
    color: white;
    font-size: 12px; 
    line-height: 18px;
    padding: 0 5px;
    text-decoration: none;
}
#toggle:hover{ 
    text-decoration: underline; 
}
```


### Javascript로 동적 제어 하자.

> 풍선 객체 생성 함수
```javascript
var cast = [];

function set_balloon(num){
    var x = Math.floor(Math.random() * (500-10)+10);       
    var y = Math.floor(Math.random() * (400-120)+120);      
    var size = Math.floor(Math.random() * (200-100)+100);   
    var angle = Math.floor(Math.random() * 360);            
    var speed = Math.random() * 2;

    //풍선 객체
    cast[num] = {
        x: x,           //풍선의 x좌표
        y: -y,          //풍선의 y좌표(배너 상단 밖에서 시작하므로 음수값 적용)
        size: size,     
        angle: angle,
        speed: speed
    };
}
```
> 풍선 객체 초기화 함수
```javascript
var banner = document.getElementById('banner');
var img = banner.getElementsByTagName('img');
var cast = [];

function ball_init(){
    for(var i=0; i<img.length; i++){
        set_balloon(i);
        img[i].style.left = '-9999px';      //풍선의 x좌표
        img[i].style.top = '-9999px';       //풍선의 y좌표
    }
}
```
`set_balloon()`메서드를 호출하여 풍선 객체를 초기화 합니다.  
그 후 초기 화면에서 풍선이 화면 내에 표시되지 않도록 화면 밖 임의의 좌표 값을 지정합니다.

> 풍선 애니메이션 함수
```javascript
var banner = document.getElementById('banner');
var img = banner.getElementsByTagName('img');
var banner_height = window.getComputedStyle(banner).height;
var cast = [];

function animate_balloon(){
    for(var i=0; i<img.length; i++){
        img[i].style.left = cast[i].x + 'px';
        img[i].style.top = cast[i].y + 'px';
        img[i].style.transform = 'rotate(' + cast[i].angle + 'deg)';
        img[i].style.width = cast[i].size + 'px';

        // 풍선이 화면 안에 있으면
        if(cast[i].y < parseInt(banner_height)){
            cast[i].y += 1 + cast[i].speed;
            cast[i].angle += cast[i].speed;
        }else{
            // 화면 밖으로 나가면
            set_balloon(i);
        }
    }
}
```
풍선이 떨어질 때 풍선이 배너 밖으로 나갔는지 아닌지를 판단하기 위해서 배너의 높이 값(banner_height)을 구합니다.  
이때 외부 파일에서 css속성을 읽어야 하므로 전역 객체인 getComputedStyle()메서드를 사용해야 합니다.  

`for`문을 통해 풍선 객체(cast[])에 지정된 속성 값(랜덤 값)을 풍선 이미지 객체(img[])에 적용합니다. 이 때 style 객체에 속성 값을 적용하는 것이므로 'px'를 꼭 적어주어야 합니다.

`if`문을 통해 풍선의 '하강 속도' 및 '회전 속도'를 지정합니다. 화면 밖으로 나가면 'set_balloon()'메서드를 통해 새로운 랜덤값으로 풍선 객체를 초기화합니다. 풍선이 하강할 때의 기본 낙하 값은 1(px)이지만, 객체마다 다른 speed 값을 적용하므로 낙하하는 속도가 각각 달라집니다. 풍선을 회전시키는 angle 속성에도 마찬가지로 적용합니다.

> 배경 음악 처리 함수
```javascript
var sound_btn = document.getElementById('sound_btn');

function bgm_init(){
    var bgm = new Audio();
    bgm.src = './05_images/bgm.mp3';
    bgm.loop = true;
    document.body.appendChild(bgm);
}
function sound_button(){
    var attr = sound_btn.getAttribute('class');
    var bgm = document.getElementsByTagName('audio');

    if(attr == 'active'){
        sound_btn.removeAttribute('class');
        sound_btn.setAttribute('src','../05_images/sound_off.png');
        bgm[0].pause();
    }else{
        sound_btn.setAttribute('class','active');
        sound_btn.setAttribute('src','../05_images/sound_on.png');
        bgm[0].play();
    }
}
```
`appendChild()`메서드로 body 안에 'Audio 객체'를 추가합니다.  
'Audio 객체' 클래스가 'active'인 경우 클래스 제거 및 버튼 이미지 변경을 하고 사운드를 해제합니다. 'active'가 아닌 경우 'active'클래스 추가 및 버튼 이미지 변경을 한 후 사운드를 재생합니다.  

> 토글 버튼 함수
```javascript
var toggle = document.getElementById('toggle');

function toggle_init(){
    var attr = banner.getAttribute('class');

    if(attr == 'active'){
        banner.removeAttribute('class');
        toggle.innerHTML = '배너 열기';
        return false;
    }else{
        banner.setAttribute('class','active');
        toggle.innerHTML = '배너 닫기';
        return false;
    }
}

function banner_link(){
    window.open('https://csslick.github.io/','_blank');
}
```
`toggle_init()`에서 return false가 추가된 이유는 버튼 객체가 <a>요소이기 때문에 클릭 시 문서가 이동되는 기본 이벤트가 발생하기 때문입니다. 따라서 문서의 이동을 방지하기 위해 추가했습니다.  

`banner_link()`메서드는 banner에 링크를 걸어줍니다. Javascript로 하이퍼링크를 처리하는 방법에는 'location 객체'를 이용하는 방법과 'window 객체'를 이용하는 방법이 있습니다. 'location 객체'는 현재 페이지에서만 이동되기 때문에 새로운 창에서 열 때에는 'window.open(url,target)'메서드를 이용합니다.

> 이벤트 버블링 차단
```js
function sound_button(e){
    var attr = sound_btn.getAttribute('class');
    var bgm = document.getElementsByTagName('audio');

    if(attr == 'active'){
        .
        .
    }else{
        .
        .
    }
    e.stopPropagation();
}
```
사운드 버튼이 배너 영역 안에 있기 때문에, 사운드 버튼을 클릭하면 부모 요소인 배너의 클릭 이벤트에도 영향을 미칩니다. 즉 사운드만 재생되는 것이 아니라 링크의 창이 열리는 동작까지 발생합니다. 이러한 '이벤트 버블링'문제를 해결하기 위해 `stopPropagation()`메서드를 사용합니다.

> 함수 호출 및 이벤트 리스너 등록
```javascript
ball_init();

setInterval(function(){
    animate_balloon();
}, 1000/30);

bgm_init();

sound_btn.addEventListener('click',sound_button);
toggle.addEventListener('click',toggle_init);
banner.addEventListener('click',banner_link);
```
`setInterval()` 함수를 통해 'animate_balloon()'메서드를 매초 일정한 프레임으로 재생시킵니다.


### jQuery로 변환해보자.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
```
`head`영역에 제이쿼리 라이브러리를 추가합니다.  

> 변수 선언 및 함수 정의
```js
var $banner = $('#banner');
var $img = $banner.find('img');
var $toggle = $('#toggle');
var $sound_btn = $('#sound_btn');
var $banner_height = $banner.css('height');
var cast = [];

function set_balloon(num){
    var x = Math.floor(Math.random() * (500-10)+10);       
    var y = Math.floor(Math.random() * (400-120)+120);      
    var size = Math.floor(Math.random() * (200-100)+100);   
    var angle = Math.floor(Math.random() * 360);            
    var speed = Math.random() * 2;

    cast[num] = {
        x: x,
        y: -y,
        size: size,
        angle: angle,
        speed: speed
    };
}

function ball_init(){
    $img.each(function(i){
        set_balloon(i);
        $img.eq(i).css('left','-9999px').css('top','-9999px');
    });
}
function animate_balloon(){
    $img.each(function(i){
        $img.eq(i).css('left',cast[i].x + 'px')
                  .css('top',cast[i].y + 'px')
                  .css('transform','rotate(' + cast[i].angle + 'deg)')
                  .css('width', cast[i].size + 'px');

        if(cast[i].y < parseInt($banner_height)){
            cast[i].y += 1 + cast[i].speed;
            cast[i].angle += cast[i].speed;
        }else{
            set_balloon(i);
        }
    });
}
function bgm_init(){
    var bgm = new Audio();
    bgm.src = './05_images/bgm.mp3';
    bgm.loop = true;
    $('body').append(bgm);
}
function sound_button(e){
    var attr = $(this).attr('class');
    var bgm = $('audio');

    if(attr == 'active'){
        $(this).removeAttr('class');
        $(this).attr('src','../05_images/sound_off.png');
        bgm[0].pause();
    }else{
        $(this).attr('class','active');
        $(this).attr('src','../05_images/sound_on.png');
        bgm[0].play();
    }
    e.stopPropagation();
}
function toggle_init(){
    var attr = $banner.attr('class');

    if(attr == 'active'){
        $banner.removeAttr('class');
        $(this).html('배너 열기');
        return false;
    }else{
        $banner.attr('class','active');
        $(this).html('배너 닫기');
        return false;
    }
}

function banner_link(){
    window.open('https://csslick.github.io/','_blank');
}

ball_init();

setInterval(function(){
    animate_balloon();
}, 1000/30);

bgm_init();

$sound_btn.click(sound_button);
$toggle.click(toggle_init);
$banner.click(banner_link);
```
$img 객체에 여러 메서드를 연결(.css().css())했는데 이를 '메서드 체이닝'이라고 합니다.  
`append()`메서드를 이용해 문서에 추가합니다.