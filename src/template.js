export default ({ body, title, initialState }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <title>${title}</title>
        <link rel="stylesheet" href="/assets/index.css" />
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      
      <script src="/assets/bundle.js"></script>
    </html>
  `;
};
