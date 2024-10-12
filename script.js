window.addEventListener("load", sidenVises);

//const er Konstanter
const kanin1 = document.querySelector("#kanin_container");
const rotte1 = document.querySelector("#rotte_container");
const kanin2 = document.querySelector("#kanin_container2");
const rotte2 = document.querySelector("#rotte_container2");
const kanin3 = document.querySelector("#kanin_container3");
const rotte3 = document.querySelector("#rotte_container3");

//Let er variabler
let point = 0;
let liv = 3;
let speed = 1;

function sidenVises() {
  console.log("sidenVises");

  //Skjul andre skærme
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");

  // Vis start skærm
  document.querySelector("#start").classList.remove("hide");

  // Klik på start_knap
  document.querySelector("#start_knap").addEventListener("click", startSpil);
}

function startSpil() {
  console.log("startSpil");

  //Skjul andre skærme
  document.querySelector("#level_complete").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#start").classList.add("hide");

  //Nulstil point, liv og speed
  point = 0;
  document.querySelector("#point").textContent = point;

  liv = 3;
  document.querySelector("#liv1").classList.remove("gray");
  document.querySelector("#liv2").classList.remove("gray");
  document.querySelector("#liv3").classList.remove("gray");

  speed = 1;

  //Nulstil musik
  //Nulstil Gameover musik
  document.querySelector("#sound_gameover").currentTime = 0;
  document.querySelector("#sound_gameover").pause();
  //Nulstil Level complete musik
  document.querySelector("#sound_levelcomplete").currentTime = 0;
  document.querySelector("#sound_levelcomplete").pause();

  //Sæt musik på
  //Baggrundsmusik
  document.querySelector("#sound_baggrundsmusik").currentTime = 0;
  document.querySelector("#sound_baggrundsmusik").play();
  document.querySelector("#sound_baggrundsmusik").volume = 0.2;

  //Skriv point ud
  console.log("liv:", liv);
  console.log("point:", point);
  document.querySelector("#point").textContent = point;

  //Start timer -animation
  document.querySelector("#time_viser").classList.add("time_animation");

  //Timer -anmation færdig (kalder stopSpillet)
  document.querySelector("#time_viser").addEventListener("animationend", stopSpillet);

  //Random position og random delay og fast speed
  kanin1.classList.add("slide", "pos" + randomtal(8), "delay" + randomtal(4), "speed" + speed);
  rotte1.classList.add("slide", "pos" + randomtal(8), "delay" + randomtal(4), "speed" + speed);
  kanin2.classList.add("slide", "pos" + randomtal(8), "delay" + randomtal(4), "speed" + speed);
  rotte2.classList.add("slide", "pos" + randomtal(8), "delay" + randomtal(4), "speed" + speed);
  kanin3.classList.add("slide", "pos" + randomtal(8), "delay" + randomtal(4), "speed" + speed);
  rotte3.classList.add("slide", "pos" + randomtal(8), "delay" + randomtal(4), "speed" + speed);

  //Start slide -animationer på elementer
  //Kanin Slide = slide -animation kørt én gang
  kanin1.addEventListener("animationiteration", kaninSlideEnGang);
  kanin2.addEventListener("animationiteration", kaninSlideEnGang);
  kanin3.addEventListener("animationiteration", kaninSlideEnGang);
  //Rotte Slide = slide -animation kørt én gang
  rotte1.addEventListener("animationiteration", rotteSlideEnGang);
  rotte2.addEventListener("animationiteration", rotteSlideEnGang);
  rotte3.addEventListener("animationiteration", rotteSlideEnGang);

  //Klik på Kanin = kaninClickHandler
  kanin1.addEventListener("mousedown", kaninClickHandler);
  kanin2.addEventListener("mousedown", kaninClickHandler);
  kanin3.addEventListener("mousedown", kaninClickHandler);
  //Klik på Rotte = rotteCLickHandler
  rotte1.addEventListener("mousedown", rotteClickHandler);
  rotte2.addEventListener("mousedown", rotteClickHandler);
  rotte3.addEventListener("mousedown", rotteClickHandler);
}

function kaninClickHandler() {
  console.log("goodClickHandler");
  console.log(this);

  //Mister 1 liv
  console.log("liv:", liv);
  document.querySelector("#liv" + liv).classList.add("gray");
  //Skriv liv ud
  liv--;

  console.log("Speed = " + speed);

  //Afspil lyd "ah_nej"
  document.querySelector("#sound_ah_nej").currentTime = 0;
  document.querySelector("#sound_ah_nej").play();

  //Gør så man kun kan klikke 1 gang
  this.removeEventListener("mousedown", kaninClickHandler);

  //Start haha -animation
  this.classList.add("frys");
  this.firstElementChild.classList.add("haha_kanin");

  //Lytter efter kaninReset
  this.addEventListener("animationend", kaninReset);

  //Ingen liv tilbage = kalder stopSpillet
  if (liv == 0) {
    stopSpillet();
  }
}

function rotteClickHandler() {
  console.log("badClickHandler");
  console.log(this);

  //Får 1 point
  point = point + 1;

  //Skriv point ud
  console.log("point:", point);
  document.querySelector("#point").textContent = point;

  //Aktivér speed afhængig af point
  if (point >= 5) {
    speed = 3;
  } else if (point >= 3) {
    speed = 2;
  }
  console.log("Speed = " + speed);

  //Afspil lyd "fik_den"
  document.querySelector("#sound_fik_den").currentTime = 0;
  document.querySelector("#sound_fik_den").play();

  //Gør så man kun kan klikke 1 gang
  this.removeEventListener("mousedown", rotteClickHandler);

  //Start haha1 -animation
  this.classList.add("frys");
  this.firstElementChild.classList.add("haha_rotte");

  //Lytter efter rotteReset
  this.addEventListener("animationend", rotteReset);
}

