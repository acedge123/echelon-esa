# ESA Service Manifest Specification

Version 0.2 — Draft

The conventional manifest filename is `esa.yaml`. It is a portable declaration of a service and its capabilities; it does not require any specific registry, gateway, hosting provider, payment protocol, or control plane.

The canonical field reference now lives at [`../spec/service-manifest.md`](../spec/service-manifest.md). The initial machine-validatable schema is [`../schemas/esa.schema.json`](../schemas/esa.schema.json).

## Required concepts

An ESA manifest describes:

- Stable service and capability identities
- Supported interfaces, including HTTP and MCP mappings
- Request, response, event, error, and async-result schemas
- Accepted authentication methods, credential issuers, and scopes
- Pricing models and settlement details
- Per-key and per-tenant rate limits
- Availability and latency targets
- Data classification, PII handling, freshness, and retention
- Idempotency support
- Version compatibility, deprecation, sunset, and successor capabilities
- Terms, privacy, ownership, and support contacts
- Optional trust and reputation signals

## Legal status

A manifest is descriptive metadata and is not itself an offer, quote, SLA, license, or contract. Binding terms arise only through the linked terms, MSA, order form, payment authorization, or other agreement accepted by the parties.

## Compliance

A YAML file alone does not establish ESA compliance. The published manifest must validate against the applicable schema and accurately describe the live capability's enforced behavior.
