const deleteCard = document.querySelectorAll('.delete-card-lnk');

if (deleteCard) {
  deleteCard.forEach((card) => {
    card.addEventListener('click', async() => {
        
      const cardId = card.getAttribute('data-cardId');
      const userId = card.getAttribute('data-userId');
      const deckId = card.getAttribute('data-deckId');
      const url = `/overview/${userId}/${deckId}/${cardId}/delete-card`;
      const response = await fetch(url,{
        method:'DELETE'
      })
      window.location.href = `/overview/${userId}/${deckId}/list-deck-cards`;
      
    });
  });
  
}
