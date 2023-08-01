gameLive = false;

function getRandomInt(min, max) {
    min = Math.ceil(min);   // Round up to the nearest integer
    max = Math.floor(max);  // Round down to the nearest integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


$(document).on("keydown", (event) =>{
 
  if( event.key.toLowerCase() == "a" && !gameLive)
  {
    gameStart()
  }
})

var clickNumber = 0;

$(".btn").on("click", (event) =>{

    
        if( gameLive)
        {  
    
        
            if(event.target.id == gamePattern[clickNumber])
            {
                flashButton(event.target.id)
                if(clickNumber + 1 == level)//click last button
                {
                    levelUp();
                    setTimeout(() => {
                        buttonstage ?   flashAllCurrentButtons(): newColor();
                        
                      }, 2000)
    
                   
                          
                    

                        
                    
                }else{
                    clickNumber++;

                }
            }
            else{
                gameOver()
            }
        
        }
    
  })



const nGameColors = 4;
var gamePattern = []; 
var colors = ["green", "red", "yellow", "blue"]


function flashAllCurrentButtons() {
  
    function flashButtonsSequentially(index) {
      if (index >= gamePattern.length) {

        setTimeout(() => {
            newColor();
        }, 500); // Espera 2000 milissegundos (2 segundos) antes de chamar a próxima função
        return;
      }
  
      flashButton(gamePattern[index]);
  
      setTimeout(() => {
        flashButtonsSequentially(index + 1);
      }, 700); // Espera 2000 milissegundos (2 segundos) antes de chamar a próxima função
    }
  
    flashButtonsSequentially(0);



  }
  


  

function flashButton(buttonColor)
{
    $("." + buttonColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

        const audio = new Audio("sounds/" + buttonColor + ".mp3");
        audio.play();
      
}

function newColor()
{
    var newColor = colors[getRandomInt(0, nGameColors - 1)];
    gamePattern.push(newColor)
     
    
        flashButton(newColor)
    
        
        level++;

    clickNumber = 0;
}

function levelUp()
{
    $("#level-title").text("Level " + parseInt(level + 1))
}


var level = 0;

function gameStart()
{
    gameLive = true;
    level = 0;
    newColor();
    $("#level-title").text("Level " + level)

}

function gameOver()
{
    gameLive = false;
    $("#level-title").text("Game Over! Press A to Try Again")
    gamePattern = []
    level = 0;

    const audio = new Audio("sounds/" + "wrong" + ".mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

}



