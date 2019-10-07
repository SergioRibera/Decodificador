var areaResCodArea = document.getElementById("res_Codificar");
var areaResDedArea = document.getElementById("res_Decodificar");

var div_Cod = document.getElementById("cont_res_Cod_p");
var div_Dec = document.getElementById("cont_res_Dec_p");

Started();

function Started(){
	//Uso De Variables Para Resetearlas
	document.getElementById("texto_Cod").value = "";
	document.getElementById("texto_Dec").value = "";
	areaResCodArea.value = "";
	areaResDedArea.value = "";

	div_Cod.style.display = 'none';
	div_Dec.style.display = 'none';
}

function Codificar(){
	//ActivarEffect();
	var textoNormal = document.getElementById("texto_Cod").value;
	var TextoObtenido = Base64.encode(textoNormal);
	div_Cod.style.display = 'block';
	areaResCodArea.value = "";
	areaResCodArea.value = TextoObtenido;
}

function Decodificar(){
	//ActivarEffect();
	var TextoCodificado = document.getElementById("texto_Dec").value;
	var TextoObtenido = Base64.decode(TextoCodificado);
	div_Dec.style.display = 'block';
	areaResDedArea.value = "";
	areaResDedArea.value = TextoObtenido;
}

function CopiarTexto(id_elemento){
	// Crea un campo de texto "oculto"
	var aux = document.createElement("input");
	// Asigna el contenido del elemento especificado al valor del campo
	aux.setAttribute("value", document.getElementById(id_elemento).value);
	// Añade el campo a la página
	document.body.appendChild(aux);
	// Selecciona el contenido del campo
	aux.select();
	// Copia el texto seleccionado
	document.execCommand("copy");
	// Elimina el campo de la página
	document.body.removeChild(aux);
}
function Clicked(){
	//ActivarEffect();
	document.getElementById("texto_Cod").value = "";
	document.getElementById("texto_Dec").value = "";
	areaResCodArea.value = "";
	areaResDedArea.value = "";

	div_Cod.style.display = 'none';
	div_Dec.style.display = 'none';
}

function ActivarEffect(){
	var $waveElement = $('<span class="wave-effect" />'),
		$buttonElement = this,
		size = parseInt(Math.min($buttonElement.height(), $buttonElement.width()) * Math.PI);
}

var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while ( i < utftext.length ) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}
}