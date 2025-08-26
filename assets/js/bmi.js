
function classifyBMI(bmi){
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

document.getElementById('bmi-form')?.addEventListener('submit', function(e){
  e.preventDefault();
  const h = parseFloat(document.getElementById('height').value);
  const unit = document.getElementById('heightUnit').value;
  const w = parseFloat(document.getElementById('weight').value);
  if(!h || !w || h <= 0 || w <= 0){ 
    document.getElementById('bmi-result').textContent = 'Please enter valid height and weight.'; 
    return; 
  }
  let meters = unit === 'cm' ? h/100 : h;
  const bmi = w / (meters*meters);
  const category = classifyBMI(bmi);
  document.getElementById('bmi-result').textContent = `Your BMI is ${bmi.toFixed(1)} — ${category}`;
});
