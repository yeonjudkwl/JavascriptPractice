# 달력을 만들어보자.

### 우선 `html`로 달력 틀을 만들자.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Calendar</title>
    <link rel="stylesheet" href="./styles/03_Calendar.css">
</head>
<body>
    <div id="calendar_wrap">
        <table id="calendar">
            <caption>
            <span class="year"></span>년 
            <span class="month"></span>월 
            </caption>
            <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </table>
    
        <a href="#" id="prev">이전 달</a>
        <a href="#" id="next">다음 달</a>
    </div> 

    <script src="./scripts/03_Calender.js"></script>
</body>
</html>
```

### `css`로 꾸며보자.
```css
#calendar_wrap{ 
    background: #333;
    width: 350px;
    text-align: center;
}
caption{ 
    font-size: 1.5em;
    color: orange; 
    padding: 10px;
}
table,th,td{
    color: white;
    border: 1px solid #666;
    border-collapse: collapse;
}
th,td{
     width: 30px; 
     padding: 10px;
}
th:first-child, td:first-child{ 
    color: red;
}	

#prev, #next{
    display: inline-block;
    text-decoration: none;
    color: white; 
    padding: 5px;
}

```


### Javascript로 동적 제어 하자.

> Calendar 함수 정의
```javascript
function calendar(new_year, new_month){
    //매개 변수로 전달 받은 값들로 날짜를 조회한다.
    //해당 년, 해당 월, 1일을 조회한다.
    var d = new Date(new_year, new_month-1, 1);
    //특정 월의 총 일수 구하기
    var d_length = 32 - new Date(new_year, new_month-1, 32).getDate();    
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    var day = d.getDay();
    
    
    var caption_year = document.querySelector('.year');
    var caption_month = document.querySelector('.month');
    var start_day = document.querySelectorAll('tr td');
    
    caption_year.innerHTML = year;
    caption_month.innerHTML = month + 1;

    for(var i = 0; i < start_day.length; i++){
        start_day[i].innerHTML = "&nbsp;";
    }
    // 한 달 치 날짜를 테이블에 시작 요일부터 순서대로 표시
    for(var i = day; i < day + d_length; i++){
        start_day[i].innerHTML = date;
        date++;
    }
}
```
`getMonth`은 0부터 시작하므로 '+1'을 해주어야 합니다.  
첫 번째 `for`문을 통해 모든 칸을 초기화 해줍니다.  
두 번째 `for`문을 통해 날짜를 추가해줍니다. 이 때 '1일의 요일'을 통해 '시작일(1일)' 위치를 지정해 줍니다. `day`에는 해당 요일의 `index(0~6)`가 반환됩니다. 따라서 `for`문에서 `i = day`로 초기화 합니다.
반목문에서 1일부터 해당 월의 최대 일수(d_length)까지 달력에 표시하고 반복이 끝날 때까지 date(일수)를 1씩 증가시킵니다.
`date`는 1부터 시작합니다. (d = new Date(new_year, new_month-1, 1))에서 1이라고 요청했기 때문입니다.

> 즉시 실행 함수
```javascript
(function(){
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    //현재 시점을 기준으로 연도를 가져옴.
    var year = new Date().getFullYear();
    //현재 시점을 기준으로 월을 가져옴.
    var month = new Date().getMonth() + 1;

    //함수 호출
    calendar(year, month);

    prev.onclick = function(){
        calendar(year, --month);
    };
    next.onclick = function(){
        calendar(year, ++month);
    }
})();
```
'즉시 실행 함수'는 익명 함수를 정의해 함수를 즉시 실행하게 합니다. 이렇게 함수로 정의해 놓아야 변수가 전역으로 선언되지 않기 때문에 프로그램의 메모리 관리도 효율적입니다.

### jQuery로 변환해보자.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
```
`head`영역에 제이쿼리 라이브러리를 추가합니다.  

> 변수 선언 및 함수 정의
```js
function calendar(new_year, new_month){
    var d = new Date(new_year, new_month-1, 1);
    var d_length = 32 - new Date(new_year, new_month-1, 32).getDate();  
    var year = d.getFullYear();
    var month = d.getMonth();
    var date = d.getDate();
    var day = d.getDay();
    
    
    var $caption_year = $('.year');
    var $caption_month = $('.month');
    var $start_day = $('tr td');
    
    $start_day.each(function(i){
        $(this).html('&nbsp;');
    });
    
    for(var i = day; i < day + d_length; i++){
        $start_day.eq(i).html(date);
        date++;
    }
    
    $caption_year.html(year);
    $caption_month.html(month + 1);
}

(function(){
    var $prev = $('#prev');
    var $next = $('#next');
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;

    calendar(year, month);

    $prev.click(function(){
        calendar(year, --month);
    });
    $next.click(function(){
        calendar(year, ++month);
    });
})();
```
`each()`메서드는 반복문 입니다. `for`문의 경우 해당 길이를 먼저 알아낸 후 반복을 수행하지만 `each`메서드는 해당 객체의 길이만큼 자동으로 반복합니다.  
`.html()`은 `innerHTML`과 같은 역할을 합니다.
