// NOTE: Modules
const express = require('express'),
      bodyParser = require('body-parser'),
      expressValidator = require('express-validator'),
      fs = require('fs'),                                                       // file system module is a built-in module in Node.js
      randomWordGen = require('./../randomWordGen.js');

// NOTE: Get the file with words
fsWords = fs.readFileSync("/usr/share/dict/words", "utf-8").toLowerCase().split("\n");



// ================================================================================
// NOTE: Initiate local variables
let wrongLetter, availGuesses, word;


// NOTE: Express router
const router = express.Router();
      router.use('/public', express.static('./public'))

      router.get('/', (req, res) => {
         wrongLetter = [], availGuesses = 8, word = [];
         word = randomWordGen.hop(fsWords);

         res.redirect('/hangman/easy/ingame')});


// ================================================================================
      router.get('/ingame', (req, res) => {
         if (word.dashed.toString() === word.revealed.toString()){
             res.redirect('/hangman/easy/gameover')

       } else {
             res.render('ingame', {
                 'ingameWord'  : word.dashed,
                 'wrongLetter' : wrongLetter,
                 'availGuesses': availGuesses }); }
      });


      router.post('/ingame', (req, res) => {
          if (req.body.word && req.body.letter){
              return res.render('ingame', {
                         'ingameword'    : word.dashed,
                         'wrongLetter'   : wrongLetter,
                         'availGuesses'  : availGuesses,
                         'message'       : 'Please don\'t do that... =/' }); }


          if (req.body.letter){
              req.checkBody('letter').isLength({ min: 1, max: 1 });
                  if (req.validationErrors()){
                      console.error(req.validationErrors());
                      res.render('ingame', {
                           'ingameWord'   : word.dashed,
                           'wrongLetter'  : wrongLetter,
                           'availGuesses' : availGuesses,
                           'message'      : 'The input is invalid. Try single letters only.' })
                } else {
                      let found = false;

                      for (let i = 0; i < word.revealed.length; i++){
                        if (word.revealed[i] == req.body.letter){
                            word.dashed.splice([i], 1, word.revealed[i]);
                            found = true; } }

                       switch(found){
                         case availGuesses > 0:
                                res.redirect('/hangman/easy/ingame')
                                break;

                         case !found && availGuesses > 1:
                                availGuesses -= 1
                                wrongLetter.push(req.body.letter);
                                res.render('gameover',{
                                    'ingameWord'   : word.revealed,
                                    'wrongLetter'  : wrongLetter,
                                    'availGuesses' : availGuesses,
                                    'result'       : "NOT GOOD ENOUGH" })
                                break;

                         default:
                                availGuesses -= 1;
                                wrongLetter.push(req.body.letter);
                                res.redirect('/hangman/easy/ingame')
                                break;
                      };
                }

        } else if(req.body.word){
                  req.checkBody('word').matches(word.revealed.toString());
                   if (req.validationErrors()){
                       console.error(req.validationErrors());
                       res.render('ingame', {
                            'ingameWord'    : word.dashed,
                            'wrongLetter'   : wrongLetter,
                            'availGuesses'  : availGuesses,
                            'message'       : 'Wrong word. But I will not count it against you' });
                 } else {
                   res.redirect('/hangman/easy/gameover')}
        };
});



// ===============================================================================
      router.post('/newgame', (req, res) => {
         req.session.destroy()
         res.redirect('/');
      });

      router.post('/playagain', (req, res) => {
         req.session.destroy();
         res.redirect('/');
      });

      router.post('/hangme', (req, res) => {
         res.render('gameover', {
              'ingameWord'  : word.revealed,
              'wrongLetter' : wrongLetter,
              'availGuesses': availGuesses })
      });

      router.get('/gameover', (req, res) => {
         res.render('gameover', {
             'ingameWord'   : word.revealed,
             'wrongLetter'  : wrongLetter,
             'availGuesses' : availGuesses,
             'result'       : "You win!!!"})
      });


module.exports = router;
