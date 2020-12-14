import * as ejs from "ejs";

interface Data {
  imagePath: string;
  title: string;
}

const HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="twitter:image"
      content="<%- imagePath %>"
    />
    <meta
      property="og:image"
      content="<%- imagePath %>"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title><%= title %></title>
  </head>

  <body>
    <div id="root"></div>
    <script src="/script.js" type="text/javascript"></script>
  </body>
</html>`;

const templateHtml = (data: Data) => {
  return ejs.render(HTML, data);
};

export default templateHtml;
