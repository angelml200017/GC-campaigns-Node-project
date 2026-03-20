const CampaignPriority = require('./CampaignPriority');

class Campaign {
    constructor({ id, name, status, priority }) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.priority = priority; // Should be one of CampaignPriority
    }
}

module.exports = Campaign;
