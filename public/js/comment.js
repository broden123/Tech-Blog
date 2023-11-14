const commentFormHandler = async (event) => {
    event.preventDefault();

    // get comment value
    const post = document.querySelector('#comment').value.trim();
    const post_id = document.querySelector("#blogcomment").dataset.indexNumber
   
    if (post) {
      // post comment
      const response = await fetch(`/comment`, {
        method: 'POST',
        body: JSON.stringify({ post, post_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace(`/comment/${post_id}`);
      } else {
        alert(response.statusText);
      }
    }

  };

  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);