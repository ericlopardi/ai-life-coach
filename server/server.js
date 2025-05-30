const app = require('./app');
const { LOCALHOST } = require('./utility/constants');

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express Server running on port ${LOCALHOST}:${PORT}`);
});