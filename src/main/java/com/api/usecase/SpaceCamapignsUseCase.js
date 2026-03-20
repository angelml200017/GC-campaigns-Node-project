class SpaceCamapignsUseCase {
    constructor(facade) {
        this.facade = facade;
    }

    syncCampaigns(campaignsRequest) {
        if (!campaignsRequest) {
            throw new Error('CampaignsRequestDetails cannot be null');
        }
        if (!campaignsRequest.contactID) {
            campaignsRequest.contactID = this.facade.searchContactIDByCustomerID(campaignsRequest.customerId);
        } else {
            this.facade.syncCampaigns(campaignsRequest.contactID);
        }
    }
}

module.exports = SpaceCamapignsUseCase;
