var indicator = document.querySelectorAll('.indicator button');
var lightbox = document.querySelector('#lightbox');
var block = document.querySelector('#block');

function lightbox_open(num){
    lightbox.setAttribute('class','active');
    block.setAttribute('class','active');
    change_img(num);
    indicator[num-1].focus(); //버튼에 자동으로 포커스를 활성화 함.
}

function lightbox_close(){
    lightbox.removeAttribute('class');
    block.removeAttribute('class');
}

function change_img(n){
    var imgs = document.querySelectorAll('figure > img');
                                                            
    for(var i = 0; i< imgs.length; i++){
        imgs[i].removeAttribute('class');
    }
    imgs[n-1].setAttribute('class','active');
}