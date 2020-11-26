if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const app = require('./server/app');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Express is listening on port ${port}`);
});
