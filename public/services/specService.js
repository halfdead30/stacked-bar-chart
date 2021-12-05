class SpecService {
  specialization() {
    return fetch("./spec").then((response) => response.json());
  }

  checkAll(checked) {
    return fetch(`./spec`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked }),
    }).then((response) => response.text());
  }

  put(spec) {
    return fetch(`./spec`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ spec }),
    }).then((response) => response.text());
  }
}

export default new SpecService();
