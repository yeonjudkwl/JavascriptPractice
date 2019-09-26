# 스티키 메모장을 만들어보자.

### 우선 `html`로 메모장 틀을 만들자.

```html
<head>
    <script src="https://kit.fontawesome.com/9dcc861cdf.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script  src="./scripts/jquery-ui.min.js"></script>
<head>
<body>
    <div id="sticky_wrap"></div>
</body>

```
스티키 메모장을 동적으로 추가 또는 삭제하기 위해 `sticky_wrap`내부에 아무런 내용도 작성하지 않았습니다.  
  
`head`태그에 'font-awesome' 아이콘 라이브러리를 등록합니다.  
또한 'jquery' 라이브러리와 'jquery-ui'라이브러리를 등록합니다.    
'jquery-ui'는 마우스 드래그 기능을 추가하기 위한 라이브러리입니다.

> 메모장 초기화
```javascript
$(function(){
    //메모장 정의
    var sticky_html = 
    `<div class="sticky">
        <nav class="top_nav">
            <a href="#" class="add"><i class="fa fa-plus"></i></a>
            <a href="#" class="save"><i class="fa fa-floppy-o"></i></a>
            <div class="right">
                <a href="#" class="get"><i class="fa fa-list"></i></a>
                <a href="#" class="del"><i class="fa fa-times"></i></a>
            </div>
        </nav>
        <textarea name="txt" id="" cols="30" rows="10" class="txt"></textarea>
        <nav class="side_nav"><ol></ol></nav>
    </div>`;
    //메모장 초기화
    $('#sticky_wrap').append(sticky_html);    
});
```
변수에 메모장을 정의하고, `append()` 메서드를 이용해 `#sticky_wrap` 안에 동적으로 추가합니다.

### `css`로 꾸며보자.
```css
*{
    margin: 0;
    padding: 0;
}
#sticky_wrap{
    position: fixed;
    width: 100%;
    height: 100%;
}
.sticky{
    position: absolute;
    left: 50px;
    top: 50px;
    width: 250px;
    height: 300px;
    background-color: #fef098;
    border: 1px solid #ccc;
    box-shadow: 5px 5px 20px rgba(0,0,0,.3);
    margin-bottom: 32px;
    overflow: hidden;
    opacity: .8;
}
.sticky:hover{
    opacity: 1;
}
/* top nav */
.sticky > .top_nav{
    height: 32px;
    line-height: 32px;
}
.sticky > .top_nav  a{
    padding: 0 5px;
    color: #666;
    text-decoration: none;
}
.sticky > .top_nav  a:hover{
    color: #fff4b6;
    background: #666;
}
.sticky > .top_nav > a.add{
    float: left;
}
.sticky > .top_nav > .right{
    float: right;
}
/* textarea */
.sticky > textarea{
    padding: 10px;
    box-sizing: border-box;
    width: inherit;
    height: inherit;
    background: lightyellow;
    border: none;
    resize: none;
}
/* side_nav */
.sticky > .side_nav{
    position: absolute;
    left: -100%;
    top: 0;
    width: 70%;
    height: 100%;
    background: rgba(0,0,0,.6);
    color: white;
    box-sizing: border-box;
    padding-top: 32px;
    list-style: none;
    overflow: auto;
    transition: 0.5s;
}
.sticky > .side_nav.active{
    left: 0%;
}
.sticky > .side_nav li{
    padding: 5px 10px;
    border-bottom: 1px solid rgba(255,255,255,.3);
}
.sticky > .side_nav li:hover{
    background: #333;
    color: white;
}
.sticky > .side_nav li i{
    float: right;
}
```


### Javascript로 동적 제어 하자.

> 버튼 기능 객체

```javascript
$(function(){
    var Sticky ={
        add: function(){
            ...
        },
        save: function(current_memo){
            ...
        },
        get: function(current_memo){
            ...
        }
    };
});
```
`sticky`객체에 `add()`, `save()`, `get()` 메서드를 정의합니다.

> add 메서드 정의
```javascript
$(function(){
    var Sticky ={
        add: function(){
            var win_width = $('#sticky_wrap').width() - 250,
                win_height = $('#sticky_wrap').height() - 300,
                x = Math.random() * win_width,
                y = Math.random() * win_height;

                $('#sticky_wrap').append(sticky_html);

                var $new_sticky = $('.sticky').last();

                $new_sticky.css({
                    left: parseInt(x)+'px',
                    top: y
                });
                $('.sticky').css('zIndex','0');
                $new_sticky.css('zIndex','99');
        },
    };
    
    // 이벤트 정의
    $('#sticky_wrap').on('click','.add',function(){
        Sticky.add();
    }); 
});
```
새로 추가하는 메모장을 부모인 `#sticky_wrap`의 창 범위(`win_width` `win_height`) 안에서 임의로 출력시킵니다.  
이때 메모장이 출력되는 좌표 기준점은 박스의 좌측 상단입니다.  
'win_width = $('#sticky_wrap').width() - 250,'은 `.sticky`의 좌측 상단 기준점에서 `width`값만큼 공간을 확보하는 계산식입니다. 높이값도 이와 같이 계산합니다.     

우선 '$('#sticky_wrap').append(sticky_html)'로 새로운 메모 객체를 추가합니다. 이때 초기 메모장과 같은 위치에 추가됩니다.     

`.sticky`의 마지막 객체(가장 최근에 추가된 객체)를 `$new_sticky`변수에 저장한 후, 랜덤 좌표값으로 위치를 선정하고 `z-index`값으로 레이어를 가장 위로 지정합니다.

다음으로 이벤트를 정의해야 합니다. 동적으로 생성된 요소의 경우 이벤트 핸들러가 동작하지 않습니다. 따라서 부모요소에 이벤트를 정의하여 새로 생성된 문서를 재탐색해야 합니다.
메모장 추가 버튼`.add`을 클릭하면 `add()` 메서드를 실행합니다.


