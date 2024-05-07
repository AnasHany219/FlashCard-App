const flibCardBtn = document.querySelector('.flib-card-face');
const innerCard = document.querySelector('.card-inner');
const cardFrontFace = document.querySelector('.study-card-front');
const cardBackFace = document.querySelector('.study-card-back');
const nextCardBtn = document.querySelector('.next-card');
let nextCard = 0;
flibCardBtn.addEventListener('click', () => {
  innerCard.classList.toggle('flipped');
});
let data = [];
const getCards = async () => {
  const userId = nextCardBtn.getAttribute('data-userId');
  const deckId = nextCardBtn.getAttribute('data-deckId');
  const url = `/overview/${userId}/${deckId}/styd-cards/show-card`;
  const options = {
    method: 'GET',
  };
  const response = await fetch(url, options);
  data = await response.json();
  if(data.length > 0){
     cardFrontFace.textContent = data[nextCard].cardFront;
     cardBackFace.textContent = data[nextCard].cardBack;
     nextCard++;
  }else{
    cardFrontFace.textContent = `👓 كدا أنت جامد يعني مفكرني مش هعرف إنك هتعمل الحركة دي`;
    cardBackFace.textContent = `🤡 ربنا يعينك على المهلبية إلى في دماغك دي`;
  }
}
getCards();
nextCardBtn.addEventListener('click', async () => {
  if(nextCard >= data.length && data.length > 0){
    cardFrontFace.textContent = `🥳بس كدا يا ريس خلاص كدا خلصت`;
    cardBackFace.textContent = `😠 بتبص على إي هو مش أنا قلتك إنك خلصت ياعم`;
    return;
  }
  cardFrontFace.textContent = data[nextCard].cardFront;
  cardBackFace.textContent = data[nextCard].cardBack;
  nextCard++;
});
