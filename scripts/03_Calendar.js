function calendar(new_year, new_month){
    var d = new Date(new_year, new_month-1, 1);
    var d_length = 32 - new Date(new_year, new_month-1, 32).getDate();    //특정 월의 총 일수 구하기
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    var day = d.getDay();
    
    
    var caption_year = document.querySelector('.year');
    var caption_month = document.querySelector('.month');
    var start_day = document.querySelectorAll('tr td');
    
    for(var i = 0; i < start_day.length; i++){
        start_day[i].innerHTML = "&nbsp;";
    }
    
    for(var i = day; i < day + d_length; i++){
        start_day[i].innerHTML = date;
        date++;
    }
    
    caption_year.innerHTML = year;
    caption_month.innerHTML = month + 1;
}

(function(){
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;

    calendar(year, month);

    prev.onclick = function(){
        calendar(year, --month);
    };
    next.onclick = function(){
        calendar(year, ++month);
    }
})();