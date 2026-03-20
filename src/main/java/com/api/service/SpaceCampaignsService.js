const CipCampaignsEmulated = require('../utils/CipCampaignsEmulated');

class SpaceCampaignsService {
    getContactIDByCustomerID(customerId) {
        if (!customerId) {
            throw new Error('Customer ID cannot be null');
        }
        if (customerId === 'customer1') {
            return '11111111-1111-1111-1111-111111111111';
        } else if (customerId === 'customer2') {
            return '22222222-2222-2222-2222-222222222222';
        } else {
            throw new Error(`Customer ID not found: ${customerId}`);
        }
    }

    getCampaignsDataFromCIP(contactID) {
        const emulated = new CipCampaignsEmulated();
        if (contactID === '11111111-1111-1111-1111-111111111111') {
            return emulated.generateCampaigns(10);
        } else if (contactID === '22222222-2222-2222-2222-222222222222') {
            return emulated.generateCampaigns(100);
        } else {
            throw new Error(`Contact ID not found: ${contactID}`);
        }
    }

    updateCampaign(campaign) {
        // TODO: implement saveCampaign logic
        throw new Error("Unimplemented method 'saveCampaign'");
    }
}

module.exports = SpaceCampaignsService;
