module.exports = {
  hop : function(fsWords){
          let dashW = [];                                                 // dashedWord
          let randI = Math.floor(Math.random() * fsWords.length);         // randomIndex; generating random number between 0 and fsWords.length
          let randW = Array.from(fsWords[randI]);                         // randomWord; generated random number is used as index position in the fsWords array --> generate random word from fsWords + turning the word into an array of indivdual letters of the random word

          for (let i = 0; i < randW.length; i++){
            dashW.push("_");                                              // dashedWord
          }
          console.log(fsWords[randI]);
          return {'dashed' : dashW, 'revealed' : randW }
        }

}

// NOTE: hop returns an array with the randomly chosen word split into letters as letters or dashes
