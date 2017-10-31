window.addEventListener('load', () => {
  const client = new ClientJS();
  const fingerprint = client.getFingerprint();

  console.log(`Your fingerprint: ${fingerprint}`);
  console.log(`Browser information used: `);
  console.log(`\tbrowser - ${client.getUserAgent()}`);
  console.log(`\tscreen - ${client.getScreenPrint()}`);
  console.log(`\tplugins - ${client.getPlugins()}`);
  console.log(`\tmime types - ${client.getMimeTypes()}`);
  console.log(`\tfonts - ${client.getFonts()}`);
  console.log(`\ttimezone - ${client.getTimeZone()}`);
  console.log(`\tlanguage - ${client.getLanguage()}`);

  const canvas = document.querySelector('#canvas');
  const context = canvas.getContext('2d');

  const width = canvas.width = window.innerWidth * 2;
  const height = canvas.height = window.innerHeight * 2;

  Math.seedrandom(fingerprint);

  function random() {
    const args = Array.from(arguments);
    let min = 0;
    let max = 1;

    switch (args.length) {
      case 1:
        [max] = args;
        break;
      case 2:
        [min, max] = args;
        break;
    }

    return Math.max(min, Math.round(Math.random() * (max)));
  }

  function pickRandom(array) {
    return array[random(array.length)];
  }

  function randomColourScheme() {
    return new ColorScheme()
      .from_hue(random(359))
      .scheme('analogic')
      .variation(pickRandom(['default', 'pastel', 'soft', 'light', 'hard', 'pale']))
      .web_safe(true)
      .colors();
  }

  const colours = randomColourScheme();

  function randomColour() {
    return pickRandom(colours);
  }

  function randomStyle(ctx, callback) {
    const { strokeStyle, fillStyle, lineWidth } = ctx;
    const colour = randomColour();
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    ctx.lineWidth = random(5, 10);
    callback();
    ctx.strokeStyle = strokeStyle;
    ctx.fillStyle = fillStyle;
    ctx.lineWidth = lineWidth;
  }

  function randomPoint(w, h) {
    return [random(w), random(h)];
  }

  function randomPoints(w, h, length) {
    return Array.apply(null, { length: length || random(10) }).map(() => randomPoint(w, h));
  }
  
  function randomBezier(ctx, w, h) {
    randomStyle(ctx, () => {
      ctx.beginPath();
      ctx.moveTo(random(w), random(h));

      bezierCurveThrough(ctx, randomPoints(w, h));

      ctx.stroke();
      ctx.closePath();

      ctx.moveTo(0, 0);
    });
  }

  for (let i = 0; i < 1000; i++) {
    randomBezier(context, width, height);
  }
});
