// src/spaceCampaignsController.js
// Node.js Express version of SpaceCampaignsController
const express = require('express');
const router = express.Router();

const SpaceCampaignsUseCase = require('../usecase/SpaceCamapignsUseCase');
const SpaceCampaignsFacade = require('../facade/SpaceCampaignsFacade');
const CampaignsControllerMapper = require('./mapper/CampaignsControllerMapper');

const facade = new SpaceCampaignsFacade();
const useCase = new SpaceCampaignsUseCase(facade);

// POST /v1/contacts/:contactId/offers/sync – Customer view (CSW / SPACE)
router.post('/v1/contacts/:contactId/offers/sync', (req, res) => {
    console.log(`[CONTROLLER] POST /v1/contacts/${req.params.contactId}/offers/sync`);
    try {
        const mappedRequest = CampaignsControllerMapper.toCampaignsRequest({
            contactId: req.params.contactId
        });
        console.log('[CONTROLLER] Mapped request:', JSON.stringify(mappedRequest));
        useCase.syncCampaigns(mappedRequest);
        res.status(200).send({ message: 'Campaigns synced successfully' });
    } catch (error) {
        console.error('[CONTROLLER] Error:', error.message);
        res.status(500).send({ error: error.message });
    }
});

// POST /v1/customers/:customerId/offers/sync – External consumer
router.post('/v1/customers/:customerId/offers/sync', (req, res) => {
    console.log(`[CONTROLLER] POST /v1/customers/${req.params.customerId}/offers/sync`);
    try {
        const mappedRequest = CampaignsControllerMapper.toCampaignsRequest({
            customerId: req.params.customerId
        });
        console.log('[CONTROLLER] Mapped request:', JSON.stringify(mappedRequest));
        useCase.syncCampaigns(mappedRequest);
        res.status(200).send({ message: 'Campaigns synced successfully' });
    } catch (error) {
        console.error('[CONTROLLER] Error:', error.message);
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
