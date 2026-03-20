const CampaignsRequestDetails = require('../../facade/dto/CampaignsRequestDetails');

const CampaignsControllerMapper = {
    toCampaignsRequest(request) {
        // Map CampaignsRequest to CampaignsRequestDetails
        return new CampaignsRequestDetails(request);
    }
};

module.exports = CampaignsControllerMapper;
