// Clear the result and details boxes when any input changes
document.getElementById('abgForm').addEventListener('input', function () {
    const resultBox = document.getElementById('result');
    const detailsBox = document.getElementById('details');
    resultBox.innerHTML = '';
    detailsBox.innerHTML = '';
  });
  
  // Event listener for the 'Interpret' button
  document.getElementById('interpretBtn').addEventListener('click', function () {
    const ph = parseFloat(document.getElementById('ph').value);
    const pco2 = parseFloat(document.getElementById('pco2').value);
    const hco3 = parseFloat(document.getElementById('hco3').value);
    const pao2 = parseFloat(document.getElementById('pao2').value);
    const sao2 = parseFloat(document.getElementById('sao2').value);
    const resultBox = document.getElementById('result');
    const detailsBox = document.getElementById('details');
  
    if (isNaN(ph) || isNaN(pco2) || isNaN(hco3) || isNaN(pao2) || isNaN(sao2)) {
      resultBox.innerHTML = "<p>Please enter valid numbers for all fields.</p>";
      return;
    }
  
    let interpretation = '';
    let causes = '';
    let management = '';
    let compensationStatus = '';
  
    // Handle Acidosis conditions
    if (ph < 7.35) {
      if (pco2 > 45) {
        interpretation = 'Respiratory Acidosis';
        causes = 'Hypoventilation leading to CO₂ retention.';
        management = '1. Treat underlying cause (e.g., COPD exacerbation, sedative overdose, neuromuscular weakness).\n' +
                    '2. Improve ventilation (e.g., non-invasive ventilation, intubation, or mechanical ventilation).\n' +
                    '3. Reverse sedatives/narcotics if indicated.';
        compensationStatus = (hco3 > 26) ? 'Partially compensated' : 'Uncompensated';
      } else if (hco3 < 22) {
        interpretation = 'Metabolic Acidosis';
        causes = 'Increased acid production, loss of bicarbonate, or inability to excrete hydrogen ions.';
        management = '1. Calculate the anion gap: AG = Na⁺ - (Cl⁻ + HCO₃⁻).\n' +
                    '   - High AG: Lactic acidosis, ketoacidosis, renal failure, toxins (methanol, ethylene glycol).\n' +
                    '   - Normal AG: Diarrhea, renal tubular acidosis.\n' +
                    '2. Treat underlying cause (e.g., fluids for shock, insulin for DKA).';
        compensationStatus = (pco2 < 35) ? 'Partially compensated' : 'Uncompensated';
      }
    }
    // Handle Alkalosis conditions
    else if (ph > 7.45) {
      if (pco2 < 35) {
        interpretation = 'Respiratory Alkalosis';
        causes = 'Hyperventilation causing CO₂ loss.';
        management = '1. Address underlying cause (e.g., anxiety, hypoxemia, sepsis).\n' +
                    '2. Encourage controlled breathing (e.g., breathing into a paper bag for anxiety).\n' +
                    '3. Administer oxygen if hypoxemia is present.';
        compensationStatus = (hco3 < 22) ? 'Partially compensated' : 'Uncompensated';
      } else if (hco3 > 26) {
        interpretation = 'Metabolic Alkalosis';
        causes = 'Excess bicarbonate or loss of hydrogen ions (e.g., vomiting, diuretics).';
        management = '1. Identify and treat the cause:\n' +
                    '   - Chloride-responsive: Administer IV saline and potassium replacement.\n' +
                    '   - Chloride-resistant: Treat underlying condition (e.g., aldosterone antagonist).\n' +
                    '2. Avoid bicarbonate administration and reduce contributing medications.';
        compensationStatus = (pco2 > 45) ? 'Partially compensated' : 'Uncompensated';
      }
    }
    // Handle Normal condition
    else {
      interpretation = 'Normal';
      causes = 'No significant abnormality detected.';
      management = 'Maintain current status and monitor as needed.';
      compensationStatus = 'Normal';
    }
  
    // Check for Fully Compensated: pH normal, HCO3 acidic, and PaCO2 alkalosis
    if (ph >= 7.35 && ph <= 7.45 && hco3 < 22 && pco2 < 35) {
      interpretation = 'Fully Compensated';
      compensationStatus = 'Fully compensated';
    }
  
    // Check for Partially Compensated: pH abnormal, HCO3 alkalosis, and PaCO2 acidic
    if ((ph < 7.35 || ph > 7.45) && hco3 > 26 && pco2 > 45) {
      compensationStatus = 'Partially compensated';
    }
  
    // Display the result and buttons for causes and management
    resultBox.innerHTML = `<h2>Result: ${interpretation}</h2>
      <p><strong>Compensation Status:</strong> ${compensationStatus}</p>
      <button id="showCauses">Show Causes</button>
      <button id="showManagement">Show Management</button>`;
  
    // Add event listeners for the buttons to show causes and management
    document.getElementById('showCauses').addEventListener('click', function () {
      detailsBox.innerHTML = `<p><strong>Causes:</strong><br>${causes.replace(/\n/g, '<br>')}</p>`;
    });
  
    document.getElementById('showManagement').addEventListener('click', function () {
      detailsBox.innerHTML = `<p><strong>Management:</strong><br>${management.replace(/\n/g, '<br>')}</p>`;
    });
  });
  