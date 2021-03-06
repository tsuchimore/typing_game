  (function() {
    'use strict';

    var words = [
      'apple',
      'imagine',
      'supply',
      'fun',
      'happy',
      'air',
      'sky'
    ];
    var currentWord;
    var currentLocation;
    var score;
    var miss;
    var timer;
    var target = document.getElementById('target');
    var scoreLabel = document.getElementById('score');
    var missLabel = document.getElementById('miss');
    var timerLabel = document.getElementById('timer');
    var isStarted;
    var timerId;
    var GAME_WIDTH = 640;
    var GAME_HEIGHT = 360;
    var player = {
      x: 10,
      y: 160,
      speedX: 2.5,
      isMoving: 0,
      w: 40,
      h: 40
    };

      //the goal object
    var goal = {
      x: 580,
      y: 160,
      w: 50,
      h: 36
    }
    var sprites = {};
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");
    var images = ['images/image1.jpg', 'images/image2.jpg', 'images/image3.jpg', 'images/image4.jpg','images/image5.jpg','images/image6.png','images/image7.jpeg','images/images8.jpeg'];
    var exp = 0;
    var expLabel = document.getElementById('exp');
    var imagesLabel = document.getElementById('main_image');


    function init() {
      currentWord = 'click to start';
      currentLocation = 0;
      score = 0;
      miss = 0;
      timer = 30;
      target.innerHTML = currentWord;
      scoreLabel.innerHTML = score;
      missLabel.innerHTML = miss;
      timerLabel.innerHTML = timer;
      isStarted = false;
      exp = 0;
      player.x = 0;
      // document.getElementById('main_image').src = images[5];
      // document.getElementById('exp').innerHTML = exp;

    }


    var load = function() {
      sprites.player = new Image();
      sprites.player.src = 'images/hero.png';

      sprites.background = new Image();
      sprites.background.src = 'images/floor.png';

      sprites.goal = new Image();
      sprites.goal.src = 'images/chest.png';
      };


    var draw = function() {
      //clear the canvas
      ctx.clearRect(0,0,GAME_WIDTH,GAME_HEIGHT);

      //draw background
      ctx.drawImage(sprites.background, 0, 0);

      //draw player
      ctx.drawImage(sprites.player, player.x, player.y);
        //draw goal
      ctx.drawImage(sprites.goal, goal.x, goal.y);
      };
    var checkCollision = function(rect1, rect2) {

      var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
      var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h, rect2.h);
      return closeOnWidth && closeOnHeight;
    }
    function updateTimer() {
      timerId = setTimeout(function() {
        timer--;
        timerLabel.innerHTML = timer;
        var accuracy = (score + miss) === 0 ? '0.00' : ((score / (score + miss)) * 100).toFixed(2);
        if(checkCollision(player, goal)) {
          //stop the game
            alert('You\'ve won!' + score + ' letters, ' + miss + ' miss! ' + accuracy + ' % accuracy');
            clearTimeout(timerId);
            init();
            return;
        }
        if (timer <= 0) {
          // alert('game over');
          alert(score + ' letters, ' + miss + ' miss! ' + accuracy + ' % accuracy');
          clearTimeout(timerId);
          init();
          return;
        }
        updateTimer();
      }, 1000);
    }

    function setTarget() {
      currentWord = words[Math.floor(Math.random() * words.length)];
      target.innerHTML = currentWord;
      currentLocation = 0;
    }

    var changeImage = function(score){
        expLabel.innerHTML = score;
      if(score >=0 && score<10 ){
        document.getElementById('main_image').src = images[5];

      }
      else if(score >=10 && score<20 ){
        document.getElementById('main_image').src = images[6];
      }
      else if(score >=20 && score<30){
        document.getElementById('main_image').src = images[7];
      }
    };

    var step = function() {
      draw();
      window.requestAnimationFrame(step);
    };

    init();


    window.addEventListener('click', function() {
      if (!isStarted) {
        isStarted = true;
        setTarget();
        updateTimer();
      }
    });

    window.addEventListener('keyup', function(e) {
      if (!isStarted) {
        return;
      }
      // e.keyCode
      // console.log(String.fromCharCode(e.keyCode));
      if (String.fromCharCode(e.keyCode) === currentWord[currentLocation].toUpperCase()) {
        currentLocation++;
        var placeholder = '';
        for (var i = 0; i < currentLocation; i++) {
          placeholder += '_';
        }
        target.innerHTML = placeholder + currentWord.substring(currentLocation);
        // console.log('score!');
        score++;
        scoreLabel.innerHTML = score;
        player.x += 6 ;
        // changeImage(score);
        if (currentLocation === currentWord.length) {
          setTarget();
        }
      } else {
        // console.log('miss!');
        miss++;
        missLabel.innerHTML = miss;
        player.x -= 6;
      }
    });

    window.addEventListener("load",function() {
      load();
      step();
    });

  })();