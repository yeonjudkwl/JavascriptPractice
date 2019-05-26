var banner = document.getElementById('banner');
var img = banner.getElementsByTagName('img');
var toggle = document.getElementById('toggle');
var sound_btn = document.getElementById('sound_btn');
var banner_height = window.getComputedStyle(banner).height;
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
    for(var i=0; i<img.length; i++){
        set_balloon(i);
        img[i].style.left = '-9999px';
        img[i].style.top = '-9999px';
    }
}
function animate_balloon(){
    for(var i=0; i<img.length; i++){
        img[i].style.left = cast[i].x + 'px';
        img[i].style.top = cast[i].y + 'px';
        img[i].style.transform = 'rotate(' + cast[i].angle + 'deg)';
        img[i].style.width = cast[i].size + 'px';

        if(cast[i].y < parseInt(banner_height)){
            cast[i].y += 1 + cast[i].speed;
            cast[i].angle += cast[i].speed;
        }else{
            set_balloon(i);
        }
    }
}
function bgm_init(){
    var bgm = new Audio();
    bgm.src = './images/05_images/bgm.mp3';
    bgm.loop = true;
    document.body.appendChild(bgm);
}
function sound_button(e){
    var attr = sound_btn.getAttribute('class');
    var bgm = document.getElementsByTagName('audio');

    if(attr == 'active'){
        sound_btn.removeAttribute('class');
        sound_btn.setAttribute('src','./images/05_images/sound_off.png');
        bgm[0].pause();
    }else{
        sound_btn.setAttribute('class','active');
        sound_btn.setAttribute('src','./images/05_images/sound_on.png');
        bgm[0].play();
    }
    e.stopPropagation();
}
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

ball_init();

setInterval(function(){
    animate_balloon();
}, 1000/30);

bgm_init();

sound_btn.addEventListener('click',sound_button);
toggle.addEventListener('click',toggle_init);
banner.addEventListener('click',banner_link);