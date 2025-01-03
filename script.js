document.getElementById('purityForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const ph = parseFloat(document.getElementById('ph').value);
  const tds = parseFloat(document.getElementById('tds').value);
  const chloramines = parseFloat(document.getElementById('chloramines').value);
  const sulphate = parseFloat(document.getElementById('sulphate').value);
  const conductivity = parseFloat(document.getElementById('conductivity').value);
  const toc = parseFloat(document.getElementById('toc').value);
  const thms = parseFloat(document.getElementById('thms').value);
  const turbidity = parseFloat(document.getElementById('turbidity').value);

  // Define parameter limits and weights
  const limits = {
    ph: [6.5, 8.5],
    tds: 500,
    chloramines: 4,
    sulphate: 250,
    conductivity: 1500,
    toc: 2,
    thms: 80,
    turbidity: 1
  };

  const weights = {
    ph: 15,
    tds: 15,
    chloramines: 10,
    sulphate: 10,
    conductivity: 15,
    toc: 10,
    thms: 15,
    turbidity: 10
  };

  let totalScore = 0;
  let maxScore = 0;

  // Calculate score for each parameter
  function score(param, value) {
    if (param === 'ph') {
      return (value >= limits.ph[0] && value <= limits.ph[1]) ? weights.ph : 0;
    } else {
      return (value <= limits[param]) ? weights[param] : 0;
    }
  }

  totalScore += score('ph', ph);
  totalScore += score('tds', tds);
  totalScore += score('chloramines', chloramines);
  totalScore += score('sulphate', sulphate);
  totalScore += score('conductivity', conductivity);
  totalScore += score('toc', toc);
  totalScore += score('thms', thms);
  totalScore += score('turbidity', turbidity);

  // Calculate purity percentage
  maxScore = Object.values(weights).reduce((sum, w) => sum + w, 0);
  const purityPercentage = (totalScore / maxScore) * 100;

  document.getElementById('result').textContent =
    `Water Purity: ${purityPercentage.toFixed(2)}%`;
});
