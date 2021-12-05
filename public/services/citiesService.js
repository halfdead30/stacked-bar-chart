class CitiesService {
  cities() {
    return fetch("./cities").then((response) => response.json());
  }

  put(checked) {
    return fetch("./cities", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked }),
    }).then((response) => response.text());
  }
}

export default new CitiesService();
