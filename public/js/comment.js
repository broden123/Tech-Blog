const addCommentFormHandler = async (event) => {
  event.preventDefault();

  const comment_body = document.querySelector("#comment-body").value.trim();
  const post_id = document.querySelector("#post-id").value.trim();

  if (comment_body) {
    const response = await fetch(`/api/comment/${post_id}`, {
      method: "POST",
      body: JSON.stringify({ comment_body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".add-comment-form")
  .addEventListener("submit", addCommentFormHandler);
