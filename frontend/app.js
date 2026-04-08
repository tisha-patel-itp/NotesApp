const API_URL = "http://tisha-internal-alb-774652898.us-east-1.elb.amazonaws.com";

async function fetchNotes() {
  const res = await fetch(`${API_URL}/notes`);
  const data = await res.json();

  const list = document.getElementById("notesList");
  list.innerHTML = "";

  data.forEach(note => {
    const li = document.createElement("li");
    li.innerText = note.text;
    list.appendChild(li);
  });
}

async function addNote() {
  const input = document.getElementById("noteInput");

  await fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value })
  });

  input.value = "";
  fetchNotes();
}

fetchNotes();