let container = document.querySelector("#container");
let statsContainer = document.querySelector("#stats")
let wrong = document.querySelector(".wrong");
let right = document.querySelector(".right")
let options;
let lista = [0, 1, 2, 3];

/* SISTEM */
let curentWinining = 0;
let curentLoosing = 0;
if (localStorage.getItem("wins") == null) {
  localStorage.setItem("wins", 0);
  localStorage.setItem("looses", 0);
  looseStreak = localStorage.setItem("looseStreak", 0);
  winStreak = localStorage.setItem("winStreak", 0);
  points = localStorage.setItem("points", 0);
  biggestWinStreak = localStorage.setItem("biggestWinStreak", 0);
}







const trivialis = async () => {
  try {
    const respuesta = await fetch(
      `https://the-trivia-api.com/api/questions?categories=sport_and_leisure,history,geography,general_knowledge,science,film_and_tv&limit=1&region=AR&difficulty=easy`
    );

    if (respuesta.status === 200) {
     
      let information = "";
      let stats = "";
      const datos = await respuesta.json();
      let questions = [];
      questions = [].concat(datos[0].correctAnswer, datos[0].incorrectAnswers);
       /* alert(questions[lista[0]]); */
      posRandom();
      console.log(datos[0].id)
      information += `
        <p class="category">${datos[0].category}</p>
        <div class="question">
            <p>${datos[0].question}</p>
        </div>
        <div id="answers">
            <p class="option">${questions[lista[0]]}</p>
            <p class="option">${questions[lista[1]]}</p>
            <p class="option">${questions[lista[2]]}</p>
            <p class="option">${questions[lista[3]]}</p>
        </div>
    </div>`;
      container.innerHTML = information;
      
      stats += `
      <div class="center points">
        <img src="/Assets/star.png">
        <p>${JSON.parse(localStorage.getItem("points"))}</p>
      </div>
  
      <div class="historical">
        <div class="center">
            <p>${JSON.parse(localStorage.getItem("wins"))}</p>
            <img src="/Assets/trophy.png">
        </div>
        <div class="center">
            <img src="/Assets/loser.png">
            <p>${JSON.parse(localStorage.getItem("looses"))}</p>
        </div>
       </div>

        <div class="center streak">
          <p>${JSON.parse(localStorage.getItem("biggestWinStreak"))}</p>
          <img src="/Assets/flame.png">
        </div>`
        statsContainer.innerHTML = stats;
  

      options = document.querySelectorAll(".option");
      options.forEach(function (option) {
        if((option.innerHTML).length > 20 ||(datos[0].question).length > 100){
          location.reload();
        }
        option.addEventListener("click", function handleClick() {
          
          let selectedOption = option.textContent;
          if (selectedOption == datos[0].correctAnswer) {

            /* Color green the right answer */
            option.classList.add("correct");
            
            /* TOTAL WINS */
            curentWinining++;
            let winCounter = curentWinining;
            localStorage.setItem("wins",winCounter + JSON.parse(localStorage.getItem("wins")));
            right.classList.add("active");

             /* Bigges Win streak */
            let  winStreak = curentWinining;
            localStorage.setItem("winStreak", winStreak + JSON.parse(localStorage.getItem("winStreak")));
            if(JSON.parse(localStorage.getItem("winStreak"))>JSON.parse(localStorage.getItem("biggestWinStreak"))){
              localStorage.setItem("biggestWinStreak",JSON.parse(localStorage.getItem("winStreak")));
            }


            localStorage.setItem("looseStreak", 0);
            /* POINTS SYSTEM */
            localStorage.setItem('points', JSON.parse(localStorage.getItem("points")) + 1);
            if(JSON.parse(localStorage.getItem("winStreak")) >= 3){
              localStorage.setItem('points', JSON.parse(localStorage.getItem("points")) + 3);
            }

            setTimeout(function () {
              right.classList.remove("active");
            }, 1.5 * 1000);
            setTimeout(function () {
              location.reload();
            }, 2 * 1000);
          } else {
            /* Color green the right answer */
            const search = Array.from(options).find(
              (item) => item.innerHTML === datos[0].correctAnswer
            );
            search.classList.add("correct");
            /* Color red the wrong answer */
            option.classList.add("incorrect");

            curentLoosing++;
            let lossCounter = curentLoosing;
            localStorage.setItem(
              "looses",
              lossCounter + JSON.parse(localStorage.getItem("looses"))
            );


            localStorage.setItem("winStreak", 0);
              /* POINTS SYSTEM */
              let  looseStreak = curentLoosing;
              localStorage.setItem("looseStreak", looseStreak + JSON.parse(localStorage.getItem("looseStreak")));
              localStorage.setItem('points', JSON.parse(localStorage.getItem("points")) - 1);
              if(JSON.parse(localStorage.getItem("looseStreak")) >= 3){
                localStorage.setItem('points', JSON.parse(localStorage.getItem("points")) - 2);
              }


            /* Show the WROGN message */
            wrong.classList.add("active");
            setTimeout(function () {
              wrong.classList.remove("active");
            }, 1.5 * 1000);
            setTimeout(function () {
              location.reload();
            }, 2 * 1000);
          }
        });
      });
    } else if (respuesta.status === 401) {
      console.log("Error 401");
    } else if (respuesta.status === 404) {
      console.log("Error 404");
    } else {
      console.log("Error inesperado");
    }
  } catch (error) {
    console.log(error);
  }
};

trivialis();


function posRandom() {
  lista = lista.sort(function () {
    return Math.random() - 0.5;
  });
}


let openMenu = document.querySelector("#open-menu")
let closeMenu = document.querySelector("#close-menu")

/* openMenu.onclick = () => {
  statsContainer.classList.add("active")
  closeMenu.classList.add("active")
  openMenu.classList.add("hide")

}
closeMenu.onclick = () => {
  statsContainer.classList.remove("active")
  closeMenu.classList.remove("active")
  openMenu.classList.remove("hide")

} */

