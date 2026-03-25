// src/spaceCampaignsController.js
// Node.js Express version of SpaceCampaignsController
const express = require('express');
const router = express.Router();

const SpaceCampaignsUseCase = require('../usecase/SpaceCamapignsUseCase');
const useCase = new SpaceCampaignsUseCase();

function sendScenarioResponse(res, scenario) {
    console.log(`[CONTROLLER] sendScenarioResponse -> status: ${scenario.status}, errorCode: ${scenario.errorCode || 'N/A'}, message: ${scenario.message || 'N/A'}`);
    if (scenario.status !== 204) {
        console.log(`[CONTROLLER] Sending error response: ${JSON.stringify({ errorCode: scenario.errorCode, message: scenario.message })}`);
        return res.status(scenario.status).send({
            errorCode: scenario.errorCode,
            message: scenario.message
        });
    }
    console.log('[CONTROLLER] Sending 204 No Content');
    res.status(204).send();
}

// POST /v1/contacts/:contactId/offers/sync – Customer view (CSW / SPACE)
router.post('/v1/contacts/:contactId/offers/sync', async (req, res) => {
    const id = req.params.contactId;
    console.log(`[CONTROLLER] POST /v1/contacts/${id}/offers/sync - Start`);
    console.log(`[CONTROLLER] Request params: ${JSON.stringify(req.params)}`);
    console.log(`[CONTROLLER] Request body: ${JSON.stringify(req.body)}`);
    try {
        const scenario = await useCase.syncCampaigns({ contactID: id });
        console.log(`[CONTROLLER] syncCampaigns resolved for contactId: ${id}`);
        sendScenarioResponse(res, scenario);
    } catch (error) {
        console.error(`[CONTROLLER] Error in /v1/contacts/${id}/offers/sync:`, error.message);
        console.error('[CONTROLLER] Stack trace:', error.stack);
        res.status(500).send({ errorCode: 'GENERIC_ERROR', message: error.message });
    }
});

// POST /v1/customers/:customerId/offers/sync – External consumer
router.post('/v1/customers/:customerId/offers/sync', async (req, res) => {
    const id = req.params.customerId;
    console.log(`[CONTROLLER] POST /v1/customers/${id}/offers/sync - Start`);
    console.log(`[CONTROLLER] Request params: ${JSON.stringify(req.params)}`);
    console.log(`[CONTROLLER] Request body: ${JSON.stringify(req.body)}`);
    try {
        const scenario = await useCase.syncCampaigns({ customerId: id });
        console.log(`[CONTROLLER] syncCampaigns resolved for customerId: ${id}`);
        sendScenarioResponse(res, scenario);
    } catch (error) {
        console.error(`[CONTROLLER] Error in /v1/customers/${id}/offers/sync:`, error.message);
        console.error('[CONTROLLER] Stack trace:', error.stack);
        res.status(500).send({ errorCode: 'GENERIC_ERROR', message: error.message });
    }
});

module.exports = router;
