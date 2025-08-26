
function showStatus(el, msg, ok=false){
  el.textContent = msg;
  el.style.color = ok ? 'green' : 'crimson';
}

function validateEmail(email){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleAppointment(e){
  e.preventDefault();
  const name = document.getElementById('a_name').value.trim();
  const email = document.getElementById('a_email').value.trim();
  const phone = document.getElementById('a_phone').value.trim();
  const date = document.getElementById('a_date').value.trim();
  const msg  = document.getElementById('a_msg').value.trim();
  const status = document.getElementById('appointment-status');

  if(!name || !validateEmail(email) || !phone || !date || !msg){
    showStatus(status, 'Please complete all fields with valid values.');
    return;
  }

  // Placeholder POST to a serverless/email API endpoint
  // fetch('/api/appointment', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,phone,date,msg})})
  //   .then(r=>{ if(!r.ok) throw new Error('Network error'); return r.json(); })
  //   .then(()=> showStatus(status, 'Appointment request sent!', true))
  //   .catch(()=> showStatus(status, 'Failed to send. Please try again or use the contact page.'));

  // For now, show success locally
  showStatus(status, 'Appointment request (demo) validated. Connect backend to send.', true);
  e.target.reset();
}

function handleContact(e){
  e.preventDefault();
  const name = document.getElementById('c_name').value.trim();
  const email = document.getElementById('c_email').value.trim();
  const msg  = document.getElementById('c_msg').value.trim();
  const status = document.getElementById('contact-status');

  if(!name || !validateEmail(email) || !msg){
    showStatus(status, 'Please fill your name, a valid email, and your message.');
    return;
  }

  // Option A: POST to backend (placeholder)
  // fetch('/api/send', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,msg})})
  //  .then(r=>{ if(!r.ok) throw new Error('Network error'); return r.json(); })
  //  .then(()=> showStatus(status, 'Message sent! We will get back to you shortly.', true))
  //  .catch(()=> showStatus(status, 'Failed to send. Please try again or use your email client.'));

  // Option B: mailto fallback
  const subject = encodeURIComponent('WellSpring Contact');
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${msg}`);
  const mailto = `mailto:clinic@example.com?subject=${subject}&body=${body}`;
  const a = document.getElementById('mailto-fallback');
  if(a){ a.href = mailto; a.click(); }
  showStatus(status, 'Opened your email client (mailto).', true);
  e.target.reset();
}

document.getElementById('appointment-form')?.addEventListener('submit', handleAppointment);
document.getElementById('contact-form')?.addEventListener('submit', handleContact);