> save 메서드 정의
```javascript
$(function(){
    var Sticky ={
        add: function(){
            ...
        },
        save: function(current_memo){
            var txt = current_memo.val();

            if(txt !== ""){
                var key = prompt('제목을 입력하세요');
                localStorage.setItem(key,txt);
            }
        },
    };

    // 이벤트 정의
    $('#sticky_wrap').on('click','.save',function(){
        var current_memo = $(this).parent().siblings('.txt');
        Sticky.save(current_memo);
    });
});
```
매개변수로 받은 '글 영역'에서 `value`값을 `txt`변수에 저장합니다.  
만약 `txt`변수가 공백이 아니라면 `key`에 제목을 지정한 후, 로컬스토리지에 저장합니다.
  
마찬가지로 이벤트를 정의합니다.

'$(this).parent()'는 `.save`의 부모노드를 가리키므로 `.top_nav`입니다.  
'$(this).parent().siblings()'은 `.top_nav`의 형제노드이므로 `.txt` `.side_nav`를 가리킵니다.  
따라서 `current_memo`변수에는 textarea 객체가 저장됩니다.


> get 메서드 정의
```javascript
$(function(){
    var Sticky ={
        add: function(){
            ...
        },
        save: function(current_memo){
            ...
        },
        get: function(current_memo){
            var key;
            var del_icon = '<i class="fa fa-trash"></i>';

            current_memo.find('ol').empty();
            current_memo.toggleClass('active'); //활성화

            for(var i = 0; i < localStorage.length; i++){
                key = localStorage.key(i);
                current_memo.find('ol').append('<li>' + key + del_icon + '</li>');
            }
        }
    };

    // 이벤트 정의
    $('#sticky_wrap').on('click','.get',function(){
        var current_memo = $(this).parents('.top_nav').siblings('.side_nav');
        Sticky.get(current_memo);
    });
});
```
매개변수로 `side_nav`객체를 받습니다.  
'current_memo.find('ol').empty()'는 `<ol>`태그안의 '내용(`<li>`)'을 삭제합니다. 이는 `.get`버튼을 클릭할 때 초기화하는 작업입니다. 만약 이 작업이 이루어지지 않는다면 버튼을 클릭할 때마다 같은 내용의 목록들이 누적되어 출력될 것입니다.    
'current_memo.toggleClass('active')'로 nav바를 슬라이드 실행합니다.(활성화)    
비워진 `<ol>`태그에 `for` 반복문으로 목록을 추가합니다. 로컬스토리지의 `key`값을 목록의 제목으로 지정합니다.  
즉, 기존 목록 비우고 슬라이드 닫은 후 다시 목록을 추가하는 작업입니다.
  
마찬가지로 이벤트를 정의합니다.

'$(this).parents('.top_nav')'는 조상노드에서 `.top_nav`를 가리킵니다. 그리고 '$(this).parents('.top_nav').siblings('.side_nav')'은 `.top_nav`의 형제노드들 중 `.side_nav`를 가리킵니다. 이 때 `parent(부모)`가 아니고 `parents(조상)`임을 주의합니다. (`div.right`가 부모이므로)

```javascript
$(function(){
    var Sticky ={
        .
        .
        .
        get: function(current_memo){
           .
           .
           .
            current_memo.find('li').click(function(){
                var getDataKey = $(this).text();
                var txt = localStorage.getItem(getDataKey);
                
                current_memo.toggleClass('active'); //비활성화
                
                current_memo.prev('.txt').val(txt);
            });
        }
    };
});
```
다음은 목록의 제목 클릭하면 본문으로 내용 불러오는 작업입니다.  
`<li>`태그를 클릭하면 슬라이드바는 닫히고, 로컬스토리지의 `value`값이 출력됩니다.  
  
'current_memo.prev('.txt')'는 side_nav의 이전 형제 노드이므로 `textarea`를 가리킵니다.
따라서 `textarea`에 로컬스토리지의 `value`값을 출력합니다.

```javascript
$(function(){
    var Sticky ={
        .
        .
        .
        get: function(current_memo){
           .
           .
           .
            current_memo.find('li > i').click(function(){
                var key = $(this).parent().text();
                var ok = confirm('해당 메모를 삭제할까요?');
                if(ok){
                    localStorage.removeItem(key);
                }
            });
        }
    };
});
```
목록 삭제하는 작업을 추가하겠습니다.  
`<i>`를 클릭하면 로컬스토리지 값이 삭제됩니다.  

```javascript
    //이벤트 정의
    $('#sticky_wrap').on('click','.del',function(){
        $(this).parents('.sticky').remove(); 
    });
```
메모 객체를 삭제하는 기능을 추가하겠습니다.  
`.del`을 클릭하면 조상노드에서 `.sticky`를 찾고 `remove()`메서드를 통해 삭제합니다. 이 때 `parent(부모)`가 아니고 `parents(조상)`임을 주의합니다. (`div.right`가 부모이므로)


```javascript
    //이벤트 정의
    $('#sticky_wrap').on('click','.sticky',function(){
        $('.sticky').css('zIndex','0');
        $(this).css('zIndex','99');
    });
```
메모 객체를 클릭하면 레이어를 가장 위로 지정합니다.


```javascript
    //이벤트 정의
    $('#sticky_wrap').on('mouseover','.top_nav',function(){
        $(this).parent().draggable();
    });
```
마지막으로 '제이쿼리 UI 라이브러리'를 활용하여  메모장을 이동시키는 기능을 추가합니다.
'$(this).parent()'는 `.top_nav`의 부모이므로 `.sticky` 메모 객체 입니다.