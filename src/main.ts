import { Road } from "./components/Road";
import { Car } from "./components/Car";
import DIMENSION from "./components/Constants";
import { SPEED, SPEED_INCREMENT } from "./components/Constants";
import { getRandomInt } from "./utils/Common";
document.addEventListener("DOMContentLoaded", () => {
  let SPEED_DUP = SPEED;

  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  const restartButton = document.getElementById(
    "restartButton"
  ) as HTMLButtonElement;
  restartButton.addEventListener("click", restartGame);

  const startButton = document.getElementById(
    "startButton"
  ) as HTMLButtonElement;
  startButton.addEventListener("click", startGame);

  const road = new Road(DIMENSION.CANVAS_HEIGHT, 500, 4, 100, 40, 20, -40, 5);

  const car1 = new Car(150, 128, "car.png", 540, 670);
  const car2 = new Car(
    150,
    128,
    "car1.png",
    434,
    getRandomInt(-100, 0)
  );
  const car3 = new Car(
    150,
    128,
    "car1.png",
    636,
    getRandomInt(-400, -800)
  );
  const car4 = new Car(
    150,
    128,
    "car1.png",
    536,
    getRandomInt(-1200, -1400)
  );

  const cars = [car2, car3, car4];

  const lanes = [434, 536, 636];
  let currentLaneIndex = 1;
  let targetX = lanes[currentLaneIndex];
  car1.posX = targetX;

  let score = 0;
  let gameOver = false;

  function draw() {
    if (gameOver) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "48px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 5;
      ctx.shadowOffsetY = 5;
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 30);

      ctx.font = "36px Arial";
      ctx.fillStyle = "white";
      ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 30);

      restartButton.style.display = "block";
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    road.drawRoad(ctx);

    cars.forEach((car) => {
      car.insertCar(ctx);
      car.posY += SPEED_DUP;

      if ((score + 1) % 50 === 0) {
        SPEED_DUP += SPEED_INCREMENT;
      }

      if (car.posY > DIMENSION.CANVAS_HEIGHT) {
        car.posY = getRandomInt(-100, -600);
        score++;
      }
    });

    car1.insertCar(ctx);

    // Smoothly transition car1 to the target lane position
    if (car1.posX !== targetX) {
      car1.posX += (targetX - car1.posX) * 0.1; // Adjust the 0.1 to make it smoother or faster
      if (Math.abs(car1.posX - targetX) < 1) {
        car1.posX = targetX; // Snap to target position if very close
      }
    }

    detectCollisions();

    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.shadowColor = "white";
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.fillText(`Score: ${score}`, 50, 30);

    requestAnimationFrame(draw);
  }

  function updateCarPosition() {
    targetX = lanes[currentLaneIndex];
  }

  function detectCollisions() {
    cars.forEach((car) => {
      if (
        car1.posX === car.posX &&
        car1.posY < car.posY + car.carLength &&
        car1.posY + car1.carLength + SPEED_DUP > car.posY
      ) {
        gameOver = true;
      }
    });
  }

  window.addEventListener("keydown", (event) => {
    if (event.key === "a" || event.key === "ArrowLeft") {
      if (currentLaneIndex > 0) {
        currentLaneIndex--;
        updateCarPosition();
      }
    } else if (event.key === "d" || event.key === "ArrowRight") {
      if (currentLaneIndex < lanes.length - 1) {
        currentLaneIndex++;
        updateCarPosition();
      }
    }
  });

  function restartGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    gameOver = false;
    score = 0;
    SPEED_DUP = SPEED;
    currentLaneIndex = 1;
    targetX = lanes[currentLaneIndex];
    car1.posX = targetX;
    car1.posY = 670;
    car2.posY = getRandomInt(-100, 0);
    car3.posY = getRandomInt(-400, -800);
    car4.posY = getRandomInt(-1200, -1400);
    restartButton.style.display = "none";
    draw();
  }

  const image = new Image();
  image.onload = function () {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  
  image.src = "start_background.jpg";
  

  function startGame(){
      draw();
      startButton.style.display = "none";
  }
  
});
