

// Hassan Alhaji
// Hassan.alhaji@yahoo.com
// 4/1/2019
// Memory game project


var cardsList =[]; // only 2 cards
var movesCounter =0;
var count = 0;
const starsContainer = document.querySelector(".stars");
const restartBtn = document.querySelector('.restart');
CardsList = cardsInitialize();
var intercal;
var timer = document.querySelector(".timer");

//timer.innerHTML ="0 mins : 0 secs"

var shuffledOne = shuffle(CardsList)

displayCards(); //dispaly random symblos each time
openCards(); //open cards by click


// Add event listner
function cardsInitialize(){
  var domCards = []; // document object model
  domCards = document.getElementsByClassName('card');
  return transformer(domCards); //need to return it as string
}

function transformer(obj){
  var maped =[];
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      maped.push(obj[key].innerHTML);
    }
  }
  return maped;
}

function displayCards(){
  var  list = document.createElement("ul");
  for(var i =0; i<shuffledOne.length; i++){
    var li = document.createElement("li");
    li.innerHTML = shuffledOne[i];
    li.classList.add("card");
    list.appendChild(li);
  }
    document.getElementsByClassName("deck")[0].innerHTML = list.innerHTML;
  //to show cards
}


function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function openCards(card){
  var allCards = document.querySelectorAll('.card');
  allCards.forEach(function(card)
  {
    card.addEventListener('click', function(e)
    {
      startTimer();
      if(cardsList.length === 1)
      {
        movesCounter++;
        rating(movesCounter);
        card.classList.add('open','show','disabled');
        cardsList.push(this);

        if(card.innerHTML === cardsList[0].innerHTML){
          //card.classList.add('match','open','show');
          card.classList.add('match');
          cardsList[0].classList.add('match');
          cardsList = [];
          count = count + 1;
        }
        else
        {
            setTimeout(function(){
            card.classList.remove('open','show','disabled');
            cardsList[0].classList.remove('open','show','disabled');
            cardsList = [];
          },400);
        }

      }
      else {
        card.classList.add('open','show','disabled');
        cardsList.push(this);
      }
      $('.moves').text(movesCounter);//increment the clicks
      if(count == 8){
        setTimeout(function(){
        alertMessage(movesCounter);
      },400);
      }
    });
  });
}

//RESTART THE BOARD

  restartBtn.addEventListener('click',function(){
     location.reload();
  })


  //ratingStars

// count ths stars and update it in each click
  function rating(movesCounter){
    if(movesCounter <= 16){
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`

    }
    else if (movesCounter > 16 && movesCounter < 25){
      starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`
    }
    else{
      starsContainer.innerHTML = '<li><i class="fa fa-star"></i></li>'

    }
  }


  function alertMessage(movesCounter){
    clearInterval(interval);
    var time = getTimer();
		if (confirm("You did it with "+ movesCounter + " movies, and "+time+" seconds. Do you want to play again") == true) {
      location.reload();
		} else {
      exit();
		}
  }

  // timer funcation
var second = 0; minute =0 ; hour =0;
  function startTimer(){
    interval = setInterval(function(){
      timer.innerHTML = minute+ " m "+" : "+second+" s";
      second++;
      if(second == 60){
        minute++;
        second=0;
      }
      if(minute == 60){
        hour++;
        minute =0;
      }
    },10000);
  }

function getTimer(){
  return $('#timer').text();
}
