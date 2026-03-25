# GC Campaigns Sync — Simulator

Node.js microservice that simulates campaign synchronization (offers/sync) with configurable HTTP responses and latency.

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/v1/contacts/:contactId/offers/sync` | Sync by contactId (customer view — CSW / SPACE) |
| POST | `/v1/customers/:customerId/offers/sync` | Sync by customerId (external consumer) |

## Architecture

```
src/
├── index.js                        # Entry point (Express server, port 3000)
├── controller/
│   └── spaceCampaignsController.js  # Routes + HTTP response mapping
├── usecase/
│   └── SpaceCamapignsUseCase.js     # Scenario resolution + latency simulation
└── utils/
    └── SimulatorScenarios.js        # Scenario loading from config
```

## Scenario Simulator

API behavior is controlled via `simulator-config.json` at the project root. Each scenario defines:

- **ids** — List of IDs (customerId and/or contactId UUID) that trigger the scenario
- **status** — HTTP response status code
- **errorCode / message** — Error response body (only for status != 204)
- **latencyMs** — Simulated delay in milliseconds

Unconfigured IDs fall back to the `default` scenario (204, 200ms).

### Included Scenarios

| # | customerId | contactId (UUID) | Status | Latency | Description |
|---|------------|-------------------|--------|---------|-------------|
| 1 | `1200000030` | `cc64e864-fac7-ec11-a7b5-000d3a20bf8b` | 204 | 20min | Latency > 60s |
| 2 | `128813711` | `b24d7bfd-dbf9-ef11-bae2-0022488480ad` | 204 | 30s | Latency 30s |
| 3 | `1200000001` | `48f126e3-a467-f011-bec3-7c1e5251ec70` | 204 | 200ms | Success |
| 4 | `1030305772` | `c7763b32-ffc7-ec11-a7b5-000d3a20bf8b` | 404 | 200ms | Customer not found |
| 5 | `1033489160` | `97154e1b-b4ca-ec11-a7b5-000d3a20bf8b` | 401 | 100ms | Unauthorized |
| 6 | `1030309082` | `84dd3366-bdca-ec11-a7b5-000d3a20bf8b` | 403 | 100ms | Forbidden |
| 7 | `1030309270` | `0ff6da20-c1ca-ec11-a7b5-000d3a20bf8b` | 412 | 500ms | Sync precondition failed |
| 8 | `1033706126` | `faaee194-ccca-ec11-a7b5-000d3a20bf8b` | 500 | 30s | Third party unavailable |
| 9 | `1035539089` | `53a12e38-4a2f-f011-8c4d-000d3a4722bb` | 500 | 1s | Generic error |

To add or modify scenarios, edit `simulator-config.json` and restart the service.

## Commands

```bash
make debug    # Install dependencies + start at http://localhost:3000
make stop     # Kill process on port 3000
make test     # Run integration tests (port 3001)
make push     # Push to origin (current branch)
make clean    # Remove node_modules
```

## Usage Examples

```bash
# Success (204, ~200ms)
curl -v -X POST http://localhost:3000/v1/customers/1200000001/offers/sync

# 30s latency (204)
curl -v -X POST http://localhost:3000/v1/customers/128813711/offers/sync

# 404 Customer not found
curl -s -X POST http://localhost:3000/v1/customers/1030305772/offers/sync

# Same scenario via contactId UUID
curl -s -X POST http://localhost:3000/v1/contacts/97154e1b-b4ca-ec11-a7b5-000d3a20bf8b/offers/sync

# Unknown ID → default (204, 200ms)
curl -v -X POST http://localhost:3000/v1/customers/any-id/offers/sync
```

## Tests

Integration tests using the Node.js native test runner (no extra dependencies):

```bash
npm test
```

Validates HTTP status codes, error codes, messages, and latencies for all scenarios on both endpoints.

## Deploy (Render)

- **Build command:** `npm install`
- **Start command:** `node ./src/index.js`

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 4
- **Tests:** Node.js native test runner (`node:test`)
