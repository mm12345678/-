window.onload=function(){
    var div=document.getElementById('div');
    var snake=[];
    var size=20;
    var dir='right';
    var score=document.getElementById('score');
    var time=document.getElementById('time');
    var startGame=document.getElementById('startGame');
    var rank=document.getElementById('rank');
    var Score=0;
    var Time=0;
    var speed=300;
    var Isplaying=true;
    var scoreAudio=document.getElementById('scoreAudio');
    var overAudio=document.getElementById('overAudio');   
    
    //初始化蛇
    function creatSnake(){
        for(var i=0;i<5;i++){
            var span=document.createElement('span');
            div.appendChild(span);
            span.style.left=i*size+'px';
            span.style.top=0;
            snake.push(span);
        }
    }
    
    //蛇移动
    function moveSnake(){
        var head=snake[snake.length-1];
        left=head.style.left;
        TOP=head.style.top;
            if(dir=='right'){
                snake[0].style.left=parseInt(left)+size+'px';
                snake[0].style.top=parseInt(TOP)+'px';
            }
            if(dir=='bottom'){
                snake[0].style.left=parseInt(left)+'px';
                snake[0].style.top=parseInt(TOP)+size+'px';
            }
            if(dir=='left'){
                snake[0].style.left=parseInt(left)-size+'px';
                snake[0].style.top=parseInt(TOP)+'px';
            }
            if(dir=='top'){
                snake[0].style.left=parseInt(left)+'px';
                snake[0].style.top=parseInt(TOP)-size+'px';
            }
            //边缘测试
            if(parseInt(left)>480||parseInt(left)<0||parseInt(TOP)<0||parseInt(TOP)>480){
                clearInterval(t); 
                clearInterval(timecount);
                overAudio.play();
                startGame.disabled=false;
                
            }
            // 碰撞食物检测
            if(parseInt(left)==foodPoint.x&&parseInt(TOP)==foodPoint.y){
                creatFood();
                eatFood();
                gameScore();
            }
            //自身死亡检测
            var deadArea=[];
            for(var i in snake){
                var snakebody={};
                snakebody.x=parseInt(snake[i].style.left);
                snakebody.y=parseInt(snake[i].style.top);
                deadArea.push(snakebody);  
            }
            deadArea.pop();
            for(var i in deadArea){
                if(parseInt(left)==deadArea[i].x&&parseInt(TOP)==deadArea[i].y){
                    overAudio.play();
                    clearInterval(t);
                    clearInterval(timecount);
                    startGame.disabled=false;
                }    
            }
        
        snake.push(snake.shift());  
    }
    //蛇向各个方向移动
    //上：38 下：40 左：37 右：39
    window.onkeydown=function(event){
        if(event.keyCode==38&&dir!='bottom'){
            dir='top'
        }
        if(event.keyCode==39&&dir!='left'){
            dir='right'
        }
        if(event.keyCode==40&&dir!='top'){
            dir='bottom'
        }
        if(event.keyCode==37&&dir!='right'){
            dir='left' 
        }
    }
    //生成食物
    function creatFood(){
        var ele=document.getElementsByTagName('i')[0];
        if(ele){
            console.log(ele);
            div.removeChild(ele);
        }
        var ele=document.createElement('i');
        div.appendChild(ele);
        foodPoint={
            x:Math.round(Math.random()*19)*size,
            y:Math.round(Math.random()*19)*size
        }
        ele.style.left=foodPoint.x+'px';
        ele.style.top=foodPoint.y+'px';   
    }
    
    //蛇吃食物
    function eatFood(){
        var span=document.createElement('span');
        div.appendChild(span);
        span.style.left=snake[0].style.left;
        span.style.top=snake[0].style.top;
        snake.unshift(span);
        scoreAudio.play();
    }
    //得分
    function gameScore(){
        score.style.top= '-25px';
        score.style.opacity=0;
        setTimeout(function(){
            Score+=10;
            score.innerHTML=Score+'分';
            score.style.top= '0';
            score.style.opacity=1;
        },500)   
    }
    //用时
    function gameStartTime(){
        timecount=setInterval(function(){
            Time++;
            time.innerHTML=Time;
            if(Time>60){
                var minute=Math.floor(Time/60);
                var second=Time-minute*60;
                time.innerHTML=minute+'分'+second;
            } 
        },1000)      
    }
       
    //点击按钮开始游戏
    startGame.onclick=function(){
        Score=0;
        Time=0;
        snake=[];
        div.innerHTML='';
        dir='right';
        deadArea=[];
        score.innerHTML=Score;
        time.innerHTML=Time;
        creatSnake();
        creatFood();
        t=setInterval(function(){
            moveSnake();
        },speed)
        gameStartTime();
        this.disabled=true;
        
    }
   
    //选择级别
    rank.onchange=function(){
        speed=this.value;
    }
    
   
    



    
  
}