// src/spaceCampaignsController.js
// Node.js Express version of SpaceCampaignsController
const express = require('express');
const router = express.Router();

const CampaignsUsecase = require('../usecase/CampaignsUsecase');
const CampaignsControllerMapper = require('./mapper/CampaignsControllerMapper');

// POST endpoint for syncing campaigns
router.post('/syncCampaigns', (req, res) => {
    const request = req.body;
    const mappedRequest = CampaignsControllerMapper.toCampaignsRequest(request);
    CampaignsUsecase.syncCampaigns(mappedRequest);
    res.status(200).send({ message: 'Campaigns synced successfully' });
});

module.exports = router;
