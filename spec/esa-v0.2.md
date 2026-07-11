# Economic Service Architecture Specification

Version 0.2 — Draft

## 1. Purpose

Economic Service Architecture (ESA) is an open, implementation-neutral specification for declaring software capabilities so that humans, applications, and autonomous agents can determine what a service does, how it can be invoked, which credentials it accepts, what it costs, how it is governed, and how it changes over time.

ESA defines metadata and compatibility rules. It does not define application internals or require traffic to pass through a particular intermediary.

## 2. Non-goals

ESA is not:

- an SDK or application framework
- a transport protocol
- a payment network
- a hosting platform
- a mandatory marketplace or gateway
- a replacement for OpenAPI, MCP, OAuth, JSON Schema, or x402

## 3. Normative language

The terms MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are to be interpreted as requirement levels for conforming implementations.

## 4. Core model

### 4.1 Service

A service is the independently owned product or system publishing the manifest.

### 4.2 Capability

A capability is a stable, named unit of externally useful behavior. Its identifier MUST remain independent of any single endpoint or protocol.

Recommended format:

```text
<namespace>.<domain>.<action>
```

Example:

```text
musicdna.profile.generate
```

### 4.3 Interface

A capability MAY expose one or more interfaces, including HTTP, MCP, GraphQL, event, queue, or future interface types. Interface changes do not necessarily change capability identity.

### 4.4 Contract

Each capability MUST declare machine-readable input and output schemas. It SHOULD declare stable error codes, async-result contracts, emitted events, and idempotency behavior where applicable.

## 5. Principles

1. Capabilities are first-class and more durable than interfaces.
2. Products retain ownership of business logic, data, infrastructure, and policy.
3. Existing systems SHOULD be wrapped rather than rewritten.
4. Discovery MUST remain decentralized.
5. A service MAY be listed in any number of registries and MUST remain callable without a specific registry unless explicitly declared otherwise.
6. Identity, pricing, limits, governance, and lifecycle SHOULD be machine-readable.
7. Composition SHOULD use reusable JSON Schemas with stable `$id` URIs so downstream services can reference shared types directly.
8. Published metadata MUST accurately reflect enforced runtime behavior.

## 6. Manifest

A conforming service SHOULD publish an `esa.yaml` manifest at its repository root or at a documented well-known URL.

The manifest MUST include:

- `spec_version`
- service identity, owner, contract version, status, and binding terms links
- at least one capability
- stable capability identity, version, description, and lifecycle status
- at least one declared interface per capability
- input and output schema references
- authentication requirements, including issuers and scopes where applicable
- payment and settlement methods, when payment is required
- pricing model and its model-specific fields
- rate limits and reliability targets, or an explicit `unspecified` declaration
- data classification and PII flags
- idempotency behavior
- error codes
- async result and webhook behavior where applicable
- deprecation dates and successor references when deprecated
- governance and support contacts

Every governance requirement in this specification is represented in the manifest. A publisher MAY mark a field `unspecified` only where the schema explicitly permits it.

See [`service-manifest.md`](service-manifest.md).

## 7. Authentication and identity

Authentication and payment are separate axes.

A capability MUST advertise each accepted authentication method and SHOULD identify accepted issuers and required scopes before invocation.

Initial authentication method names are:

- `public`
- `session`
- `api_key`
- `oauth2`
- `signed_service`

A payment protocol such as x402 MUST NOT be represented as an authentication method.

## 8. Payments and settlement

A capability MAY declare one or more payment methods independently of authentication.

Examples include:

- `x402`
- `invoice`
- `subscription_entitlement`
- `credits`
- `contract`

Payment declarations SHOULD identify settlement network, currency, pay-to destination, and any processor or verifier metadata needed before invocation.

## 9. Pricing

Pricing MUST declare one model and the required fields for that model.

Initial models are:

- `free`
- `per_request`
- `metered`
- `tiered`
- `subscription`
- `credits`
- `contract`
- `revenue_share`
- `hybrid`

Required fields:

- `free`: no monetary fields
- `per_request`: `amount`, `currency`
- `metered`: `unit`, `rates`, `currency`
- `tiered`: `unit`, ordered `tiers`, `currency`
- `subscription`: `plans`, each with price, billing period, and included usage
- `credits`: credit unit, package or conversion rule
- `contract`: `terms_url` or `contact_url`
- `revenue_share`: `basis`, `percentage`, and settlement period
- `hybrid`: references to two or more component pricing rules

Monetary decimal values MUST be serialized as strings.

## 10. Reliability and limits

Capabilities MUST declare rate-limit and reliability metadata, even when the value is explicitly `unspecified`.

Supported fields include:

- per-key and per-tenant rate limits
- concurrency limits
- availability target
- latency targets such as p50 and p95
- timeout behavior
- retry guidance

Published targets are descriptive unless incorporated into binding terms.

## 11. Data governance

Capabilities MUST declare:

- data classification
- whether request or response payloads may contain PII
- retention policy or `unspecified`
- freshness expectation
- permitted-use or redistribution constraints where relevant

Public discovery does not imply unrestricted access or redistribution rights.

## 12. Idempotency, errors, and async execution

Capabilities MUST declare whether idempotency is supported. Supported capabilities SHOULD identify the key location and retention period.

Stable error codes MUST be enumerated with protocol status, retryability, and optional documentation references.

Async capabilities MUST specify how callers obtain status and results, including polling, callback, webhook, queue, or event mechanisms. Webhooks MUST identify signature-verification metadata and event schemas.

## 13. Lifecycle and compatibility

Service and capability contract versions MUST use semantic versioning.

- Breaking changes require a major version increment.
- Backward-compatible additions require a minor version increment.
- Clarifications or backward-compatible fixes require a patch increment.
- Multiple major versions MAY remain live under the same stable capability ID.
- Deprecation MUST be announced in the manifest.
- A deprecated capability MUST include `deprecated_on`, `sunset_on`, and, where available, a successor capability or version.
- The default minimum deprecation window is 90 days unless binding terms state otherwise.

See [`versioning.md`](versioning.md).

## 14. MCP mapping

MCP is an optional interface, not a service-level boolean.

A capability MAY either:

1. declare an explicit MCP mapping with `tool_name`, `server_url`, `input_schema_ref`, and `output_schema_ref`; or
2. declare `derive_from: http`, in which case the tool name is derived from the capability ID by replacing dots and hyphens with underscores, and the tool schemas are copied from the capability input and output schema references.

See [`mcp-mapping.md`](mcp-mapping.md).

## 15. Trust metadata

Registries MAY attach independently verified signals such as verified owner, observed uptime, observed latency, dispute or refund rate, manifest/runtime conformance, and security review status.

Self-asserted and independently verified signals MUST be distinguishable.

## 16. Adoption pattern

A generic ESA pilot SHOULD:

1. identify one externally useful, low-risk capability
2. place a versioned service boundary around existing business logic
3. publish stable input, output, and error schemas
4. declare auth, payments, pricing, limits, data governance, and lifecycle metadata
5. publish `esa.yaml`
6. validate the manifest against the official JSON Schema
7. test direct invocation without any required registry
8. optionally publish an MCP mapping and register with one or more directories

Brand-specific examples belong in `/examples` and are non-normative.

## 17. Legal boundary

Publishing an ESA manifest is not an offer to contract. Pricing, SLA, licensing, and permitted-use fields are descriptive unless incorporated into binding terms accepted by the relevant parties. Linked terms control in the event of conflict.

## 18. Implementations

Any organization MAY build an ESA validator, registry, documentation generator, marketplace, MCP bridge, policy engine, gateway, or control plane. No implementation receives privileged status under the specification.