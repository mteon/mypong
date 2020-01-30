function Ball(x, y) {
    this.id = "ball";
    this.elt = document.getElementById("ball");
    this.x = x;
    this.y = y;
    this.velocityX = 5;
    this.velocityY = 5;
}

function Paddle1(y) {
    this.id = "paddle1";
    this.elt = document.getElementById("paddle1");
    this.y = y;
    this.velocityY = 5;
}

function Paddle2(y) {
    this.id = "paddle2";
    this.elt = document.getElementById("paddle2");
    this.y = y;
    this.velocityY = 5;
}

buttons = {
    p1_up: false,
    p2_up: false,
    p1_down: false,
    p2_down: false
};

scores = {
    j1_score: 0,
    j2_score: 0
};

function event_handler(event) {
    if(event.type == "keydown") {
        switch(event.key) {
            case "a": buttons.p1_up = true; break;
            case "q": buttons.p1_down = true; break;
            case "p": buttons.p2_up = true; break;
            case "m": buttons.p2_down = true; break;
        }
    } else if(event.type == "keyup") {
        switch(event.key) {
            case "a": buttons.p1_up = false; break;
            case "q": buttons.p1_down = false; break;
            case "p": buttons.p2_up = false; break;
            case "m": buttons.p2_down = false; break;
        }
    }
}
window.addEventListener("keydown", event_handler);
window.addEventListener("keyup", event_handler);

function place_objects(objects) {
    for(i = 0; i < objects.length; i++) {
        var object = objects[i];
        var element = document.getElementById(object.id);
        element.style.left = object.x + "px";element.style.top = object.y + "px";
    }
}

let ball;
function update() {
    let body = document.body.getBoundingClientRect();
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;


    if (ball.x < leftPaddle.elt.x + leftPaddle.elt.width
        && leftPaddle.elt.height + leftPaddle.elt.y > ball.y
        && ball.y + ball.elt.height > leftPaddle.elt.y) {
        ball.velocityX = -ball.velocityX;
    }


    if (ball.x + ball.elt.width > rightPaddle.elt.x
        && rightPaddle.elt.height + rightPaddle.elt.y > ball.y
        && ball.y + ball.elt.height > rightPaddle.elt.y) {
        ball.velocityX = -ball.velocityX;
    }

    if (ball.y > body.height + ball.elt.height || ball.y < 0) {
        ball.velocityY = -ball.velocityY;
    }

    if (ball.x < 0) {
        ++scores.j2_score;
        ball.x = body.width/2;
        ball.y = body.height/2;
        document.getElementById("score").innerHTML = scores.j1_score + '-' + scores.j2_score;

    }

    if (ball.x + ball.elt.width  > body.width ) {
        ++scores.j1_score;
        ball.x = body.width/2;
        ball.y = body.height/2;
        document.getElementById("score").innerHTML = scores.j1_score + '-' + scores.j2_score;

    }

    if (buttons.p1_up == true) {
        leftPaddle.y -= leftPaddle.velocityY;
    } else if (buttons.p1_down == true) {
        leftPaddle.y += leftPaddle.velocityY;
    } else if (buttons.p2_up == true) {
        rightPaddle.y -= rightPaddle.velocityY;
    } else if (buttons.p2_down == true) {
        rightPaddle.y += rightPaddle.velocityY;
    }


    place_objects([ball, leftPaddle, rightPaddle]);
}


function init() {
    let body = document.body.getBoundingClientRect();
    ball = new Ball(body.width/2, body.height/2);
    leftPaddle = new Paddle1(body.height/2);
    rightPaddle = new Paddle2(body.height/2);
    document.getElementById("score").innerHTML = scores.j1_score + ' - ' + scores.j2_score;
}

setInterval(update, 10);