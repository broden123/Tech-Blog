const newPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const post_body = document.querySelector("#post").value.trim();

  if (post_body) {
    const response = await fetch(`/newpost`, {
      method: "POST",
      body: JSON.stringify({ title, post_body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#blogpost")
  .addEventListener("submit", newPostFormHandler);
