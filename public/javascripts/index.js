
// const db = require('../db/models');

// document.addEventListener ("DOMContentLoaded", event => {
const reviewButtons = document.querySelectorAll('#review-btn')

for (let i = 0; i < reviewButtons.length; i++) {
  const reviewButton = reviewButtons[i]

  reviewButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log('REVIEW ID -----------------', id);

    const res = await fetch(`/reviews/${id}`, {
      method: 'DELETE'
    });

    let success = await res.json()

    if (success.message === 'Success') {
      const container = document.querySelector(`#container-${id}`)
      container.remove();
    }

  });

}

const reviewButtons = document.querySelectorAll('.collectionId')

for (let i = 0; i < collectionButtons.length; i++) {
  const reviewButton = reviewButtons[i]

  reviewButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log('review ID -----------------', id);

    const res = await fetch(`/reviews/${id}`, {
      method: 'DELETE'
    });

    let success = await res.json()

    if (success.message === 'Success') {
      const container = document.querySelector(`#container-${id}`)
      container.remove();
    }

  });

}



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
