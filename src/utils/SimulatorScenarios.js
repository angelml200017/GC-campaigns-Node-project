const path = require('path');
const fs = require('fs');

const configPath = path.resolve(__dirname, '../../simulator-config.json');
console.log(`[SIMULATOR] Loading config from: ${configPath}`);
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
console.log(`[SIMULATOR] Config loaded successfully`);
console.log(`[SIMULATOR] Default scenario -> status: ${config.default.status}, latency: ${config.default.latencyMs}ms`);

// Build a lookup map: id -> scenario
const scenarioMap = {};
config.scenarios.forEach(scenario => {
    console.log(`[SIMULATOR] Mapping scenario -> status: ${scenario.status}, errorCode: ${scenario.errorCode || 'N/A'}, ids: [${scenario.ids.join(', ')}]`);
    scenario.ids.forEach(id => {
        scenarioMap[id] = {
            status: scenario.status,
            errorCode: scenario.errorCode || null,
            message: scenario.message || null,
            latencyMs: scenario.latencyMs
        };
    });
});

console.log(`[SIMULATOR] Loaded ${config.scenarios.length} scenarios (${Object.keys(scenarioMap).length} IDs mapped)`);

function resolveScenario(id) {
    const matched = scenarioMap[id];
    if (matched) {
        console.log(`[SIMULATOR] resolveScenario -> id: ${id} matched a configured scenario`);
    } else {
        console.log(`[SIMULATOR] resolveScenario -> id: ${id} not found, using default scenario`);
    }
    return matched || config.default;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { resolveScenario, delay };
