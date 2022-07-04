var palavras = [
	'FUTEBOL', 'CENOURA', 'SEGUNDA', 'ANO', 'PINHAO', 'COZINHA', 'HEXA'
];
var tabuleiro = document.querySelector('#jogo-forca').getContext('2d');
var letras = [];
var palavra = '';
var palavraCorreta = '';
var erros = 9;
var letra = 0;

function atualizar(){
	location.reload();
};

function alterarParaTela1(){
	atualizar();
};

function alterarParaTela2(){
	const esconderTela1 = document.getElementById('tela1');
	if(esconderTela1.classList) esconderTela1.classList.add('invisivel');
	
	const mostrarTela2 = document.getElementById('tela2');
	if(mostrarTela2.classList) mostrarTela2.classList.remove('invisivel');
	
	blockchar();
};

function alterarDaTela2ParaTela1(){
	atualizar();
};

function alterarDaTela2ParaTela3(){
	const esconderTela2 = document.getElementById('tela2');
	if(esconderTela2.classList) esconderTela2.classList.add('invisivel');
	
	const mostrarTela3 = document.getElementById('tela3');
	if(mostrarTela3.classList) mostrarTela3.classList.remove('invisivel');

	escreverTracinhos(escolherPalavraSecreta());
	
	verificarLetraDigitada();
};

function alterarParaTela3(){
	const esconderTela1 = document.getElementById('tela1');
	if(esconderTela1.classList) esconderTela1.classList.add('invisivel');
	
	const mostrarTela3 = document.getElementById('tela3');
	if(mostrarTela3.classList) mostrarTela3.classList.remove('invisivel');

	escreverTracinhos(escolherPalavraSecreta());
	
	verificarLetraDigitada();
};

function atualizarPalavra(){
	atualizar();
};

function transformarLetras(){
	document.getElementById('text').addEventListener('keyup', (ev) => {
		var input = ev.target;
		input.value = input.value.toUpperCase();
	});
};

function blockchar(){
	const caracteresInput = document.querySelector('#text');
	caracteresInput.addEventListener('keypress', function(e){
		if(!checkChar(e)){
			e.preventDefault();
		};
	});
	function checkChar(e){
		const char = String.fromCharCode(e.keyCode);
		const pattern = '[a-zA-Z]';
		
		if(char.match(pattern)){
			return true;
		};
	};
};

function adicionarPalavra(){
	var campo = document.querySelector('input');
	palavras.push(campo.value);
	alert('A palavra digitada foi salva!');
	alterarDaTela2ParaTela3();
	verificarLetraDigitada();
};

function escolherPalavraSecreta(){
	palavra = palavras[Math.floor(Math.random() * palavras.length)];
	palavraSecreta = palavra;
	return palavra;
};

function desenharForcaErro(xa, ya, xb, yb){
	tabuleiro.lineWidth = 4;
	tabuleiro.lineCap = 'round';
	tabuleiro.lineJoin = 'round';
	tabuleiro.strokeStyle = '#0A3871';
	tabuleiro.beginPath();
	tabuleiro.moveTo(xa, ya);
	tabuleiro.lineTo(xb, yb);
	tabuleiro.stroke();
	tabuleiro.closePath();
};

function desenharForcaErroCabeca(){
	tabuleiro.lineWidth = 4;
	tabuleiro.strokeStyle = '#0A3871';
	tabuleiro.beginPath();
	tabuleiro.arc(820, 84, 33, 0, 2 * Math.PI);
	tabuleiro.stroke();
};

function escreverTracinhos(){
	tabuleiro.lineWidth = 3;
	tabuleiro.lineCap = 'round';
	tabuleiro.lineJoin = 'round';
	tabuleiro.strokeStyle = '#0A3871';
	tabuleiro.beginPath();
	var eixo = 698/palavraSecreta.length;
	for(let i = 0; i < palavraSecreta.length; i++){
		tabuleiro.moveTo(325+(eixo*i), 550);
		tabuleiro.lineTo(400+(eixo*i), 550);
	};
	tabuleiro.stroke();
	tabuleiro.closePath();
};

