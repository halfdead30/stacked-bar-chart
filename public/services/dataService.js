class DataService {
  list(selected) {
    return fetch(`./data/?language=${selected}`).then((response) => response.json());
  }

  put(id, checked) {
    return fetch(`./data/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked }),
    }).then((response) => response.text());
  }
}

export default new DataService();
