# Economic Service Architecture Specification

Version 0.2 — Draft

## 1. Purpose

Economic Service Architecture (ESA) is an open, implementation-neutral specification for declaring software capabilities so that humans, applications, and autonomous agents can determine what a service does, how it can be invoked, which credentials it accepts, what it costs, how it is governed, and how it changes over time.

ESA defines metadata and compatibility rules. It does not define application internals or require traffic to pass through a particular intermediary.

## 2. Non-goals

ESA is not a transport protocol, payment network, hosting platform, mandatory marketplace, identity provider, or replacement for OpenAPI, MCP, OAuth, JSON Schema, or x402.

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
7. Composition SHOULD use reusable JSON Schemas with stable `$id` values.
8. Published metadata MUST accurately reflect enforced runtime behavior.

## 6. Manifest

A conforming service SHOULD publish an `esa.yaml` manifest at its repository root or at a documented well-known URL.

The manifest MUST include:

- `spec_version`
- service identity and version
- at least one capability
- capability identity and description
- at least one interface per capability
- input and output schema references
- access policy
- lifecycle status
- governance contact and binding terms links

See [`service-manifest.md`](service-manifest.md).

## 7. Access and identity

A capability MUST advertise each accepted authentication method and SHOULD identify accepted issuers and required scopes before invocation.

Supported method names include:

- `public`
- `session`
- `api_key`
- `oauth2`
- `signed_service`
- `x402`

An implementation MAY define extensions using namespaced values.

## 8. Pricing

Pricing MUST declare a model. Initial models are:

- `free`
- `per_request`
- `metered`
- `tiered`
- `subscription`
- `credits`
- `contract`
- `revenue_share`
- `hybrid`

Metered pricing MUST identify its unit, such as tokens, rows, records, seconds, megabytes, or generated assets. Monetary decimal values MUST be serialized as strings.

## 9. Reliability and limits

Capabilities SHOULD declare:

- per-key and per-tenant rate limits
- concurrency limits
- availability target
- latency targets such as p50 and p95
- timeout behavior
- retry guidance

Published targets are descriptive unless incorporated into binding terms.

## 10. Data governance

Capabilities MUST declare a data classification and whether requests or responses may contain PII. They SHOULD declare retention, geographic processing restrictions, freshness, and permitted-use constraints.

Public discovery does not imply unrestricted access or redistribution rights.

## 11. Lifecycle and compatibility

Breaking contract changes require a new major capability interface version. Multiple interface versions MAY coexist under one stable capability ID.

Deprecated capabilities MUST identify a deprecation date and SHOULD identify a sunset date and successor capability ID.

See [`versioning.md`](versioning.md).

## 12. Async execution and events

Capabilities MAY be synchronous or asynchronous. Async capabilities MUST specify how callers obtain status and results, including polling, callback, webhook, queue, or event mechanisms.

Event schemas SHOULD use stable names and JSON Schema `$id` values.

## 13. MCP mapping

MCP is an optional interface, not a requirement of ESA. A manifest MAY declare an MCP tool name, description, server URL, and input-schema derivation strategy for a capability.

See [`mcp-mapping.md`](mcp-mapping.md).

## 14. Trust metadata

Registries MAY attach independently verified signals such as:

- verified owner
- observed uptime
- observed latency
- dispute or refund rate
- manifest/runtime conformance
- security review status

Self-asserted and independently verified signals MUST be distinguishable.

## 15. Legal boundary

Publishing an ESA manifest is not an offer to contract. Pricing, SLA, licensing, and permitted-use fields are descriptive unless incorporated into binding terms accepted by the relevant parties.

## 16. Implementations

Any organization MAY build an ESA validator, registry, documentation generator, marketplace, MCP bridge, policy engine, gateway, or control plane. No implementation receives privileged status under the specification.
