// const canvas = document.getElementById('canvas1');
// const ctx = canvas.getContext('2d');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// let particlesArray = [];
// const numberOfParticles = 300;

// // measure title element
// let titleElement = document.getElementById('border_1');
// let title = {
//   x: titleMeasurments.left,
//   y: titleMeasurments.right
// }
// class Particle {
//   constructor(x,y){
//     this.x = x;
//     this.y =y;
//     this.size = Math.random() * 15 + 1; 
//     this.weight = Math.random() * 2 + 1;
//     this.directionX = -2;

//   }
//   update(){
//     if (this.y> canvas.height) {
//         this.y = 0 - this.size;
//         this.weight = 3;
//         this.x = Math.random()* canvas.width;
//     }
//     this.weight += 0.01;
//     this.y += this.weight;
//     this.x += this.directionX;
//   }
  

//   draw(){
//     ctx.fillStyle ='green';
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     ctx.closePath();
//     ctx.fill();
//   }
// }


// function init(){
//   for (let i = 0; i < numberOfParticles; i++){
//       const x = Math.random() * canvas.width;
//       const y = Math.random() * canvas.height;
//       particlesArray.push(new Particle(x,y));
//   }
// }
// init();


// function animate(){
//   ctx.fillStyle = 'rgba(255,255,255,0.01)';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   for (let i = 0; i < particlesArray.length; i++){
//     particlesArray[i].update();
//     particlesArray[i].draw();
//   }

//   requestAnimationFrame(animate);
// }

// animate();


// Assignment Code
// var generateBtn = document.querySelector("#generate");

// // Write password to the #password input
// function writePassword() {
//   var password = generatePassword();
//   var passwordText = document.querySelector("#password");

//   passwordText.value = password;

// }

// // Add event listener to generate button
// generateBtn.addEventListener("click", writePassword);

//Dom elements
const resultEL = document.getElementById('result');
const lengthEL = document.getElementById('length');
const uppercaseEL = document.getElementById('uppercase');
const lowercaseEL = document.getElementById('lowercase');
const numbersEL = document.getElementById('numbers');
const symbolsEL = document.getElementById('symbols');
const generateEL = document.getElementById('generate');
const clipboardEL = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  uppper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Generate Event listen
generateEL.addEventListener('click', () =>{
  const length = +lengthEL.value;
  const hasLower = lowercaseEL.checked;
  const hasUpper = uppercaseEL.checked;
  const hasNumber = numbersEL.checked;
  const hasSymbol = symbolsEL.checked;
  

  resultEL.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );  
});


// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  //1.Init pw var
  //2.Filter out unchecked types
  //3.Loop over length call generator function for each type
  //4. Add final pw to the pw var and return

  let generatedPassword = '';

  const typeCount = lower + upper + number + symbol;
  
  console.log('typeCount:', typeCount);

  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

  console.log('typesArr: ', typesArr);

  if(typeCount === 0) {
    return '';
  }

  for(let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      console.log('funcName: ', funcName)

      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return generatedPassword;
}



// Generator funtions - http://www.net-comber.com/charset.html
function getRandomLower(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(){
  const symbols = '!@#$%^&*(){}[]=<>/\,.|';
  return symbols[Math.floor(Math.random() * symbols.length)]; 
}
