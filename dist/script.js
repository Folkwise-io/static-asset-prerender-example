const root = document.getElementById("root");

root.innerHTML = `<b>Loading...</b>`;

setTimeout(async () => {
  const urlParams = new URLSearchParams(window.location.search);

  const id = urlParams.get("id");
  const type = urlParams.get("type");

  switch (type) {
    case "user": {
      const response = await fetch("/api/user/" + id);
      const json = await response.json();
      const { firstName, lastName, email } = json;

      root.innerHTML = `
        <h1>${firstName} ${lastName}</h1>
        <b>${email}</b> <br/>
        <b>Mintbean Member</b>
      `;
      break;
    }
    case "meet": {
      const response = await fetch("/api/user/" + id);
      const json = await response.json();
      const { title, type, date } = json;

      root.innerHTML = `
        <h1>${title}</h1>
        <b>${type}</b> <br/>
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
