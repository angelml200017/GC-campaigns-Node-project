const { resolveScenario, delay } = require('../utils/SimulatorScenarios');

class SpaceCamapignsUseCase {
    async syncCampaigns(campaignsRequest) {
        console.log(`[USECASE] syncCampaigns called with: ${JSON.stringify(campaignsRequest)}`);

        if (!campaignsRequest) {
            console.error('[USECASE] campaignsRequest is null or undefined');
            throw new Error('CampaignsRequestDetails cannot be null');
        }

        const id = campaignsRequest.contactID || campaignsRequest.customerId;
        console.log(`[USECASE] syncCampaigns -> resolved id: ${id}`);

        if (!id) {
            console.warn('[USECASE] No contactID nor customerId found in request');
        }

        const scenario = resolveScenario(id);
        console.log(`[USECASE] Scenario resolved -> status: ${scenario.status}, errorCode: ${scenario.errorCode || 'N/A'}, latency: ${scenario.latencyMs}ms`);

        console.log(`[USECASE] Waiting ${scenario.latencyMs}ms (simulated latency)...`);
        await delay(scenario.latencyMs);
        console.log(`[USECASE] Latency wait complete for id: ${id}`);

        return scenario;
    }
}

module.exports = SpaceCamapignsUseCase;
