//THIS SCRIPT PRODUCES RANDOM COLOR FOR BACKGROUND OF THE RECORD DIV's
//IN THE INDEX.HTML file


//PROCEDURE:
//     GenerateRandomColor()
//PARAMETERS:
//    NONE
//PURPOSE:
//   Produce a random hex color
//PRE-CONDITIONS:
//   NONE
//POST-CONDITONS:
//  Returns a random Hex color as a String
function GenerateRandomColor(){
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i= 0; i < 6; i++){
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
