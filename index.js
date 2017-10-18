window.addEventListener('load', () => {
  const client = new ClientJS();
  const fingerprint = client.getFingerprint();
  const canvas = document.querySelector('#canvas');
  const context = canvas.getContext('2d');

  const width = canvas.width = window.innerWidth * 2;
  const height = canvas.height = window.innerHeight * 2;

  Math.seedrandom(fingerprint);

  function random(n) {
    return Math.round(Math.random() * n)
  }

  for (let i = 0; i < 10000; i++) {
    context.fillStyle = `#${random(4294967295).toString(16)}`;
    context.fillRect(random(width / 2), random(height / 2), random(width / 2), random(height / 2));
  }
});
