var codeA = 'A'.charCodeAt(0);
var codeZ = 'Z'.charCodeAt(0);

var encryptButton = document.getElementById('encrypt');
encryptButton.onclick = encrypt;

var decryptButton = document.getElementById('decrypt');
decryptButton.onclick = decrypt;

var shiftInput = document.getElementById('shiftNum');

var plainInput = document.getElementById('plainText');
var encryptedInput = document.getElementById('encryptedText');

Number.prototype.mod = function(n) {
    return ((this % n) + n) % n;
};

function encrypt() {
    var shift = parseInt(shiftInput.value);

    var plainText = plainInput.value.toUpperCase();
    console.log(plainText);

    if (shift == 0) {
        shift = parseInt(25 * Math.random()) + 1;
    } else {
        shift = 26 - shift.mod(26);
    }

    var string = shiftBy(plainText, shift);
    encryptedInput.value = string;
}

function decrypt() {
    var shift = parseInt(shiftInput.value);

    var encryptedText = encryptedInput.value.toUpperCase();
    console.log(encryptedText);

    if (shift == 0) {
        shift = findShift(encryptedText);
    } else {
        shift = shift.mod(26);
    }

    var string = shiftBy(encryptedText, shift);
    plainInput.value = string;
}

function shiftBy(string, shift) {
    var out = '';
    for (var i = 0; i < string.length; i++) {
        var code = string.charCodeAt(i);
        if (codeA <= code && code <= codeZ) {
            code = (code + shift - codeA).mod(26) + codeA;
            out += String.fromCharCode(code);
        } else {
            out += ' ';
        }
    }
    return out;
}

function findShift(string) {
    var arr = []
    var maxIndex = 0;
    for (var i = 0; i < 26; i++) {
        var text = shiftBy(string, i);
        // console.log(text);
        arr[i] = 0;

        for (var j = 0; j < list10000.length; j++) {
            var regex = new RegExp('([^a-zA-Z0-9]|^)(' + list10000[j] + ')(?=[^a-zA-Z0-9]|$)', 'i');
            var count = (text.match(regex) || []).length;

            arr[i] += count;
        }

        if (arr[maxIndex] < arr[i]) {
            maxIndex = i;
        }
    }
    return maxIndex;
}
