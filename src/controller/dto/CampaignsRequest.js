class CampaignsRequest {
    constructor({ customerId, contactId }) {
        if (!customerId) throw new Error('customerId is required');
        this.customerId = customerId;
        this.contactId = contactId; // Should be a UUID string or null
    }
}

module.exports = CampaignsRequest;
