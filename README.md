# Economic Service Architecture (ESA)

**An open specification for describing software capabilities so they can be discovered, evaluated, invoked, governed, and economically consumed by humans, applications, and autonomous agents.**

ESA defines how a product declares what it can do and on what terms. It does not define how the capability is implemented.

## Why ESA exists

MCP standardizes how agents call tools. OpenAPI describes HTTP interfaces. x402 enables agent-native payment. ESA sits above those layers and provides a portable declaration of the capability itself: identity, interfaces, access, pricing, schemas, limits, governance, lifecycle, and trust metadata.

The primary artifact is a machine-readable `esa.yaml` manifest. Registries, validators, documentation generators, MCP bridges, gateways, and commercial platforms can all consume the same manifest.

## Non-goals

ESA is not:

- A new transport protocol
- A payment network
- A hosting platform
- A mandatory gateway
- A replacement for MCP, OpenAPI, OAuth, or x402
- A guarantee that published data or services are lawful, accurate, or safe

## Core principles

1. Capabilities are more durable than interfaces.
2. Products retain ownership of business logic, data, and infrastructure.
3. A capability may expose multiple interfaces, including HTTP and MCP.
4. Existing systems should be wrapped, not rewritten.
5. Discovery is decentralized; no registry is mandatory.
6. Identity, economics, governance, and lifecycle are machine-readable.
7. Capability IDs remain stable even when endpoints or interface versions change.
8. Composition depends on explicit, reusable schemas and events.

## Repository map

- [`spec/esa-v0.2.md`](spec/esa-v0.2.md) — core open specification
- [`spec/service-manifest.md`](spec/service-manifest.md) — `esa.yaml` field definitions
- [`spec/versioning.md`](spec/versioning.md) — compatibility and deprecation rules
- [`spec/mcp-mapping.md`](spec/mcp-mapping.md) — mapping ESA capabilities to MCP tools
- [`schemas/esa.schema.json`](schemas/esa.schema.json) — initial JSON Schema
- [`examples/musicdna.esa.yaml`](examples/musicdna.esa.yaml) — synchronous paid capability example
- [`examples/momwalk.esa.yaml`](examples/momwalk.esa.yaml) — governed directory-search example

## Status

**Version 0.2 — draft open specification.**

The format is intentionally implementation-neutral. Echelon is one possible registry, governance, payments, and orchestration implementation, but ESA does not require Echelon in the discovery or execution path.

## Legal boundary

Publishing an `esa.yaml` manifest is descriptive metadata, not an offer to contract. Binding rights and obligations arise only through the terms, license, order form, MSA, payment flow, or other agreement linked by the service owner.
