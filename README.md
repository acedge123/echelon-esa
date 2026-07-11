# Economic Service Architecture (ESA)

**An open specification for describing software capabilities so they can be discovered, evaluated, invoked, governed, and economically consumed by humans, applications, and autonomous agents.**

ESA defines how a product declares what it can do and on what terms. It does not define how the capability is implemented.

## Why ESA exists

MCP standardizes how agents call tools. OpenAPI describes HTTP interfaces. x402 enables agent-native payment. ESA sits above those layers and provides a portable declaration of the capability itself: identity, interfaces, authentication, payments, pricing, schemas, limits, governance, lifecycle, and trust metadata.

The primary artifact is a machine-readable `esa.yaml` manifest. Registries, validators, documentation generators, MCP bridges, gateways, and commercial platforms can all consume the same manifest.

## Non-goals

ESA is not:

- An SDK or application framework
- A new transport protocol
- A payment network
- A hosting platform
- A mandatory gateway
- A replacement for MCP, OpenAPI, OAuth, JSON Schema, or x402
- A guarantee that published data or services are lawful, accurate, or safe

## Core principles

1. Capabilities are more durable than interfaces.
2. Products retain ownership of business logic, data, and infrastructure.
3. A capability may expose multiple interfaces, including HTTP and MCP.
4. Existing systems should be wrapped, not rewritten.
5. Discovery is decentralized; no registry is mandatory.
6. Authentication and payment are separate, machine-readable axes.
7. Pricing models carry model-specific required fields.
8. Capability IDs remain stable even when endpoints or interface versions change.
9. Composition depends on reusable JSON Schemas with stable `$id` URIs.
10. Lifecycle, reliability, errors, and governance are explicit.

## Repository map

- [`spec/esa-v0.2.md`](spec/esa-v0.2.md) — core open specification
- [`spec/service-manifest.md`](spec/service-manifest.md) — complete `esa.yaml` field definitions
- [`spec/versioning.md`](spec/versioning.md) — compatibility and deprecation rules
- [`spec/mcp-mapping.md`](spec/mcp-mapping.md) — explicit and derived MCP mappings
- [`schemas/esa.schema.json`](schemas/esa.schema.json) — machine-validatable v0.2 JSON Schema
- [`examples/musicdna.esa.yaml`](examples/musicdna.esa.yaml) — synchronous paid capability example
- [`examples/momwalk.esa.yaml`](examples/momwalk.esa.yaml) — governed directory-search example
- [`cli/validate.mjs`](cli/validate.mjs) — reference manifest validator

## Validate a manifest

```bash
cd cli
npm install
node validate.mjs ../examples/musicdna.esa.yaml
```

Expected output:

```text
✓ Valid ESA manifest: /path/to/musicdna.esa.yaml
```

The validator uses AJV, JSON Schema Draft 2020-12, and YAML parsing. It is intentionally small and serves as a reference implementation, not yet a published package.

## Status

**Version 0.2 — draft open specification.**

The format is implementation-neutral. Echelon is one possible registry, governance, payments, and orchestration implementation, but ESA does not require Echelon in the discovery or execution path.

## Legal boundary

Publishing an `esa.yaml` manifest is descriptive metadata, not an offer to contract. Binding rights and obligations arise only through the terms, license, order form, MSA, payment flow, or other agreement linked by the service owner.