function kaninReset() {
  console.log("kaninReset");
  this.classList = "";
  //Vis element igen (fjerner classes og tilføjer off-reset)
  this.firstElementChild.classList = "";
  this.offsetLeft;

  //Ny random position, delay og fast speed
  this.classList.add("slide", "pos" + randomtal(8), "delay" + randomtal(4), "speed" + speed);

  //Gør så man kan klikke igen
  this.addEventListener("mousedown", kaninClickHandler);

  //Genstart slide -animation
}

function rotteReset() {
  this.classList = "";
  //Vis element igen
  this.firstElementChild.classList = "";
  this.offsetLeft;

  //Ny random position og delay
  this.classList.add("slide", "pos" + randomtal(8), "delay" + randomtal(4), "speed" + speed);

  //Gør så man kan klikke igen
  this.addEventListener("mousedown", rotteClickHandler);

  //Genstart slide -animation
}

function kaninSlideEnGang() {
  console.log("kaninSlideEnGang");

  //Vis element igen (fjerner classes og tilføjer off-reset)
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;

  //Ny random position, delay og fast speed
  this.classList.add("slide", "pos" + randomtal(8), "delay" + randomtal(4), "speed" + speed);

  //Genstart slide -animation
}

function rotteSlideEnGang() {
  console.log("rotteSlideEnGang");
  //Mister 1 point
  point = point - 1;

  //Skriv point ud
  console.log("point:", point);
  document.querySelector("#point").textContent = point;

  //Vis element igen (fjerner classes og tilføjer off-reset)
  this.classList = "";
  this.firstElementChild.classList = "";
  this.offsetLeft;

  //Ny random position, delay og fast speed
  this.classList.add("slide", "pos" + randomtal(8), "delay" + randomtal(4), "speed" + speed);

  //Genstart slide -animation
}

function stopSpillet() {
  console.log("stopSpillet");

  //Reset timer
  document.querySelector("#time_viser").removeEventListener("animationend", stopSpillet);
  document.querySelector("#time_viser").classList.remove("time_animation");

  //Slet alle classes og fjern alle event listernere (kanin)
  kanin1.classList = "";
  kanin1.firstElementChild.classList = "";
  kanin1.removeEventListener("mousedown", kaninClickHandler);
  kanin1.removeEventListener("animationiteration", kaninSlideEnGang);
  kanin1.removeEventListener("animationend", kaninReset);
  kanin2.classList = "";
  kanin2.firstElementChild.classList = "";
  kanin2.removeEventListener("mousedown", kaninClickHandler);
  kanin2.removeEventListener("animationiteration", kaninSlideEnGang);
  kanin2.removeEventListener("animationend", kaninReset);
  kanin3.classList = "";
  kanin3.firstElementChild.classList = "";
  kanin3.removeEventListener("mousedown", kaninClickHandler);
  kanin3.removeEventListener("animationiteration", kaninSlideEnGang);
  kanin3.removeEventListener("animationend", kaninReset);

  //Slet alle classes og fjern alle event listernere (rotte)
  rotte1.classList = "";
  rotte1.firstElementChild.classList = "";
  rotte1.removeEventListener("mousedown", rotteClickHandler);
  rotte1.removeEventListener("animationiteration", rotteSlideEnGang);
  rotte1.removeEventListener("animationend", rotteReset);
  rotte2.classList = "";
  rotte2.firstElementChild.classList = "";
  rotte2.removeEventListener("mousedown", rotteClickHandler);
  rotte2.removeEventListener("animationiteration", rotteSlideEnGang);
  rotte2.removeEventListener("animationend", rotteReset);
  rotte3.classList = "";
  rotte3.firstElementChild.classList = "";
  rotte3.removeEventListener("mousedown", rotteClickHandler);
  rotte3.removeEventListener("animationiteration", rotteSlideEnGang);
  rotte3.removeEventListener("animationend", rotteReset);

  //Hvis point <= 0 = gameOver. Ellers point >=10 levelComplete. Ellers game over.
  if (liv <= 0) {
    gameOver();
  } else if (point >= 10) {
    levelComplete();
  } else {
    gameOver();
  }
}

function levelComplete() {
  console.log("Du har vundet");

  //Vis levelComplete skærm
  document.querySelector("#level_complete").classList.remove("hide");

  //Vis antal opnået point
  document.querySelector("#level_complete_point").textContent = point;

  //Fjern baggrundsmusik
  document.querySelector("#sound_baggrundsmusik").currentTime = 0;
  document.querySelector("#sound_baggrundsmusik").pause();

  //Start "game_over" musik
  document.querySelector("#sound_levelcomplete").currentTime = 0;
  document.querySelector("#sound_levelcomplete").play();

  //Klik på genstart2
  document.querySelector("#genstart2").addEventListener("click", startSpil);
}

function gameOver() {
  console.log("Du har tabt");
  //Vis gameover skærm
  document.querySelector("#game_over").classList.remove("hide");

  //Vis antal opnået point
  document.querySelector("#game_over_point").textContent = point;

  //Fjern baggrundsmusik
  document.querySelector("#sound_baggrundsmusik").currentTime = 0;
  document.querySelector("#sound_baggrundsmusik").pause();

  //Start "game_over" musik
  document.querySelector("#sound_gameover").currentTime = 0;
  document.querySelector("#sound_gameover").play();

  //Klik på genstart1
  document.querySelector("#genstart1").addEventListener("click", startSpil);
}

function randomtal(max) {
  return Math.floor(Math.random() * max) + 1;
}
