import * as ejs from "ejs";
import { DeepPartial } from "tsdef";

interface Data {
  imagePaths: {
    twitter: string;
  };
  title: string;
}

interface Options {
  basePath: string;
  defaultImagePath: string;
}

interface Params {
  data: Data;
  options: Options;
}

const HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
      name="twitter:image"
      content="<%= options.basePath %><%= data.imagePaths.twitter %>"
    />
    <meta
      property="og:image"
      content="<%= options.basePath %><%= options.defaultImagePath %>"
    />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title><%= data.title %></title>
  </head>

  <body>
    <div id="root"></div>
    <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
  </body>
</html>`;

const templateHtml = (
  dataParams: DeepPartial<Data>,
  optionsParams: DeepPartial<Options>
) => {
  const options: Options = Object.assign(
    {
      basePath: "https://i.picsum.photos",
      defaultImagePath:
        "/id/447/400/300.jpg?hmac=p7k9AlR5nxUakDtYqj76nKr2QntGCaV4FIHnXeFbZKA",
    },
    optionsParams
  );

  const data: Data = Object.assign(
    {
      imagePaths: {
        twitter: options.defaultImagePath,
      },
      title: "mintbean.io",
    },
    dataParams
  );

  const params: Params = {
    data,
    options,
  };

  return ejs.render(HTML, params);
};

export default templateHtml;
