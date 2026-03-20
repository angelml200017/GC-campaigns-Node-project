const CampaignsService = require('../service/CampaignsService');

class SpaceCampaignsFacade {
    constructor(service) {
        this.service = service || new CampaignsService();
    }

    searchContactIDByCustomerID(customerId) {
        return this.service.getContactIDByCustomerID(customerId);
    }

    syncCampaigns(contactID) {
        const campaigns = this.service.getCampaignsDataFromCIP(contactID);
        campaigns.forEach(campaign => this.service.updateCampaign(campaign));
        // TODO: return status of sync operation?
    }
}

module.exports = SpaceCampaignsFacade;
