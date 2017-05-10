var xPad=260,yPad=410,w=80,h=15,levo=0,desno=0;
var xTopce=300,yTopce=395, Radius=10, dx=2,dy=-2;
var brRedovi= 5, brKoloni = 10, tuliSirina=49, tuliVisina=20, mestoTuli=10, mestoLevo=10, mestoGore=40;
var rez=0;
var pocetok=1;
var pauza=false;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
pad_image = new Image();
pad_image.src = 'img/brick1.png';
tuli_image = new Image();
tuli_image.src = 'img/brickHtml.png'
poz_image = new Image();
poz_image.src = 'img/back.png';
var inter;
var tuli = [];
for(c=0; c<brRedovi; c++) {
    tuli[c] = [];
    for(r=0; r<brKoloni; r++) {
        tuli[c][r] = { x: 0, y: 0, postoj:true };
    }
}
window.onload = function() {
    ctx.drawImage(poz_image, 0, 0);
    ctx.font = "36px Berlin Sans FB";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("WELCOME!", canvas.width / 2, canvas.height / 2 - 40);
    ctx.fillText("PRESS \"N\" FOR NEW GAME", canvas.width / 2, canvas.height / 2);
    ctx.fillText("PRESS \"P\" FOR PAUSE", canvas.width / 2, canvas.height / 2 + 40);
}
function main(){
    inter=setInterval(draw,10);
}
document.addEventListener("keydown", onKeyDown, false);
document.addEventListener("keyup", onKeyUp, false);
function onKeyDown(evt){
    if(evt.which=="37"){
        levo=1;
    }
    if(evt.which=="39"){
        desno=1;
    }
    if(evt.which=="78" && pocetok==1){
        main();
        pocetok=0;
    }
    if(evt.which=="78" && kraj==1){
        xPad=260,yPad=410,w=80,h=15,levo=0,desno=0;
        xTopce=300,yTopce=395, Radius=10, dx=2,dy=-2;
        brRedovi= 5, brKoloni = 10, tuliSirina=49, tuliVisina=20, mestoTuli=10, mestoLevo=10, mestoGore=40;
        rez=0;
        kraj=0;
        for(c=0; c<brRedovi; c++) {
            tuli[c] = [];
            for(r=0; r<brKoloni; r++) {
                tuli[c][r] = { x: 0, y: 0, postoj:true };
            }
        }
        main();
    }
    if(evt.which=="80")
        pauza=!pauza;
}
function onKeyUp(evt) {
    if (evt.which == "37")
        levo = 0;
    if (evt.which == "39")
        desno = 0;
}
function draw(){
    if(pauza==false){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawPad();
    drawTopce();
    drawTuli();
    drawRezultat();
    if(xTopce + dx == 600-Radius || xTopce + dx == Radius)
        dx = -dx;
    if(yTopce + dy < Radius)
        dy = -dy;
    if(yTopce + dy > 450-Radius){
        clearInterval(inter);
        ctx.drawImage(poz_image,0,0);
        ctx.font = "36px Berlin Sans FB";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER!", canvas.width/2, canvas.height/2-20);
        ctx.fillText("PRESS \"N\" FOR NEW GAME", canvas.width/2, canvas.height/2+20);
        kraj=1;
        var person = prompt("Enter Name:","enter name here");
        if(person!=null){
            document.getElementById("n3").innerHTML = document.getElementById("n2").innerHTML;
            document.getElementById("n2").innerHTML = document.getElementById("n1").innerHTML;
            document.getElementById("s3").innerHTML = document.getElementById("s2").innerHTML;
            document.getElementById("s2").innerHTML = document.getElementById("s1").innerHTML;
            document.getElementById("n1").innerHTML = person;
            document.getElementById("s1").innerHTML = ""+rez;
        }
    }
    for(c=0; c<brRedovi; c++) {
        for (r = 0; r < brKoloni; r++){
            if(tuli[c][r].postoj==true) {
                if (proverka(xTopce, yTopce, Radius, tuli[c][r].x, tuli[c][r].y, tuliSirina, tuliVisina) == true) {
                    tuli[c][r].postoj = false;
                    dy = -dy;
                    rez++;
                    if(rez==50){
                        clearInterval(inter);
                        ctx.drawImage(poz_image,0,0);
                        ctx.font = "36px Berlin Sans FB";
                        ctx.fillStyle = "black";
                        ctx.textAlign = "center";
                        ctx.fillText("YOU WON!", canvas.width/2, canvas.height/2-20);
                        ctx.fillText("PRESS \"N\" FOR NEW GAME", canvas.width/2, canvas.height/2+20);
                        kraj=1;
                        var person = prompt("Enter Name:","enter name here");
                        if(person!=null){
                            document.getElementById("n3").innerHTML = document.getElementById("n2").innerHTML;
                            document.getElementById("n2").innerHTML = document.getElementById("n1").innerHTML;
                            document.getElementById("s3").innerHTML = document.getElementById("s2").innerHTML;
                            document.getElementById("s2").innerHTML = document.getElementById("s1").innerHTML;
                            document.getElementById("n1").innerHTML = person;
                            document.getElementById("s1").innerHTML = ""+rez;
                        }
                    }
                }
            }
        }
    }
    if(proverka(xTopce,yTopce,Radius,xPad,yPad,w,h)==true){
        dy=-Math.abs(dy);
        if(xTopce<=xPad)
            dx=-dx;
        if(xTopce>=xPad+w)
            dx=-dx;
    }
        if(desno==1 && xPad<520)
            xPad+=5;
        if(levo==1 && xPad>0)
            xPad-=5;
        xTopce+=dx;
        yTopce+=dy;
    }
}
function drawTopce(){
    ctx.beginPath();
    ctx.arc(xTopce,yTopce,Radius,0,Math.PI*2);
    ctx.fillStyle="rgb(43,43,43)";
    ctx.fill();
    ctx.closePath();
}
function drawPad(){
    ctx.drawImage(poz_image,0,0);
    ctx.drawImage(pad_image, xPad, yPad,w,h);
}
function drawTuli(){
    for(c=0; c<brRedovi; c++) {
        for (r = 0; r < brKoloni; r++) {
            if(tuli[c][r].postoj==true) {
                var tulaX = (r * (tuliSirina + mestoTuli)) + mestoLevo;
                var tulaY = (c * (tuliVisina + mestoTuli)) + mestoGore;
                tuli[c][r].x = tulaX;
                tuli[c][r].y = tulaY;
                ctx.drawImage(tuli_image,tulaX,tulaY,tuliSirina,tuliVisina);
            }
        }
    }
}
function drawRezultat(){
    ctx.font="18px Berlin Sans FB";
    ctx.fillStyle="black";
    ctx.fillText("Score: "+rez, 300, 30);
}
function proverka(Ax,Ay,Ar,Bx,By,Bw,Bh){
    if (Ay + Ar <= By) return false;
    else if (Ay - Ar >= By + Bh) return false;
    else if (Ax + Ar <= Bx) return false;
    else if (Ax - Ar >= Bx + Bw) return false;
    return true;
}