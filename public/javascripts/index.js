const db = require('../db/models');

document.addEventListener ("DOMContentLoaded", event => {
  console.log('hi')
  const collectionButtons = document.querySelectorAll('.collectionId')

  for (let i = 0; i < collectionButtons.length; i++) {
    const collectionButton = collectionButtons[i]

    collectionButton.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = e.target.id;
      console.log('COLLECTION ID -----------------', id);
      // const collection = await db.Collection.findByPk(id);
      // await collection.destroy();
    });

  }
});


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
