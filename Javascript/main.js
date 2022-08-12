let container = document.querySelector("#container");
let options = document.querySelectorAll(".option");

let lista = [0,1,2,3];

const trivialis = async () => {
  try {
    const respuesta = await fetch(
      `https://the-trivia-api.com/api/questions?categories=sport_and_leisure,history,geography,general_knowledge,science,film_and_tv&limit=1&region=AR&difficulty=easy`
    );

    if (respuesta.status === 200) {
      let information = "";
      const datos = await respuesta.json();
      let questions = [];
      questions = [].concat(datos[0].correctAnswer, datos[0].incorrectAnswers)
      console.log(questions[lista[0]]);
      posRandom();
      
      information += `
        <div class="category">${datos[0].category}</div>
        <div class="question">
            <p>${datos[0].question}</p>
        </div>
        <div class="answers">
            <p class="option">${questions[lista[0]]}</p>
            <p class="option">${questions[lista[1]]}</p>
            <p class="option">${questions[lista[2]]}</p>
            <p class="option">${questions[lista[3]]}</p>
        </div>
    </div>`;
        container.innerHTML = information;
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

trivialis()


function posRandom(){
    lista = lista.sort(function() {return Math.random() - 0.5});
}


/* options.forEach(option => {
  option.addEventListener('click', function handleClick(event) {
    console.log("prueba");

  });
}); */
function handleClick(){
  console.log("prueba")
}
options.forEach(function(option){
  option.addEventListener('click', handleClick)
});

