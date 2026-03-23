const express = require('express');
const bodyParser = require('body-parser');
const campaignsController = require('./controller/spaceCampaignsController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Route for campaigns controller
app.use('/', campaignsController);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
