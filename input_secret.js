window.addEventListener('load', () => {
  let solvedSecrets = JSON.parse(localStorage.getItem('solved')) || [];

  for (let item of solvedSecrets) {
    let secret = document.querySelector(`.secret#${item}`);
    if(secret) secret.classList.remove('locked')
  }

  let secrets = document.querySelectorAll('.secret.locked');

  for (let secret of secrets) {
    let input = secret.querySelector('input');
    let clock = secret.querySelector('.clock');
    input.secretWord = '9330d4c500c8cb74fc630527afbec78c';
    input.addEventListener('keyup', keyuphandler);

    let deadline = clock.dataset.deadline;

    if (getTimeRemaining(deadline).total > 0) {
      initializeClock(clock, deadline, () => {
        console.log('finished!');
        secret.classList.add('released');
      });
    }else{
      secret.classList.add('released');
    }
  }

  function keyuphandler (e) {
    let word = CryptoJS.MD5(this.value.toLowerCase()).toString();
    if(word === this.secretWord){
      console.log('correct');
      let secret = this.closest('.secret');
      solvedSecrets.push(secret.getAttribute('id'));
      localStorage.setItem('solved', JSON.stringify(solvedSecrets));
      secret.classList.remove('locked');
      this.removeEventListener('keyup', keyuphandler);

    }
  }
})