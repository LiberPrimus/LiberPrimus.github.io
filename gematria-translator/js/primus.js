let runes = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚩ', 'ᚱ', 'ᚳ', 'ᚷ', 'ᚹ', 'ᚻ', 'ᚾ', 'ᛁ', 'ᛄ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛋ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛝ', 'ᛟ', 'ᛞ', 'ᚪ', 'ᚫ', 'ᚣ', 'ᛡ', 'ᛠ']
let ascii = [5792, 5794, 5798, 5801, 5809, 5811, 5815, 5817, 5819, 5822, 5825, 5828, 5831, 5832, 5833, 5835, 5839, 5842, 5846, 5847, 5850, 5853, 5855, 5854, 5802, 5803, 5795, 5857, 5856]
let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
let letters = ['F', 'U', 'TH', 'O', 'R', 'C', 'G', 'W', 'H', 'N', 'I', 'J', 'EO', 'P', 'X', 'S', 'T', 'B', 'E', 'M', 'L', 'NG', 'OE', 'D', 'A', 'AE', 'Y', 'IO', 'EA']


window.onload = () => {
  document.querySelector('#translate').addEventListener('click', () => {
    document.querySelector('#resultContainer').style.visibility = "visible";
    let method = document.querySelector('#method').value;
    let message = document.querySelector('#userInput').value;
    let result = document.querySelector('#result');

    switch (method) {
      case "rtt":
        result.innerHTML = runesToText(message);
        break;
      case "rtd":
        result.innerHTML = runesToDecimal(message);
        break;
      case "ttr":
        result.innerHTML = textToRunes(message);
        break;
      case "ttd":
        result.innerHTML = textToDecimal(message);
        break;
      case "dtt":
        result.innerHTML = decimalToText(message);
        break;
      case "dtr":
        result.innerHTML = decimalToRunes(message);
        break;
    }
  });
}


window.methodChanged = () => {
  let val = document.querySelector('#method').value;
  switch (val) {
    case 'rtt':
    case 'rtd':
      document.querySelector('#userInput').placeholder = "ᚹᛖᛚᚳᚩᛗᛖ ᛈᛁᛚᚷᚱᛁᛗ...";
      break;
    case "ttr":
    case "ttd":
      document.querySelector('#userInput').placeholder = "WELCOME PILGRIM...";
      break;
    case "dtt":
    case "dtr":
      document.querySelector('#userInput').placeholder = "7,18,20,5,3,19,18,  13,10,20,6,4,10,19...";
      break;
  }
}


window.runesToText = (message) => {
  let asciiMessage = [],
    letterMessage = [];

  for (let i = 0; i < message.length; i++) {
    let used = false;
    asciiMessage.push(message[i].charCodeAt(0));

    for (let j = 0; j < ascii.length; j++) {
      if (asciiMessage[i] === ascii[j]) {
        letterMessage.push(letters[j]);
        used = true;
      }
    }

    if (!used)
      letterMessage.push(' ');
  }
  return (letterMessage.join(''));
}


window.runesToDecimal = (message) => {
  let asciiMessage = [],
    decimalMessage = [];

  for (let i = 0; i < message.length; i++) {
    let used = false;
    asciiMessage.push(message[i].charCodeAt(0));

    for (let j = 0; j < ascii.length; j++) {
      if (asciiMessage[i] === ascii[j]) {
        decimalMessage.push(values[j]);
        used = true;
      }
    }

    if (!used)
      decimalMessage.push(' ');
  }
  return decimalMessage.join(',').split(', ,').join('  ').split('   ,').join('  ').split(',,').join(',');
}


window.textToDecimal = (message) => {
  message = message.toUpperCase();
  let skipNext = false;
  let decimalMessage = [];
  for (let i = 0; i < message.length; i++) {
    if (!skipNext) {
      if (message[i] === " ") {
        decimalMessage.push(" ");
      } else {
        switch (message[i]) {
          case "T":
            if (message[i + 1] === "H") {
              decimalMessage.push(values[2]);
              skipNext = true;
            }
            break;
          case "N":
            if (message[i + 1] === "G") {
              decimalMessage.push(values[21]);
              skipNext = true;
            }
            break;
        }
        if (!skipNext)
          decimalMessage.push(values[letters.indexOf(message[i])]);
      }
    } else {
      skipNext = false;
    }
  }
  return decimalMessage.join(',').split(', ,').join('  ').split('   ,').join('  ').split(',,').join(',');
}


window.textToRunes = (message) => {
  message = message.toUpperCase();
  let skipNext = false;
  let runesMessage = [];
  for (let i = 0; i < message.length; i++) {
    if (!skipNext) {
      if (message[i] === " ") {
        runesMessage.push(" ");
      } else {
        switch (message[i]) {
          case "T":
            if (message[i + 1] === "H") {
              runesMessage.push(runes[2]);
              skipNext = true;
            }
            break;
          case "N":
            if (message[i + 1] === "G") {
              runesMessage.push(runes[21]);
              skipNext = true;
            }
            break;
        }
        if (!skipNext)
          runesMessage.push(runes[letters.indexOf(message[i])]);
      }
    } else {
      skipNext = false;
    }
  }
  return runesMessage.join('');
}


window.decimalToText = (message) => {
  let splitMessage;
  let textMessage = [];
  if (message.includes(' ')) {
    splitMessage = message.split(' ');
  } else if (message.includes(',')) {
    splitMessage = message.split(',');
  } else if (message.includes('.')) {
    splitMessage = message.split('.');
  } else if (message.includes('.')) {
    splitMessage = message.split(';');
  } else if (message.includes('|')) {
    splitMessage = message.split('|');
  } else if (message.includes('-')) {
    splitMessage = message.split('-');
  } else if (message.includes(':')) {
    splitMessage = message.split(':');
  } else {
    console.error('No separator found. Please separate values with a space or : . , ; - |');
    alert('No separator found.\nPlease separate values with a space or one of the following: . , ; - |\nUse double space to insert spaces');
    return false;
  }

  for (let i = 0; i < splitMessage.length; i++) {
    if (splitMessage[i].includes[' '])
      textMessage.push(' ');
    else
      textMessage.push(letters[values.indexOf(parseInt(splitMessage[i]))]);
  }

  return textMessage.join('');
}


window.decimalToRunes = (message) => {
  let splitMessage;
  let runesMessage = [];
  if (message.includes(' ')) {
    splitMessage = message.split(' ');
  } else if (message.includes(',')) {
    splitMessage = message.split(',');
  } else if (message.includes('.')) {
    splitMessage = message.split('.');
  } else if (message.includes('.')) {
    splitMessage = message.split(';');
  } else if (message.includes('|')) {
    splitMessage = message.split('|');
  } else if (message.includes('-')) {
    splitMessage = message.split('-');
  } else if (message.includes(':')) {
    splitMessage = message.split(':');
  } else {
    console.error('No separator found. Please separate values with a space or : . , ; - |');
    alert('No separator found.\nPlease separate values with a space or one of the following: . , ; - |\nUse double space to insert spaces');
    return false;
  }

  for (let i = 0; i < splitMessage.length; i++) {
    if (splitMessage[i].includes[' '])
      runesMessage.push(' ');
    else
      runesMessage.push(runes[values.indexOf(parseInt(splitMessage[i]))]);
  }

  return runesMessage.join('');
}
