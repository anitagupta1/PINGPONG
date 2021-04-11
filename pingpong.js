const canvas= document.getElementById('canvas');
const ctx=canvas.getContext('2d');
function clear(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
}
    
const ball={
    x:canvas.width/2,
    y:canvas.height/2,
    size:20,
    dx:4,
    dy:3
};
const paddle={
x:canvas.width/2-40,
y:canvas.height-20,
w:80,
h:15,
speed:5,
dx:0,
dy:0
};
let scr=0;
function drawball(){
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.size,0,Math.PI*2,true);     
    //ctx.arc(200,100,20,0,Math.PI*2,true);     
    ctx.fillStyle='blue';
    ctx.fill();
 }
 function newpos(){
     paddle.x+=paddle.dx;
     paddle.y+=paddle.dy;
     detectpaddlewall();
 }
 function detectpaddlewall(){
     if(paddle.x<0){
         paddle.x=0;
     } if(paddle.x+paddle.w>canvas.width){
         paddle.x=canvas.width-paddle.w;
     }
 }
 function drawpaddle(){
     ctx.beginPath();
     ctx.fillStyle='black'
     ctx.fillRect(paddle.x,paddle.y,paddle.w,paddle.h);
     ctx.fill();

 }
 function startgame(){
    ball.x+=ball.dx;
    ball.y+=ball.dy;
    if(ball.x+ball.size>canvas.width||ball.x-ball.size<0){
        ball.dx*=-1;
    }
    if(ball.y-ball.size<0){
        ball.dy*=-1;
    }
    if (ball.x>=paddle.x&&ball.y+ball.size>=canvas.height-20
        &&ball.y+ball.size<=canvas.height-2
        &&ball.x-ball.size-2<=paddle.x+paddle.w){
           ball.dy*=-1;
               scr+=10;
        }
    else if(ball.y+ball.size>canvas.height){
        ctx.fillStyle = "red";
        ctx.font = "bold 16px Arial";
        ctx.fillText('GAME OVER',canvas.width/2-40,canvas.height/2)
        clearInterval(game);
        
        
        
    }
 
 }
 function animate(){
     clear();
    drawball();
    drawpaddle();
    newpos();
    

        ctx.fillStyle = "black";
        ctx.font = "bold 13px Arial";
        ctx.fillText("SCORE:",canvas.width/2,20);
        ctx.fillText(scr,canvas.width/2+100,20);
        startgame();

 }
 let game=setInterval(animate,20);
 function moveleft(){
     paddle.dx=-paddle.speed;
    }
    function moveright(){
        paddle.dx=paddle.speed;
    }
    function keylr(e){
        if(e.key==='Left'||e.key==='ArrowLeft'){
            moveleft();
        }else if(e.key==='Right'||e.key==='ArrowRight'){
            moveright();
        }
        
    }
    function keycontrol(e){
        if(e.key==='Left'||
        e.key==='ArrowLeft'||
        e.key==='Right'||
        e.key==='ArrowRight'){
            paddle.dx=0;
            paddle.dy=0;
        }
    }
    animate();
 document.addEventListener('keydown',keylr);
 document.addEventListener('keyup',keycontrol);

