/*------------------------
canvas要素の取得と設定
-------------------------*/
//canvas要素の取得
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//canvasサイズの設定
var wd_width = window.innerWidth;
var wd_height = window.innerHeight;
ctx.canvas.width  = wd_width;
ctx.canvas.height = wd_height;

/*------------------------------------------------
ループ処理「requestAnimFrame」のベンダープレフィクス
-------------------------------------------------*/
var animFrame = window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
              window.setTimeout(callback, 1000 / 60);
            };

/*------------------------
canvasサイズを可変にする
-------------------------*/
function canvas_resize(){
  var rswd_width = window.innerWidth;
  var rswd_height = window.innerHeight;

  canvas.setAttribute('width',rswd_width);
  canvas.setAttribute('height',rswd_height);
}
//リサイズイベントを拾って実行
window.addEventListener('resize',canvas_resize,false);
canvas_resize();

/*----------------------------
min から max までの乱整数を返す
-----------------------------*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//canvasサイズの設定
var wd_width = window.innerWidth;
var wd_height = window.innerHeight;
ctx.canvas.width  = wd_width;
ctx.canvas.height = wd_height;
var imgCnt = 40;          // 描画する画像の数
if (window.innerWidth <= 750) {
  imgCnt = 20;
}
var aryImg = [];          // 画像の情報を格納
var cvsw = window.innerWidth;           // canvasタグに指定したwidth
var cvsh = window.innerHeight;           // canvasタグに指定したheight
var imgBaseSizeW = 10;    // 画像の基本サイズ横幅
var imgBaseSizeH = 10;  // 画像の基本サイズ立幅
var aspectMax = 1.5;      // アスペクト比計算時の最大値
var aspectMin = 0.5;      // アスペクト比計算時の最小値
var speedMax = 1;         // 落下速度の最大値
var speedMin = 0.5;       // 落下速度の最小値

// 画像の読み込み
var img = new Image();
img.src = "data:image/svg+xml;base64,PCEtLT94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPy0tPgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+Cgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9Il94MzJfIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJ3aWR0aDogMjU2cHg7IGhlaWdodDogMjU2cHg7IG9wYWNpdHk6IDE7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4KCS5zdDB7ZmlsbDojNEI0QjRCO30KPC9zdHlsZT4KPGc+Cgk8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDU4LjA3MSwzMDYuMjczbC05LjUxOS0yMS41NzlsLTY1Ljg4NSwyOS4wN2wtNDMuMTAzLTI0Ljg5OWw3NC42MDctMzIuODc5bC03NC41ODktMzIuODdsNDMuMDg1LTI0Ljg2MwoJCWw2NS44ODUsMjkuMDdsOS41MzYtMjEuNjI0bC01MC4wODgtMjIuMTAzbDc2LjM2My00NC4wNTNsLTEzLjMxOC0yMy4wNDRsLTc2LjM2Miw0NC4wOGw1LjkxNy01NC40MjJsLTIzLjQ3LTIuNTYxbC03Ljc4Miw3MS41NzYKCQlsLTQzLjA4NSwyNC44OWw4LjgzLTgxLjAyMmwtNjUuNzc3LDQ4LjE1MlYxMTcuNDNsNTguMTIzLTQyLjU0MmwtMTMuOTM0LTE5LjA1NWwtNDQuMTksMzIuMzU0VjBoLTI2LjZ2ODguMTg3bC00NC4xNy0zMi4zNTQKCQlsLTEzLjk1MiwxOS4wNTVsNTguMTIyLDQyLjU0MnY0OS43NjJsLTY1Ljc3Ny00OC4xMzRsOC43OTUsODAuOTk1bC00My4wNDktMjQuODgybC03Ljc5OS03MS41NzZsLTIzLjQ3LDIuNTYxbDUuOTE2LDU0LjQyMgoJCWwtNzYuMzQ0LTQ0LjA4bC0xMy4zMTgsMjMuMDQ0bDc2LjM2Myw0NC4wNTNsLTUwLjA4OCwyMi4xMDNsOS41MTksMjEuNjI0bDY1Ljg2Ny0yOS4wN2w0My4xMjIsMjQuODYzbC03NC41OSwzMi44ODhsMjQuNTAxLDEwLjgwMwoJCWw1MC4wODksMjIuMDc2bC00My4xMDQsMjQuODgybC02NS44ODUtMjkuMDdsLTkuNTM2LDIxLjU3OWw1MC4xMDYsMjIuMTEybC03Ni4zOTksNDQuMDk5bDEzLjM1NCwyMy4wNTRsNzYuMzYzLTQ0LjA5OAoJCWwtNS45MzUsNTQuNDEybDIzLjQ3LDIuNTUxbDcuNzgxLTcxLjU5NGw0My4wNjgtMjQuODYzbC04LjgxMyw4MS4wMTNsNjUuNzk0LTQ4LjE1MXY0OS43NzFsLTU4LjEyMiw0Mi41MjVsMTMuOTUyLDE5LjAzNgoJCWw0NC4xNy0zMi4zMjhWNTEyaDI2LjZ2LTg4LjE4OGw0NC4xOSwzMi4zMjhsMTMuOTM0LTE5LjAzNmwtNTguMTIzLTQyLjU0MnYtNDkuNzM2bDY1Ljc3Nyw0OC4xNDNsLTguODEyLTgxLjAyMmw0My4wNjcsMjQuODYzCgkJbDcuODE4LDcxLjU5NGwyMy40MzQtMi41NTFsLTUuOS01NC40MTJsNzYuMzQ1LDQ0LjA5OGwxMy4zMTgtMjMuMDU0bC03Ni4zODEtNDQuMDk5TDQ1OC4wNzEsMzA2LjI3M3ogTTE1Ni4zODUsMjU2LjAwNAoJCWw0MS4zNjYtMTguMjRsMzEuNjMxLDE4LjI0bC0zMS42MTIsMTguMjY4TDE1Ni4zODUsMjU2LjAwNHogTTI0Mi43MTgsMzE1LjU1NmwtMzYuNTM0LDI2LjcyN2w0LjkwNC00NC45NThsMzEuNjMtMTguMjY3VjMxNS41NTZ6CgkJIE0yNDIuNzE4LDIzMi45NDJsLTMxLjYzLTE4LjI1bC00LjkwNC00NC45NjdsMzYuNTM0LDI2LjcxOFYyMzIuOTQyeiBNMjY5LjMxOCwxOTYuNDQzbDM2LjUzNS0yNi43MThsLTQuOTIyLDQ0Ljk2N2wtMzEuNjEzLDE4LjI1CgkJVjE5Ni40NDN6IE0yNjkuMzE4LDMxNS41NTZ2LTM2LjQ5OGwzMS42MTMsMTguMjY3bDQuOTIyLDQ0Ljk1OEwyNjkuMzE4LDMxNS41NTZ6IE0zMTQuMjQ4LDI3NC4yNzJsLTMxLjYxMi0xOC4yNjhsMzEuNjMxLTE4LjI0CgkJbDQxLjM4NCwxOC4yNEwzMTQuMjQ4LDI3NC4yNzJ6IiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyI+PC9wYXRoPgo8L2c+Cjwvc3ZnPgo=";
img.onload = flow_start;

// 画像のパラメーターを設定
function setImagas(){
  var aspect = 0;
  for(var i = 0;i < imgCnt;i++){
    // 画像サイズに掛けるアスペクト比を0.5~1.5倍でランダムで生成
    aspect = Math.random()*(aspectMax-aspectMin)+aspectMin;
    aryImg.push({
      "posx": Math.random()*cvsw,   // 初期表示位置x
      "posy": Math.random()*cvsh,   // 初期表示位置y
      "sizew": imgBaseSizeW*aspect, // 画像の横幅
      "sizeh": imgBaseSizeH*aspect, // 画像の縦幅
      "speedy": Math.random() * (speedMax - speedMin) + speedMin,　// 画像が落ちていく速度
      "angle": getRandomInt(0, 0.2),
    });
  }
}

// 描画、パラメーターの更新
var idx = 0;
function flow() {
  canvas_resize();
  ctx.clearRect(0,0,cvsw,cvsh);
  for (idx = 0; idx < imgCnt; idx++){
    aryImg[idx].posx += aryImg[idx].angle + Math.sin(aryImg[idx].posy / 20) * 0.3;
    aryImg[idx].posy += aryImg[idx].speedy;
    ctx.drawImage(img, aryImg[idx].posx, aryImg[idx].posy, aryImg[idx].sizew , aryImg[idx].sizeh);
    // 範囲外に描画された画像を上に戻す
    if(aryImg[idx].posy >= cvsh){
      aryImg[idx].posy = -aryImg[idx].sizeh;
    }
  }
}

function flow_start() {
  setImagas();
  setInterval(flow,10);
}
