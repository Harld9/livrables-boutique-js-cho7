const boutonburger = document.getElementById('boutonburger');
const listemenu = document.getElementById('listemenu');


boutonburger.addEventListener('click', () => {
  listemenu.classList.toggle('active'); 
});