# Economic Service Architecture (ESA)

Version 0.2 — Draft

> ESA defines how software capabilities are described, discovered, governed, and economically consumed. It does not define how they are implemented.

This document has moved to the versioned open specification:

- [`../../spec/esa-v0.2.md`](../../spec/esa-v0.2.md)
- [`../service-manifest-spec.md`](../service-manifest-spec.md)

## Position in the stack

ESA complements rather than competes with existing standards:

- **OpenAPI** describes HTTP contracts.
- **MCP** lets agent clients discover and invoke tools.
- **OAuth, API keys, and signed credentials** establish identity and authorization.
- **x402 and conventional billing systems** support economic access.
- **ESA** declares the durable capability, supported interfaces, accepted identity issuers, commercial terms, governance, lifecycle, and trust metadata.

## Open implementation model

Any product may publish an `esa.yaml` manifest. Any validator, registry, marketplace, MCP bridge, gateway, or control plane may consume it.

Echelon is one possible implementation. It is not required for ESA discovery, validation, invocation, payment, or execution.
