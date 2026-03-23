class CampaignsRequestDetails {
    constructor({ customerId, contactId }) {
        this.customerId = customerId;
        this.contactID = contactId || null; // UUID string or null
    }
}

module.exports = CampaignsRequestDetails;
