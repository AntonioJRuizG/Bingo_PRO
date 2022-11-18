const bingoCard = [
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    //next line
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    //next line
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
    { number: 'randomnumber', matched: false },
];

let usersRanking = [];

/// GENERAR CARTONES DE NUMEROS ALEATORIOS /////////
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const cardGenerator = () => {
    let singleRandomNumber;
    let i = 0;
    while (i < bingoCard.length) {

        singleRandomNumber = getRandomInt(1, 99);
        if (!bingoCard.some(item => item.number === singleRandomNumber)) {
            bingoCard[i].number = singleRandomNumber;
            bingoCard[i].matched = false;
            i++;
        }
    }
}


///////// GENERAR ARRAY CON LOS NUMEROS DEL CARTON ORDENADOS

let getTheNumbersOrdered = () => {
    let card = [];
    for (let i = 0; i < bingoCard.length; i++) {
        card.push(bingoCard[i].number);
    }
    card.sort(function (a, b) { return a - b; });
    return card
}


///////// PREGUNTAR POR USUARIO
const askForUserName = () => {
    const userName = prompt('userName:', 'Name');

    if (userName === null) {
        askForContinuePlaying();
    } else if (usersRanking.some(e => e.useralias === userName)) {
        alert(`Hello, username ${userName} already exists. Choose another one.`);
        askForUserName();
    } else {
        alert(`Hello ${userName}`);
        return userName;
    }
}


///////// PREGUNTAR SI SEGUIR JUGANDO o COMENZAR OTRO TURNO
const askForContinuePlaying = () => {
    const userDecision = prompt('Select keep playing (P) or Exit card (E)', 'P');
    if (userDecision === null) {
        askForContinuePlaying();
    } else if (userDecision.toUpperCase() !== 'P' && userDecision.toUpperCase() !== 'E') {
        askForContinuePlaying();
    } else {
        return userDecision.toUpperCase();
    }
}


///////////// PREGUNTAR SI TERMINAR JUEGO COMPLETAMENTE O REINICIAR EL JUEGO
const askForEndOrRestart = () => {
    const userDecisionToEnd = prompt('Select restart (R) or Exit game (E)', 'R');
    if (userDecisionToEnd === null) {
        askForEndOrRestart();
    } else if (userDecisionToEnd.toUpperCase() !== 'R' && userDecisionToEnd.toUpperCase() !== 'E') {
        askForEndOrRestart();
    } else {
        return userDecisionToEnd.toUpperCase();
    }
}


///////// PREGUNTAR POR GENERAR CARTON
const askForGenerateCard = () => {
    const userChoice = prompt('Do you want KEEP the current card or generate a NEW one', 'keep');
    if (userChoice === null) {
        askForGenerateCard();
    } else if (userChoice.toUpperCase() !== 'KEEP' && userChoice.toUpperCase() !== 'NEW') {
        askForGenerateCard();
    } else {
        return userChoice.toUpperCase();
    }
}


////////// FUNCION QUE GENERA NUMERO RANDOM UNICO Y COPRUEBA SI HAY COINCIDENCIA CON EL CARTON
let counterToBingo = 0;
let counterTurns = 0;
let randomNumbersList = [];
let line = 0;
const matchCard = () => {
    let randomNumber = getRandomInt(1, 99);

    if (!randomNumbersList.includes(randomNumber)) {
        if (bingoCard.some(item => item.number === randomNumber)) {
            counterToBingo++;
            alert(`Card: ${card} \n ${randomNumber} is in your card!\n Balls left: ${99 - randomNumbersList.length}`)
            const index = bingoCard.map(object => object.number).indexOf(randomNumber);
            bingoCard[index].matched = true;
            card[card.indexOf(randomNumber)] = 'X';

        } else {

            alert(`Card: ${card} \n ${randomNumber} is NOT in your card! \n Balls left: ${99 - randomNumbersList.length}`);
        }
        counterTurns++;
        randomNumbersList.push(randomNumber);
    } else {
        matchCard();
    }



}


////////Calcular puntuación de usuario
const calculateScore = () => {
    let points;
    if (counterTurns < 30) {
        points = '10000 points and a Nimbus 3000';
    } else if (counterTurns >= 30 && counterTurns < 70) {
        points = 500 + 10 * (counterTurns - 69);
    } else {
        points = 300 + (counterTurns - 99);
    }
    return points;
}


///////guardar datos de usuario y puntos
const saveUserRanking = (nameofuser, pointsofuser) => {
    usersRanking.push({ username: nameofuser, userpoints: pointsofuser });
}


////////CHECK LINES
const checkLines = () => {
    let matchesArray = bingoCard.map(a => a.matched);
    let firstLine = matchesArray.slice(0, 5);
    let secondLine = matchesArray.slice(5, 10);
    let thirdLine = matchesArray.slice(10, 15);
    oneLineMatched = arr => arr.every(Boolean);
    if (oneLineMatched(firstLine) || oneLineMatched(secondLine) || oneLineMatched(thirdLine)) {
        return true;
    }
}



////// Juego
let restart;
let userMatchName;
let card;
do {

    alert(
        'Points system: \n Complete card in less than 30 turns: 10000 points and a Nimbus 3000! \n Within 30 and 70 turns: 500 points + 10 points for every non extra turn \n More than 80 turns: 300 points + 10 points for non extra turns'
    );
    userMatchName = askForUserName();
    cardGenerator();
    card = getTheNumbersOrdered();
    alert(`${userMatchName}, your card: ${card}`);

    let choice;
    do {

        if (choice === 'NEW') {
            cardGenerator();
            card = getTheNumbersOrdered();

            alert(`${userMatchName}, your new card: ${card}`);
        }
        choice = askForGenerateCard();
    } while (choice === 'NEW')

    let won;
    let linea;
    let numOfLines = 0;

    do {
        matchCard();
        won = bingoCard.every((bingoCard) => {
            return bingoCard.matched;
        });


        linea = checkLines();
        if (linea && numOfLines === 0) {
            alert('You have done a LINE!')
            numOfLines += 1;
        }
        if (won) {
            alert(`Card: ${getTheNumbersOrdered()} \n BINGO!!!`)
            let userPoints = calculateScore()

            alert(`${userMatchName}, you scored: ${userPoints} points!`)
            saveUserRanking(userMatchName, userPoints);

        } else {
            continueGame = askForContinuePlaying();
        }
    } while (!won && continueGame === 'P');

    restart = askForEndOrRestart();
    randomNumbersList = [];
    counterTurns = 0;
} while (restart === 'R');
alert('Take a look in the Ranking!');
console.table(usersRanking);