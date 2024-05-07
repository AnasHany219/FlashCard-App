const deleteDeckBtns = document.querySelectorAll('.delete-deck-btn');

if(deleteDeckBtns.length > 0){
    deleteDeckBtns.forEach((deleteDeckBtn) => {
      deleteDeckBtn.addEventListener('click', async () => {
        const userId = deleteDeckBtn.getAttribute('data-userId');
        const deckId = deleteDeckBtn.getAttribute('data-deckId');
        const url = `/overview/${userId}/${deckId}`;
        const options = {
          method: 'DELETE',
        };
        try {
          const deleteDeckResponse = await fetch(url, options);
          const deleteDeckData = await deleteDeckResponse.json();
          window.location.href = deleteDeckData.redirect;
        } catch (err) {
          console.log(err);
        }
      });
    });
}