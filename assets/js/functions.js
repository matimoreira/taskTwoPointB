document.getElementById('button--heighter').addEventListener('click', clickHigher);
document.getElementById('button--less').addEventListener('click', clickLess);

var number = getRandomInt(1, 101);

document.getElementById('span--number').innerHTML = number;

var bet = []; //coins, choice(0 = less, 1 = higher)

function clickHigher() {

	var inputBet = document.getElementById('input--bet');
	bet = [inputBet.value, 1];
	if (checkCoins()) {

		showCoinsReplics(-bet[0]);

		play(showResult);
	
	}
	
	

}


function clickLess() {
	var inputBet = document.getElementById('input--bet');
	bet = [inputBet.value, 0];

	if (checkCoins()) {

		showCoinsReplics(-bet[0]);

		play(showResult);

	}
}

function play(callback) {

	var changingNumber = setInterval('setNumber()',100);
	setTimeout(function(){ return stopRaffle(changingNumber, callback); }, 3000);

}

function stopRaffle(changingNumber, callback) {
	clearInterval(changingNumber);
	var h1Number = document.getElementById('span--number').innerHTML
	callback(h1Number);
}

function showResult(numberWin){

	var profit;
	var probability = getProbability(number, bet[1]);

	if (bet[1] === 1) {

		if (numberWin > number) {

			profit = bet[0] * probability;
			showCoinsReplics(profit);
			console.log('Ganaste ' + profit);

		}else{

			showCoinsReplics(-profit);
			console.log('Perdiste ' + bet[0]);

		}

	}else if( bet[1] === 0 ){

		if (numberWin < number) {

			profit = bet[0] * probability; 
			showCoinsReplics(profit);
			console.log('Ganaste ' + profit);

		}else{

			showCoinsReplics(-profit);
			console.log('Perdiste ' + bet[0]);

		}
		
	}

	number = numberWin;

	console.log(numberWin);

}

function getProbability(p_number, p_choice){

	if (p_choice === 1) {

		return (100 / (100 - p_number));

	}else{

		return 100 / p_number
	}

}

function showCoinsReplics(profit){

	elementCoins = document.getElementById('span--coins');
	coins = parseInt(elementCoins.innerHTML) + parseInt(profit);
	console.log(parseInt(elementCoins.innerHTML) + ' ' + parseInt(profit));
	elementCoins.innerHTML = (isNaN(coins)?0:coins);

}

function setNumber() {

	var h1Number = document.getElementById('span--number').innerHTML = getRandomInt(1, 101);

}

function checkCoins() {
	elementCoins = document.getElementById('span--coins');
	coins = parseInt(elementCoins.innerHTML);
	if (coins >= bet[0]) {
		return true
	}
	return false;
}

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}