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

/*------------------------
雪の設定
-------------------------*/
// 雪の粒を保存する配列
const snows = [];

// 雪の粒の初期位置とサイズの設定
function snow() {
  this.position_x = getRandomInt(0, wd_width);
  this.position_y = getRandomInt(0, wd_height);
  this.snow_size = getRandomInt(1, 5);
  this.speed = getRandomInt(1, 2); //落下速度
  this.wind = getRandomInt(0, 0.5);　 //横風の強さ
}

// 雪の粒の描画
snow.prototype.draw = function() {
  var snow_grad = ctx.createRadialGradient(
    this.position_x,
    this.position_y,
    this.snow_size * 0.6,
    this.position_x,
    this.position_y,
    this.snow_size
  );
  /* グラデーション終点のオフセットと色をセット */
  snow_grad.addColorStop(0, 'rgba(230, 230, 230, 0.8)');
  snow_grad.addColorStop(0.5, 'rgba(230, 230, 230, 0.2)');
  snow_grad.addColorStop(1, 'rgba(230, 230, 230, 0.1)');
  ctx.beginPath();
  ctx.fillStyle = snow_grad; // グラデーションをfillStyleプロパティにセット
  ctx.arc(this.position_x, this.position_y, this.snow_size, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}
  // 雪の粒の移動
snow.prototype.move = function () {
  this.position_x += this.wind + Math.sin(this.position_y / 20) * 0.3;
  this.position_y += this.speed;

  if (this.position_y > ctx.canvas.height) {
    this.position_y = 0;
    this.position_x = getRandomInt(0, wd_width);
  }
}

// 雪の粒の密度(雪の量)
function snow_density(snow_count) {
  for (var num = 0; num < snow_count; num++) {
    snows[num] = new snow();
  }
}



/*------------------------
雪を降らす処理
-------------------------*/
//雪の粒を描画する
function snow_draw() {
  canvas_resize();
  ctx.clearRect(0, 0, wd_width, wd_height);
  for (var num = 0; num < snows.length; num++) {
    snows[num].draw();
  }
}

//雪の粒の座標を更新する
function snow_move() {
  for (var num = 0; num < snows.length; num++) {
    snows[num].move();
  }
}

//ループ処理
function snowy() {
  snow_draw();
  snow_move();
  animFrame(snowy);
}

var snow_count = 75;
if (window.innerWidth <= 750) {
  snow_count = 30;
}

snow_density(snow_count); //雪の量の指定
snowy();