function apareceErros(erros){
	if(erros==8){
		desenharForcaErro(410, 440, 870, 440);
		desenharForcaErro(525, 437, 525, 3);
	}
	if(erros==7){
		desenharForcaErro(525, 3, 820, 3);
	}
	if(erros==6){
		desenharForcaErro(820, 4, 820, 50);
	}
	if(erros==5){
		desenharForcaErroCabeca();
	}
	if(erros==4){
		desenharForcaErro(820, 120, 820, 280);
	}
	if(erros==3){
		desenharForcaErro(820, 281, 870, 370);
	}
	if(erros==2){
		desenharForcaErro(820, 281, 770, 370);
	}
	if(erros==1){
		desenharForcaErro(820, 120, 870, 209);
	}
	if(erros==0){
		desenharForcaErro(820, 120, 770, 209);
		exibePerdeuEFimDeJogoNaOrdemCorreta(aparecePerdeu(), apareceFimDeJogo());
	};	
};

function exibePerdeuEFimDeJogoNaOrdemCorreta(ordem, callback){
	aparecePerdeu(ordem);
	callback();
}

function aparecePerdeu(){
	tabuleiro.font = 'bold 38px Inter';
	tabuleiro.lineWidth = 1;
	tabuleiro.lineCap = 'round';
	tabuleiro.lineJoin = 'round';
	tabuleiro.fillStyle = '#FF0000';
	tabuleiro.fillText('Você perdeu!', 940, 281);
	bloqueiaDigitacao();
}

function apareceFimDeJogo(){
	setTimeout(function (){
		tabuleiro.clearRect(0, 0, 1200, 650);
		tabuleiro.font = 'bold 45px Inter';
		tabuleiro.lineWidth = 7;
		tabuleiro.lineCap = 'round';
		tabuleiro.lineJoin = 'round';
		tabuleiro.fillStyle = '#0A3871';
		tabuleiro.fillText('Fim de Jogo', 450, 260);
	}, 1300);
	bloqueiaDigitacao();
}

function apareceVenceu(){
	tabuleiro.font = 'bold 38px Inter';
	tabuleiro.lineWidth = 1;
	tabuleiro.lineCap = 'round';
	tabuleiro.lineJoin = 'round';
	tabuleiro.fillStyle = '#00FF00';
	tabuleiro.fillText('Você venceu!', 940, 281);
	bloqueiaDigitacao();
}

function escreverLetraCorreta(index){
	tabuleiro.font = 'bold 52px Inter';
	tabuleiro.lineWidth = 1;
	tabuleiro.lineCap = 'round';
	tabuleiro.lineJoin = 'round';
	tabuleiro.fillStyle = '#0A3871';
	
	var eixo = 692/palavraSecreta.length;
	tabuleiro.fillText(palavraSecreta[index], 350+(eixo*index), 525);
	tabuleiro.stroke();
};

function escreverLetraIncorreta(letra, errorsLeft){
	tabuleiro.font = '40px Inter';
	tabuleiro.lineWidth = 1;
	tabuleiro.lineCap = 'round';
	tabuleiro.lineJoin = 'round';
	tabuleiro.fillStyle = '#495057';
	tabuleiro.fillText(letra, 230+(60*(10-errorsLeft)), 605, 60);
};

function verificarLetraCorreta(key){
	if(letras.length < 1 || letras.indexOf(key) < 0){
		letras.push(key);
		return false;
	}else{
		letras.push(key.toUpperCase());
		return true;
	};
};

function adicionarLetraCorreta(i){
	palavraCorreta += palavraSecreta[i].toUpperCase();
};

function adicionarLetraIncorreta(letter){
	if(palavraSecreta.indexOf(letter) <= 0){
		erros-=1;
		apareceErros(erros);
	};
};

function verificarLetraDigitada(){
	if(palavraCorreta.length == palavraSecreta.length){
		apareceVenceu();
	};
	document.onkeydown = (e) => {
		letra = e.key.toUpperCase();
		
		if (e.keyCode >= 65 && e.keyCode <= 90){
			if(letras.includes(letra) || palavraCorreta.includes(letra)){
				mostraAviso();
			}else if(!letras.includes(letra) || !palavraCorreta.includes(letra)){
				if(!verificarLetraCorreta(e.key)){
					if(palavraSecreta.includes(letra)){
						adicionarLetraCorreta(palavraSecreta.indexOf(letra));
						for(let i = 0; i < palavraSecreta.length; i++){
							if(palavraSecreta[i] === letra){
								escreverLetraCorreta(i);
							};
							if(palavraCorreta.length == palavra.length){
								apareceVenceu();
							}
						};
					};
				}else{
					if(!verificarLetraCorreta(e.key))
					return;
					adicionarLetraIncorreta(letra);
					escreverLetraIncorreta(letra, erros);
				};
			};
		}else{
			alert('Digite apenas letras!')
		}
	};
};

function mostraAviso(){
	alert('Letra repetida!');
};

function bloqueiaDigitacao(){
	document.onkeydown = null;
};
