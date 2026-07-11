# ESA Service Manifest

Version 0.2 — Draft

The default filename is `esa.yaml`.

## Top-level fields

### `spec_version`

Required. Version of the ESA manifest specification.

### `service`

Required. Identifies the publisher and service.

Recommended fields:

- `id`: globally unique, stable service identifier
- `name`
- `description`
- `version`: semantic version of the service contract
- `owner`
- `base_url`
- `status`: `experimental`, `beta`, `stable`, `deprecated`, or `sunset`
- `terms_url`
- `privacy_url`
- `support_url`

### `schemas`

Optional map of reusable JSON Schema references. Shared schemas SHOULD publish stable `$id` values.

### `capabilities`

Required non-empty list.

Each capability SHOULD contain:

- `id`: stable capability identity, independent of transport
- `version`
- `name`
- `description`
- `status`
- `interfaces`
- `input_schema`
- `output_schema`
- `errors`
- `auth`
- `pricing`
- `rate_limits`
- `sla`
- `data`
- `idempotency`
- `async`
- `events`
- `deprecation`

## Interfaces

Interfaces are keyed by transport or protocol. Example:

```yaml
interfaces:
  http:
    method: POST
    path: /profiles
    content_type: application/json
  mcp:
    tool_name: musicdna_generate_profile
    server_url: https://example.com/mcp
    input_schema_from: input_schema
```

MCP is one optional interface; it is not a boolean service-level feature.

## Authentication

```yaml
auth:
  methods:
    - type: api_key
      issuers:
        - https://keys.example.com
      scopes:
        - profile:generate
    - type: oauth2
      issuers:
        - https://auth.partner.com
      scopes:
        - profile.write
    - type: x402
      networks:
        - base
```

A caller SHOULD be able to determine whether its credential is acceptable before invoking the capability.

## Pricing

```yaml
pricing:
  model: metered
  unit: records
  currency: USD
  free_tier:
    quantity: 100
    period: month
  rates:
    - from: 101
      amount: "0.002"
```

Additional models include `free`, `per_request`, `tiered`, `subscription`, `credits`, `contract`, `revenue_share`, and `hybrid`.

For x402 settlement:

```yaml
pricing:
  model: per_request
  amount: "0.05"
  currency: USDC
  settlement:
    protocol: x402
    network: base
    pay_to: "0x..."
```

## Rate limits

```yaml
rate_limits:
  per_key:
    requests: 60
    period: minute
  per_tenant:
    requests: 10000
    period: day
  max_concurrency: 5
```

## SLA

```yaml
sla:
  availability_target: "99.9%"
  latency_ms:
    p50: 400
    p95: 1500
  timeout_ms: 10000
```

These values are descriptive unless incorporated into binding terms.

## Data governance

```yaml
data:
  classification: confidential
  pii:
    request: true
    response: false
  retention: none
  freshness: realtime
  permitted_uses:
    - user-authorized-analysis
```

## Idempotency

```yaml
idempotency:
  supported: true
  header: Idempotency-Key
  retention_hours: 24
```

## Async results and webhooks

```yaml
async:
  supported: true
  mode: polling
  status_url_template: /jobs/{job_id}
  result_schema: https://schemas.example.com/job-result.json
```

Webhook-based execution SHOULD identify signature verification and event schemas.

## Errors

Error codes SHOULD be stable and enumerated:

```yaml
errors:
  - code: INVALID_INPUT
    http_status: 400
    retryable: false
  - code: RATE_LIMITED
    http_status: 429
    retryable: true
```

## Deprecation

```yaml
deprecation:
  deprecated_on: 2027-01-01
  sunset_on: 2027-06-30
  successor_capability_id: musicdna.profile.generate
  successor_version: "2.0.0"
```

## Discovery

A service MAY link to OpenAPI, MCP server metadata, documentation, schema catalogs, and any number of registries. No registry is mandatory.

## Legal boundary

The manifest is descriptive metadata, not an offer, quote, warranty, or contract. Linked binding terms control in the event of conflict.
