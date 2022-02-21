console.log('hi')
const collectionButtons = document.querySelectorAll('.collectionId')

for (let i = 0; i < collectionButtons.length; i++) {
  const collectionButton = collectionButtons[i]

  collectionButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log('COLLECTION ID -----------------', id);

    const res = await fetch(`/collections/${id}`, {
      method: 'DELETE'
    });

    let success = await res.json()

    if (success.message === 'Success') {
      const container = document.querySelector(`#container-${id}`)
      container.remove();
    }

  });

}


const reviewButtons = document.querySelectorAll('.reviewBtn')

for (let i = 0; i < reviewButtons.length; i++) {
  const reviewButton = reviewButtons[i]

  reviewButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const reviewString = e.target.id; //review1
    // console.log('review string -----------------', reviewString);

    const stringId = reviewString.split('-');
    // console.log('stringId-----------------', stringId);

    const stringId2 = stringId[1]

    const id = parseInt(stringId2, 10);

    // console.log('review ID -----------------', id);

    const res = await fetch(`/reviews/${id}`, {
      method: 'DELETE'
    });

    let success = await res.json()

    if (success.message === 'Success') {
      const container = document.querySelector(`indiv-movie-${id}`)
      container.remove();
    }
  });
}


const movieButtons = document.querySelectorAll('.delMovieBtn')

for (let i = 0; i < movieButtons.length; i++) {
  const movieButton = movieButtons[i]

  movieButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log('MOVIE ID -----------------', id);

    const res = await fetch(`/collections/${id}/movies/${movieId}`, {
      method: 'DELETE'
    });

    let success = await res.json()

    if (success.message === 'Success') {
      const container = document.querySelector(`#container-${id}`)
      container.remove();
    }

  });

}

// const editReviewButtons = document.querySelectorAll('editBtnOnReviews');

// for (let i = 0; i < editReviewButtons.length; i++) {
//   const editReviewButton = editReviewButtons[i]

//   editReviewButton.addEventListener("click", async (e) => {
//     console.log('BUTTON HAS BEEN CLICKED-------------')
//     e.preventDefault();
//     const editReviewString = e.target.id; //review1
//     // console.log('review string -----------------', reviewString);

//     const stringId = editReviewString.split('-');
//     console.log('stringId-----------------', stringId);

//     const stringId2 = stringId[1]

//     const id = parseInt(stringId2, 10);

//     console.log('review ID -----------------', id);

//     const res = await fetch(`/reviews/${id}/edit`);

//   });

// }


// const deleteBtns = document.querySelectorAll('.delete-btn')

// for (let i = 0; i < deleteBtns.length; i++) {
//   const btn = deleteBtns[i];
//   // Task 24c
//   btn.addEventListener('click', async (e) => {
//     e.preventDefault()
//     const postId = e.target.id
//     console.log(postId)
//     const res = await fetch(`/posts/${postId}`, {
//       method: 'DELETE'
//     })

//     // Task 24e
//     const data = await res.json()
//     console.log(data)

//     if (data.message === "Success") {
//       const container = document.querySelector(`#post-container-${postId}`)
//       container.remove()
//     } else {

//     }
//   })
// // }
