let button = document.querySelector("button");
button.addEventListener("click", () => {
  const postProperty = {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ],
    }),
  };
  fetch("http://localhost:3030/create-checkout-session", postProperty)
    .then((response) => {
      if (response.ok) return response.json();
      return response.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      // console.log(url);
      window.location = url;
    })
    .catch((e) => {
      console.log(e, "error");
    });
});
