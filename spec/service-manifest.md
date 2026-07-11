# ESA Service Manifest

Version 0.2 — Draft

The default filename is `esa.yaml`.

## Top-level fields

### `spec_version`

Required. Version of the ESA manifest specification.

### `service`

Required. Identifies the publisher and service.

Required fields:

- `id`: globally unique, stable service identifier
- `name`
- `description`
- `version`: semantic version of the service contract
- `owner`
- `status`: `experimental`, `beta`, `stable`, `deprecated`, or `sunset`
- `terms_url`
- `support_url`

Recommended fields:

- `base_url`
- `privacy_url`
- `security_url`

### `schemas`

Optional map of reusable JSON Schema references. Shared schemas SHOULD publish stable `$id` URIs.

### `capabilities`

Required non-empty list.

Each capability contains:

- `id`: stable capability identity independent of transport
- `version`
- `name`
- `description`
- `status`
- `interfaces`
- `input_schema`
- `output_schema`
- `errors`
- `auth`
- `payments`
- `pricing`
- `rate_limits`
- `sla`
- `data`
- `idempotency`
- `async`
- `events`
- `deprecation`

## Complete capability example

```yaml
- id: example.report.generate
  version: "1.0.0"
  name: Generate Report
  description: Generate a structured report.
  status: stable

  interfaces:
    http:
      method: POST
      path: /reports
      content_type: application/json
    mcp:
      derive_from: http
      tool_name: example_report_generate
      input_schema_ref: https://schemas.example.com/report-request.json
      output_schema_ref: https://schemas.example.com/report-response.json

  input_schema: https://schemas.example.com/report-request.json
  output_schema: https://schemas.example.com/report-response.json

  auth:
    methods:
      - type: api_key
        issuers: [https://keys.example.com]
        scopes: [report:generate]

  payments:
    methods:
      - type: x402
        network: base
        currency: USDC
        pay_to: "0x..."

  pricing:
    model: per_request
    amount: "0.05"
    currency: USDC

  rate_limits:
    per_key: { requests: 60, period: minute }
    per_tenant: { requests: 10000, period: day }
    max_concurrency: 5

  sla:
    availability_target: "99.9%"
    latency_ms: { p50: 400, p95: 1500 }
    timeout_ms: 10000

  data:
    classification: confidential
    pii: { request: true, response: false }
    retention: none
    freshness: realtime
    permitted_uses: [user-authorized-analysis]

  idempotency:
    supported: true
    header: Idempotency-Key
    retention_hours: 24

  async:
    supported: false

  errors:
    - code: INVALID_INPUT
      protocol_status: 400
      retryable: false
    - code: RATE_LIMITED
      protocol_status: 429
      retryable: true

  events: []

  deprecation:
    deprecated_on: null
    sunset_on: null
    successor_capability_id: null
```

## Interfaces

Interfaces are keyed by protocol. MCP is never represented as a boolean.

```yaml
interfaces:
  http:
    method: POST
    path: /profiles
    content_type: application/json
  mcp:
    derive_from: http
    tool_name: musicdna_profile_generate
    input_schema_ref: https://schemas.example.com/profile-request.json
    output_schema_ref: https://schemas.example.com/profile-response.json
```

When `derive_from: http` is used, the tool name defaults to the capability ID with dots and hyphens replaced by underscores.

## Authentication

Authentication proves identity or entitlement.

```yaml
auth:
  methods:
    - type: api_key
      issuers: [https://keys.example.com]
      scopes: [profile:generate]
    - type: oauth2
      issuers: [https://auth.partner.com]
      scopes: [profile.write]
```

Initial auth types: `public`, `session`, `api_key`, `oauth2`, and `signed_service`.

## Payments

Payment and settlement are separate from authentication.

```yaml
payments:
  methods:
    - type: x402
      network: base
      currency: USDC
      pay_to: "0x..."
```

Initial payment types: `x402`, `invoice`, `subscription_entitlement`, `credits`, and `contract`.

## Pricing models

### Free

```yaml
pricing:
  model: free
```

### Per request

```yaml
pricing:
  model: per_request
  amount: "0.05"
  currency: USD
```

### Metered

```yaml
pricing:
  model: metered
  unit: records
  currency: USD
  rates:
    - from: 0
      amount: "0.002"
```

### Tiered

```yaml
pricing:
  model: tiered
  unit: requests
  currency: USD
  tiers:
    - up_to: 1000
      amount: "0.01"
    - from: 1001
      amount: "0.005"
```

### Subscription

```yaml
pricing:
  model: subscription
  plans:
    - id: pro
      amount: "49.00"
      currency: USD
      billing_period: month
      included_usage: 10000
      overage_amount: "0.002"
      overage_unit: request
```

### Revenue share

```yaml
pricing:
  model: revenue_share
  basis: gross_revenue
  percentage: "15.0"
  settlement_period: month
```

### Credits

```yaml
pricing:
  model: credits
  credit_unit: request
  credits_per_unit: "1"
```

### Contract

```yaml
pricing:
  model: contract
  terms_url: https://example.com/enterprise
```

### Hybrid

```yaml
pricing:
  model: hybrid
  components:
    - model: subscription
      plan_id: pro
    - model: metered
      unit: records
      amount: "0.001"
      currency: USD
```

Monetary decimal values MUST be strings.

## Rate limits

```yaml
rate_limits:
  per_key: { requests: 60, period: minute }
  per_tenant: { requests: 10000, period: day }
  max_concurrency: 5
```

## SLA

```yaml
sla:
  availability_target: "99.9%"
  latency_ms: { p50: 400, p95: 1500 }
  timeout_ms: 10000
```

These values are descriptive unless incorporated into binding terms.

## Data governance

```yaml
data:
  classification: confidential
  pii: { request: true, response: false }
  retention: none
  freshness: realtime
  permitted_uses: [user-authorized-analysis]
  redistribution: prohibited
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
  mode: webhook
  status_url_template: /jobs/{job_id}
  result_schema: https://schemas.example.com/job-result.json
  webhook:
    event: report.completed
    signature_header: X-ESA-Signature
    signature_scheme: hmac-sha256
    schema_ref: https://schemas.example.com/report-completed.json
```

## Errors

```yaml
errors:
  - code: INVALID_INPUT
    protocol_status: 400
    retryable: false
  - code: RATE_LIMITED
    protocol_status: 429
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

The default minimum deprecation window is 90 days.

## Discovery

A service MAY link to OpenAPI, MCP server metadata, documentation, schema catalogs, and any number of registries. No registry is mandatory.

## Legal boundary

The manifest is descriptive metadata, not an offer, quote, warranty, SLA, license, or contract. Linked binding terms control in the event of conflict.