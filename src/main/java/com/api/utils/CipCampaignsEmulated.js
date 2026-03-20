const Campaign = require('../model/Campaign');
const CampaignPriority = require('../model/CampaignPriority');

class CipCampaignsEmulated {
    generateCampaign() {
        const random = Math;
        const id = String(Math.floor(random.random() * 10000));
        const name = 'Campaign_' + Math.floor(random.random() * 10000);
        const status = random.random() > 0.5 ? 'ACTIVE' : 'INACTIVE';
        const priorities = Object.values(CampaignPriority);
        const priority = priorities[Math.floor(random.random() * priorities.length)];
        return new Campaign({ id, name, status, priority });
    }

    generateCampaigns(amount) {
        const campaigns = [];
        for (let i = 0; i < amount; i++) {
            campaigns.push(this.generateCampaign());
        }
        return campaigns;
    }
}

module.exports = CipCampaignsEmulated;
