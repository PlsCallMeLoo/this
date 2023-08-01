import inquirer from 'inquirer';

import { image } from 'qr-image';

import * as fs from 'fs';




const data = new Date();

// Obter a data no formato simplificado
const dataSimplificada = data.toISOString().slice(0, 10) + data.toISOString().slice(11, 19);
 
function genImage(link){
    var img = image(link.link, { type: 'png' });
    img.pipe(fs.createWriteStream( dataSimplificada + '.png'));
}
 

inquirer
  .prompt([
{
    name: 'link',
    message: 'What is your favorite reptile?'
}  ])
  .then((link) => genImage(link))
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });