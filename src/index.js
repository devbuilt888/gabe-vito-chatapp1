import './styles.css';
import logo from './assets/logo.png';

const inputField = document.getElementById('input-field');
const apiKeyInput = document.getElementById('api-key'); // Select the API key input field
const form = document.getElementById('mainForm');
const spinner = document.getElementById('spinner');
const arrow = document.getElementById('arrow');
const resultP = document.getElementById('result');
document.getElementById('logo').src = logo;

let error = "";
let result = "";
let loading = false;
let mode = 'trading'; // Default mode

async function getData(input) {
  let messageContent;

  if (mode === 'trading') {
    messageContent = `You know how to use trading platforms such as Webull and Thinkorswim. 
        You have been trading options and you are extremely profitable.
        You really give specific answers and strategies.
        You go straight to the point, your replies are under 500 characters.\n
        If you get asked anything unrelated to trading, you can say "I'm sorry, I can't help with that. I'm a trading bot."
        Here is my message: ${input}\n`;
  } else {
    messageContent = `You are a personal improvement expert. 
        You give advice on how to be more productive and have a better work life balance.
        You are very knowledgeable and give specific advice about being productive and having good habits.
        Your replies are under 500 characters.\n
        If you get asked anything unrelated to personal improvement, you can say "I'm sorry, I can't help with that. I'm a personal improvement bot."
        Here is my message: ${input}\n`;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKeyInput.value // Use the value from the API key input field
      },
      body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{
          "role": "user",
          "content": messageContent
        }]
      })
    });

    if (!response.ok) {
      console.error("HTTP ERROR: " + response.status + "\n" + response.statusText);
      loading = false;
      spinner.style.display = 'none';
      resultP.textContent = "An error occurred. Make sure you entered your API key on the top right.";
    } else {
      const data = await response.json();
      result = data.choices[0].message.content;
      loading = false;
      error = "";
      resultP.textContent = result;
      spinner.style.display = 'none';
      arrow.style.display = 'inline';
    }
  } catch (error) {
    console.error("ERROR: " + error);
    resultP.textContent = error;
    spinner.style.display = 'none';
    arrow.style.display = 'inline';
  }
}

form.onsubmit = function(event) {
  event.preventDefault();
  loading = true;
  spinner.style.display = 'inline';
  arrow.style.display = 'none';
  getData(inputField.value);
}

// Function to select a card and change the mode
function selectCard(cardId) {
  const card1 = document.getElementById('card-1');
  const card2 = document.getElementById('card-2');

  // Remove selected class from all cards
  card1.classList.remove('selected-card');
  card2.classList.remove('selected-card');

  // Add selected class to the clicked card
  document.getElementById(cardId).classList.add('selected-card');

  // Change mode based on the selected card
  if (cardId === 'card-1') {
    mode = 'trading';
  } else {
    mode = 'personal_improvement';
  }

  console.log('Switched to ' + mode + ' mode');
}

// Add click event listeners to cards
document.getElementById('card-1').onclick = function() {
  selectCard('card-1');
}

document.getElementById('card-2').onclick = function() {
  selectCard('card-2');
}
