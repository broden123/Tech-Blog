const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const post_body = document.querySelector("#post").value.trim();
  const id = document.querySelector("#blogpost").dataset.indexNumber;
  if (title && post_body) {
    // put update for post
    const response = await fetch(`/update/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, post_body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".update-form")
  .addEventListener("submit", updateFormHandler);
