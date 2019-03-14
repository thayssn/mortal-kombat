window.addEventListener('load' , () => {
  let okBtn = document.querySelector('#ok');
  let secrets = document.querySelectorAll('.lock');
  let secretWrapper = document.querySelector('#lock_secret');
  let secretWord = '202cb962ac59075b964b07152d234b70';

  for (let secret of secrets) {
    let image = secret.querySelector('img');

    image.addEventListener('click', (e) => {
      let imgidx = image.dataset.idx;
      let idx = upOne(imgidx, 3);
      image.dataset.idx = idx;
      image.src = idx + '.png'
    });
  }

  okBtn.addEventListener('click', () => {
    let word = '';
    for(let secret of secrets) {
      let image = secret.querySelector('img');
      word += image.dataset.idx;
    }

    word = CryptoJS.MD5(word).toString();
    console.log(word, secretWord);

    if(word === secretWord){
      console.log('correct');
      secretWrapper.classList.remove('locked');
    }
  });

  function handler(e) {
  }

  function upOne(n, max){
    return parseInt(n) < max ? parseInt(n)+1 : 1
  }
})