const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const post_id = document.querySelector("#post").value.trim();
  const id = document.querySelector("#blogpost").dataset.indexNumber;
  if (title && post_id) {
    // put update for post
    const response = await fetch(`/update/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, post_id }),
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
