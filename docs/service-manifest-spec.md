# ESA Service Manifest Specification

Version 0.1

An ESA-compliant project should publish a machine-readable manifest, conventionally named `echelon.yaml`, at the project root or another documented location.

The manifest describes the service. It does not move the service into Echelon and does not require Echelon to proxy requests.

## Goals

The manifest should let a human, application, registry, or AI agent determine:

- What the service is
- Who owns it
- Where it runs
- Which capabilities it exposes
- How those capabilities are called
- How access is controlled
- What each capability costs
- Where formal schemas and documentation live

## Recommended structure

```yaml
spec_version: "0.1"

service:
  id: unique-service-id
  name: Human-readable name
  description: Short description
  version: "1.0.0"
  owner: Organization or product owner
  base_url: https://example.com/api/v1
  status: experimental

capabilities:
  - id: capability-id
    name: Human-readable capability name
    description: What the capability returns or performs
    method: POST
    path: /resource

    access:
      methods:
        - session
        - api_key
        - x402

    pricing:
      model: per_request
      amount: "0.05"
      currency: USDC
      network: base

    request:
      content_type: application/json
      schema_ref: "#/components/schemas/Request"

    response:
      content_type: application/json
      schema_ref: "#/components/schemas/Response"

    limits:
      requests_per_minute: 60

    data:
      classification: public
      freshness: daily

discovery:
  openapi_url: https://example.com/openapi.json
  docs_url: https://example.com/docs
  mcp:
    enabled: false
  echelon_registry:
    enabled: true

governance:
  contact: product-owner@example.com
  terms_url: https://example.com/terms
  privacy_url: https://example.com/privacy
  deprecation_policy: 90-day notice
```

## Required top-level fields

### `spec_version`

Version of this manifest specification.

### `service`

Service identity and base execution details.

Recommended fields:

- `id`
- `name`
- `description`
- `version`
- `owner`
- `base_url`
- `status`

### `capabilities`

List of exposed capabilities.

Each capability should include:

- Stable `id`
- Human-readable `name`
- `description`
- HTTP `method`
- Relative `path`
- Access policy
- Pricing policy
- Request and response format

## Access methods

Common values include:

- `public`
- `session`
- `api_key`
- `oauth`
- `service_token`
- `subscription`
- `x402`

A capability may support more than one method.

## Pricing models

Common values include:

- `free`
- `per_request`
- `metered`
- `subscription`
- `credits`
- `contract`
- `hybrid`

For x402, define the settlement currency and network explicitly.

```yaml
pricing:
  model: per_request
  amount: "0.05"
  currency: USDC
  network: base
  protocol: x402
```

Amounts should be strings to avoid floating-point ambiguity.

## Discovery

The manifest should link to richer machine-readable contracts where available.

Recommended discovery mechanisms:

- OpenAPI for HTTP contracts
- MCP for tool-oriented agent access
- Direct documentation
- Echelon registry indexing

A service can support any subset.

## Governance

Every service should identify:

- Responsible owner
- Terms of use
- Privacy policy where relevant
- Data classification
- Version and deprecation policy
- Rate limits

## Versioning

Use semantic versioning for the service contract where practical.

Breaking changes should use a new major version and generally a new URL namespace, such as `/api/v2`.

## Validation rule

A service should not claim ESA compliance merely because it has a YAML file. The manifest must accurately describe the live service, and the service must enforce the stated access, pricing, and governance rules.
