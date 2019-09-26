q# 퀴즈를 만들어보자.

### 우선 `html`로 틀을 만들자.

```html
<!DOCTYPE html>
<html lang="ko-KR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Quiz</title>
</head>
<body>
    <div class="grid">
        <h1>퀴즈</h1>
        <div id="quiz">
            <p id="question"></p>

            <div class="buttons">
                <button class="btn"></button>
                <button class="btn"></button>
                <button class="btn"></button>
                <button class="btn"></button>
            </div>

            <footer>
                <p id="progress">진행정보</p>
            </footer>
        </div>
    </div>
</body>
</html>
```

### `css`로 꾸며보자.
```css
<style>
    .grid{
        width: 600px;
        margin: 50px auto;
        background-color: #fff;
        padding: 10px 50px 30px 50px;
        border: 2px solid #eed0dc;
        border-radius: 20px;
        box-shadow: 5px 5px 5px #cbcbcb;
        text-align: center;
    }
    #quiz{
        text-align: center;
    }
    .grid #question{
        background-color: #c34c74;
        color: #fff;
        padding: 10px 2em;
        border-radius: 15px;
        text-align: left;
    }
    .buttons{
        padding: 30px 20px;
        border: 2px solid #eed0dc;
        border-radius: 20px;
    }
    .btn{
        width: 250px;
        font-size: 16px;
        border: 1px solid #ffe3ed;
        margin: 10px 40px 20px 0px;
        padding: 10px;
        transition: 0.5s;
    }
    .btn:nth-child(even){
        margin-right: 0;
    }
    .btn:hover{
        cursor: pointer;
        background-color: #c34c74;
        color: white;
    }
    .btn:focus{
        outline: 0;
    }
</style>
```


### Javascript로 동적 제어 하자.

> 문제 객체 (생성자 함수)
```javascript
    function Question(text, choice, answer){
        this.text = text;
        this.choice = choice;   //배열
        this.answer = answer;
    }
```
문제를 출제하기 위해서는 `text: 질문하는 텍스트`, `choice: 선택지 4가지`, `answer: 정답`3가지 프로퍼티가 필요합니다.

> 퀴즈 정보 객체 (생성자 함수)
```javascript
    function Quiz(questions){
        this.questions = questions;
        this.score = 0;
        this.questionIndex = 0;
    }
```
퀴즈 정보에는 `문제 데이터 집합 (배열)`, `점수`, `문제 번호` 프로퍼티가 필요합니다.

> Question의 인스턴스 (문제 데이터)
```javascript
    var questions = [
        new Question('다음 중 최초의 상용 웹 브라우저는?', ['모자이크', 'IE', '크롬', '넷스케이프'], '넷스케이프'),
        new Question('웹 문서에서 스타일을 작성하는 언어는?', ['HTML', 'jQuery', 'CSS', 'Javascript'], 'CSS'),
        new Question('명령어 기반의 인터페이스를 의미하는 용어는?', ['GUI', 'CLI', 'SI', 'HUD'], 'CLI'),
        new Question('CSS 속성 중 글자의 굵기를 변경하는 속성은?', ['font-size', 'font-style', 'font-weight', 'font-family'], 'font-weight'),
    ];
```

> Quiz의 인스턴스
```javascript
     var quiz = new Quiz(questions);
```

> 문제 출력 함수
```javascript
     function update_quiz(){
        var question = document.getElementById('question');
        var choice_btn = document.querySelectorAll('.btn');
        var idx = quiz.questionIndex + 1;
        var quiz_questions_idx = quiz.questions[quiz.questionIndex];

        question.innerHTML = `문제 ${idx}) ${quiz_questions_idx.text}`;

        for(var i=0; i<quiz_questions_idx.choice.length; i++){
            choice_btn[i].innerHTML = quiz_questions_idx.choice[i];
        }
    }

    update_quiz();
```
질문이 표시되는 영역(`#question`)과 선택지가 표시되는 영역(`.btn`)에 지정된 문제를 출력합니다.

> 정답 판정 (메서드)
```javascript
     Quiz.prototype.correctAnswer = function(answer){
        return answer == this.questions[this.questionIndex].answer;
    }; 
```
Quiz 생상자 함수의 프로토타입에 메서드를 추가합니다.  
매개변수로 받은 값(사용자가 선택한 답)과 문제 객체의 `answer` 프로퍼티 값을 비교합니다.

> 입력 및 정답 확인 함수
```javascript
    var btn = document.querySelectorAll('.btn');

    function checkAnswer(i){
        btn[i].addEventListener('click',function(){
            var answer = btn[i].innerText;

            if(quiz.correctAnswer(answer)){
                alert('정답입니다.');
                quiz.score++;
            }else{
                alert('틀렸습니다.');
            }
        });
    }

    for(var i = 0; i < btn.length; i++){
        checkAnswer(i);
    }
```
`for문`으로 4개의 버튼에 각각 별도의 이벤트 리스너를 적용해 줍니다.  
해당 버튼 입력 여부에 따라 `checkAnswer()` 함수를 호출합니다.  
    
클릭 된 버튼의 `text`값을 `answer`변수에 저장한 후, `correctAnswer()`함수의 매개변수에 전달합니다.

> 다음 문제로 진행 및 결과 처리
```javascript
    var btn = document.querySelectorAll('.btn'); 
    
    function checkAnswer(i){
            .
            .
            .

            if(quiz.questionIndex < quiz.questions.length-1){
                quiz.questionIndex++;
                update_quiz();
            }else{
                result();
            }
        });
    }
```
`quiz.questionIndex`(현재 문제 번호)와`quiz.questions.length`(총 문항수)를 비교하여 다음 문항으로의 진행 여부를 판단합니다.


> 문제 진행 정보 함수
```javascript
    function progress(){
        var progress = document.getElementById('progress');
        progress.innerHTML = (quiz.questionIndex+1)+'/'+quiz.questions.length;
    }

    function update_quiz(){
        .
        .
        .
         progress();
    }
```
문제 진행 정보 함수를 정의한 후, `update_quiz()`에서 `progress()`를 호출합니다.


> 결과 표시 함수
```javascript
    function result(){
        var quiz_div = document.getElementById('quiz');
        var per = parseInt((quiz.score*100)/quiz.questions.length);
        var txt = `<h1>결과</h1>`+`<h2 id="score">점수: ${quiz.score} / ${quiz.questions.length} <br><br> ${per} 점</h2>`;
        
        if(per < 60){
            txt += '<h2>더 분발하세요 </h2>';
        }else if(per>=60 && per<80){
            txt += '<h2>무난한 점수네요 </h2>';
        }else if(per>=80){
            txt += '<h2>훌륭합니다. </h2>';
        }
        quiz_div.innerHTML = txt;
    }    
```
백분율로 환산한 점수(맞춘 문항수 * 100 / 총 문항수)를 변수 per에 대입합니다.  
txt 변수에 결과 표수 정보를 저장한 후, 출력합니다.