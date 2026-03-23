const SpaceCampaignsService = require('../service/SpaceCampaignsService');

class SpaceCampaignsFacade {
    constructor(service) {
        this.service = service || new SpaceCampaignsService();
    }

    searchContactIDByCustomerID(customerId) {
        console.log(`[FACADE] searchContactIDByCustomerID -> customerId: ${customerId}`);
        return this.service.getContactIDByCustomerID(customerId);
    }

    syncCampaigns(contactID) {
        console.log(`[FACADE] syncCampaigns -> contactID: ${contactID}`);
        const campaigns = this.service.getCampaignsDataFromCIP(contactID);
        console.log(`[FACADE] Retrieved ${campaigns.length} campaigns from CIP`);
        campaigns.forEach(campaign => this.service.updateCampaign(campaign));
        console.log(`[FACADE] All campaigns synced successfully`);
    }
}

module.exports = SpaceCampaignsFacade;
