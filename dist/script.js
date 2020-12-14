const root = document.getElementById("root");

root.innerHTML = `<b>Loading...</b>`;

setTimeout(async () => {
  const { pathname } = window.location;

  const [_, type, id] = pathname.split("/");

  switch (type) {
    case "user": {
      const response = await fetch("/api/user/" + id);
      const json = await response.json();
      const { firstName, lastName, email } = json;

      root.innerHTML = `
      <style>* {color: 'darkgreen'}</style>
        <h1>${firstName} ${lastName}</h1>
        <b>${email}</b> <br/>
        <b>Mintbean Member</b><br/>
        <a href="/">Home</a>
      `;
      break;
    }
    case "meet": {
      const response = await fetch("/api/meet/" + id);
      const json = await response.json();
      const { title, type, date } = json;

      root.innerHTML = `
      <style>* {color: 'gold'}</style>
        <h1>${title}</h1>
        <b>${type}</b> <br/>
        <b>${date}</b><br/>
        <a href="/">Home</a>
      `;
      break;
    }
    default: {
      root.innerHTML = `
        <h1>${type ? "Not Found" : "Home"}</h1>
        <b>Try one of these:</b> <br/>
        <h2> Users </h2>
        <a href="/user/1">User 1</a><br/>
        <a href="/user/2">User 2</a><br/>
        <a href="/user/3">User 3</a><br/>
        <h2> Meets </h2>
        <a href="/meet/1">Meet 1</a><br/>
        <a href="/meet/2">Meet 2</a><br/>
        <a href="/meet/3">Meet 3</a><br/>
      `;
    }
  }
}, 500);
