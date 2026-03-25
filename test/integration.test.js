const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

const BASE_URL = 'http://localhost:3001';

function request(method, urlPath) {
    return new Promise((resolve, reject) => {
        const start = Date.now();
        const url = new URL(urlPath, BASE_URL);
        const req = http.request(url, { method }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                const elapsed = Date.now() - start;
                let parsed = null;
                try { parsed = JSON.parse(body); } catch (_) {}
                resolve({ status: res.statusCode, body: parsed, elapsed });
            });
        });
        req.on('error', reject);
        req.end();
    });
}

before(async () => {
    process.env.PORT = '3001';
    require('../src/index.js');
    await new Promise(resolve => setTimeout(resolve, 500));
});

after(() => {
    process.exit(0);
});

// --- Customer endpoint tests (skip high-latency scenarios: 1200000030, 128813711, 1033706126) ---

describe('POST /v1/customers/:customerId/offers/sync', () => {

    it('1200000001 → 204 Success (~200ms)', async () => {
        const res = await request('POST', '/v1/customers/1200000001/offers/sync');
        assert.strictEqual(res.status, 204);
        assert.strictEqual(res.body, null);
        assert.ok(res.elapsed >= 150, `Expected >= 150ms, got ${res.elapsed}ms`);
        assert.ok(res.elapsed < 1000, `Expected < 1000ms, got ${res.elapsed}ms`);
    });

    it('1033489160 → 401 UNAUTHORIZED', async () => {
        const res = await request('POST', '/v1/customers/1033489160/offers/sync');
        assert.strictEqual(res.status, 401);
        assert.strictEqual(res.body.errorCode, 'UNAUTHORIZED');
        assert.strictEqual(res.body.message, 'Unauthorized');
    });

    it('1030309082 → 403 FORBIDDEN', async () => {
        const res = await request('POST', '/v1/customers/1030309082/offers/sync');
        assert.strictEqual(res.status, 403);
        assert.strictEqual(res.body.errorCode, 'FORBIDDEN');
        assert.strictEqual(res.body.message, 'You do not have permission to perform this action');
    });

    it('1030305772 → 404 CUSTOMER_NOT_FOUND', async () => {
        const res = await request('POST', '/v1/customers/1030305772/offers/sync');
        assert.strictEqual(res.status, 404);
        assert.strictEqual(res.body.errorCode, 'CUSTOMER_NOT_FOUND');
        assert.strictEqual(res.body.message, 'The customer could not be found');
    });

    it('1030309270 → 412 SYNC_PRECONDITION_FAILED', async () => {
        const res = await request('POST', '/v1/customers/1030309270/offers/sync');
        assert.strictEqual(res.status, 412);
        assert.strictEqual(res.body.errorCode, 'SYNC_PRECONDITION_FAILED');
        assert.strictEqual(res.body.message, 'Sync could not be completed due to unmet preconditions');
    });

    it('1035539089 → 500 GENERIC_ERROR (~1s)', async () => {
        const res = await request('POST', '/v1/customers/1035539089/offers/sync');
        assert.strictEqual(res.status, 500);
        assert.strictEqual(res.body.errorCode, 'GENERIC_ERROR');
        assert.strictEqual(res.body.message, 'An error occurred, please try again later');
        assert.ok(res.elapsed >= 800, `Expected >= 800ms, got ${res.elapsed}ms`);
    });

    it('unknown customerId → 204 (default)', async () => {
        const res = await request('POST', '/v1/customers/9999999999/offers/sync');
        assert.strictEqual(res.status, 204);
    });
});

// --- Contact endpoint tests (skip high-latency UUIDs) ---

describe('POST /v1/contacts/:contactId/offers/sync', () => {

    it('48f126e3... → 204 Success (~200ms)', async () => {
        const res = await request('POST', '/v1/contacts/48f126e3-a467-f011-bec3-7c1e5251ec70/offers/sync');
        assert.strictEqual(res.status, 204);
        assert.ok(res.elapsed >= 150, `Expected >= 150ms, got ${res.elapsed}ms`);
    });

    it('97154e1b... → 401 UNAUTHORIZED', async () => {
        const res = await request('POST', '/v1/contacts/97154e1b-b4ca-ec11-a7b5-000d3a20bf8b/offers/sync');
        assert.strictEqual(res.status, 401);
        assert.strictEqual(res.body.errorCode, 'UNAUTHORIZED');
    });

    it('84dd3366... → 403 FORBIDDEN', async () => {
        const res = await request('POST', '/v1/contacts/84dd3366-bdca-ec11-a7b5-000d3a20bf8b/offers/sync');
        assert.strictEqual(res.status, 403);
        assert.strictEqual(res.body.errorCode, 'FORBIDDEN');
    });

    it('c7763b32... → 404 CUSTOMER_NOT_FOUND', async () => {
        const res = await request('POST', '/v1/contacts/c7763b32-ffc7-ec11-a7b5-000d3a20bf8b/offers/sync');
        assert.strictEqual(res.status, 404);
        assert.strictEqual(res.body.errorCode, 'CUSTOMER_NOT_FOUND');
    });

    it('0ff6da20... → 412 SYNC_PRECONDITION_FAILED', async () => {
        const res = await request('POST', '/v1/contacts/0ff6da20-c1ca-ec11-a7b5-000d3a20bf8b/offers/sync');
        assert.strictEqual(res.status, 412);
        assert.strictEqual(res.body.errorCode, 'SYNC_PRECONDITION_FAILED');
    });

    it('53a12e38... → 500 GENERIC_ERROR', async () => {
        const res = await request('POST', '/v1/contacts/53a12e38-4a2f-f011-8c4d-000d3a4722bb/offers/sync');
        assert.strictEqual(res.status, 500);
        assert.strictEqual(res.body.errorCode, 'GENERIC_ERROR');
    });

    it('unknown UUID → 204 (default)', async () => {
        const res = await request('POST', '/v1/contacts/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee/offers/sync');
        assert.strictEqual(res.status, 204);
    });
});
    