const CampaignsRequestDetails = require('../../facade/dto/CampaignsRequestDetails.js');

const CampaignsControllerMapper = {
    toCampaignsRequest(request) {
        // Map CampaignsRequest to CampaignsRequestDetails
        return new CampaignsRequestDetails(request);
    }
};

module.exports = CampaignsControllerMapper;
