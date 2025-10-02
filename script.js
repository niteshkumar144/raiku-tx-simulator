let myChart;

function simulate() {
  const volumeInput = document.getElementById('volume').value;
  const volume = parseInt(volumeInput) || 0;
  const congestion = parseFloat(document.getElementById('congestion').value);
  const errorDiv = document.getElementById('error');

  // Input validation
  if (!volumeInput || volume <= 0) {
    errorDiv.innerHTML = 'Please enter a valid tx volume (e.g., 100)';
    return;
  } else {
    errorDiv.innerHTML = '';
  }

  const failWithout = volume * congestion;
  const failWith = volume * 0.001;

  const resultDiv = document.getElementById('result');
  resultDiv.style.opacity = '0';
  resultDiv.innerHTML = `
    Without Raiku: ${Math.round(failWithout)} tx fail 😢<br>
    With Raiku: ${Math.round(failWith)} tx fail (99.9% success!) 🚀
  `;
  setTimeout(() => {
    resultDiv.style.transition = 'opacity 0.5s ease-in-out';
    resultDiv.style.opacity = '1';
  }, 100);

  const ctx = document.getElementById('chart').getContext('2d');
  if (myChart) myChart.destroy();
  myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Without Raiku', 'With Raiku'],
      datasets: [{
        label: 'Failed Transactions',
        data: [failWithout, failWith],
        backgroundColor: ['#FF4D4D', '#4CAF50'],
        borderColor: ['#FF1A1A', '#388E3C'],
        borderWidth: 2,
      }]
    },
    options: {
      scales: {
        y: { 
          beginAtZero: true, 
          grid: { color: 'rgba(0,0,0,0.1)' }, 
          ticks: { color: '#1a1a2e' }
        },
        x: { 
          grid: { display: false }, 
          ticks: { color: '#1a1a2e' }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutBounce'
      },
      plugins: {
        legend: { labels: { color: '#1a1a2e', font: { size: 14 } } },
        title: {
          display: true,
          text: 'Raiku vs Solana Transaction Fails',
          color: '#6B48FF',
          font: { size: 16, weight: '600' }
        }
      }
    }
  });
}

function generateMeme() {
  const captions = [
    'Raiku dragon devours tx fails! 🐉 #RaikuSaves',
    'Solana spam? Raiku says NO WAY! 😎 #Solana',
    '99.9% uptime with Raiku’s magic! 💪 #Raiku'
  ];
  const images = [
    'https://via.placeholder.com/300x200/6B48FF/FFF?text=Raiku+Dragon+Saves+Tx',
    'https://via.placeholder.com/300x200/4CAF50/FFF?text=Raiku+Crushes+Spam',
    'https://via.placeholder.com/300x200/FF4D4D/FFF?text=Raiku+Tx+Hero'
  ];
  const randomIndex = Math.floor(Math.random() * captions.length);
  const randomCaption = captions[randomIndex];
  const randomImage = images[randomIndex];

  const memeDiv = document.getElementById('meme-result');
  memeDiv.style.opacity = '0';
  memeDiv.innerHTML = `
    <p>${randomCaption}</p>
    <img src="${randomImage}" alt="Raiku Meme">
    <br><a href="https://x.com/intent/tweet?text=${encodeURIComponent(randomCaption)}%20Try%20my%20Raiku%20Tx%20Simulator!%20https://raiku.com&hashtags=Raiku,Solana&via=raikucom" target="_blank">Share on X</a>
  `;
  setTimeout(() => {
    memeDiv.style.transition = 'opacity 0.5s ease-in-out';
    memeDiv.style.opacity = '1';
  }, 100);
}
