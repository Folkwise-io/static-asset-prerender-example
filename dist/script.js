const root = document.getElementById("root");

root.innerHTML = `<b>Loading...</b>`;

setTimeout(() => {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("id");
  const template = urlParams.get("template");

  switch (template) {
    case "user": {
      const firstName = urlParams.get("firstName");
      const lastName = urlParams.get("lastName");
      const email = urlParams.get("email");

      root.innerHTML = `
        <h1>User profile</h1>
        <b>${firstName} ${lastName}</b>
        <b>${email}</b>
      `;
      break;
    }
    case "meet": {
      const title = urlParams.get("title");
      const type = urlParams.get("type");
      const date = urlParams.get("date");

      root.innerHTML = `
        <h1>${title}</h1>
        <b>${type}</b>
        <b>${date}</b>
      `;
      break;
    }
    default: {
      root.innerHTML = `
        <h1>Not Found</h1>
        <b>Page not found. Try one of these:</b> <br/>
        <a href="/?type=user&id=1">Amy Adams</a> <br/>
        <a href="/?type=user&id=2">Billy Bob</a> <br/>
        <a href="/?type=user&id=3">Chatty Cathy</a>
      `;
    }
  }
}, 1500);
