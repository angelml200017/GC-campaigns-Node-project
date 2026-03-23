class SpaceCamapignsUseCase {
    constructor(facade) {
        this.facade = facade;
    }

    syncCampaigns(campaignsRequest) {
        if (!campaignsRequest) {
            throw new Error('CampaignsRequestDetails cannot be null');
        }
        console.log(`[USECASE] syncCampaigns called -> customerId: ${campaignsRequest.customerId}, contactID: ${campaignsRequest.contactID}`);
        if (!campaignsRequest.contactID) {
            console.log(`[USECASE] contactID not provided, resolving from customerId: ${campaignsRequest.customerId}`);
            campaignsRequest.contactID = this.facade.searchContactIDByCustomerID(campaignsRequest.customerId);
            console.log(`[USECASE] Resolved contactID: ${campaignsRequest.contactID}`);
        }
        console.log(`[USECASE] Calling facade.syncCampaigns with contactID: ${campaignsRequest.contactID}`);
        this.facade.syncCampaigns(campaignsRequest.contactID);
    }
}

module.exports = SpaceCamapignsUseCase;
