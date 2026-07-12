# Changelog

All notable changes to the Economic Service Architecture specification are recorded here.

The format follows the spirit of Keep a Changelog. ESA specification versions use semantic versioning once a version is declared stable; draft versions may still change before release.

## [0.2.0] — Draft — 2026-07-12

### Added

- Vendor-neutral `esa.yaml` manifest convention.
- Stable capability identifiers independent of endpoints and protocols.
- Explicit interface declarations for HTTP, MCP, and future transports.
- JSON Schema references for inputs, outputs, events, errors, and async results.
- Authentication declarations with accepted issuers and per-capability scopes.
- Separate payment and settlement declarations, including x402 support.
- Model-specific pricing structures for `free`, `per_request`, `metered`, `tiered`, `subscription`, `credits`, `contract`, `revenue_share`, and `hybrid`.
- Per-key, per-tenant, and concurrency rate-limit metadata.
- SLA and reliability metadata, including p50/p95 latency and timeout targets.
- Data classification, PII, retention, freshness, and permitted-use declarations.
- Idempotency behavior.
- Stable error-code declarations.
- Async execution, webhooks, signature verification, and event schemas.
- Semantic versioning, deprecation windows, sunset dates, and successor capabilities.
- Explicit and derived MCP mappings.
- Trust and reputation metadata with self-asserted versus independently verified signals.
- Legal boundary clarifying that manifests are descriptive metadata, not offers to contract.
- Canonical reference manifest at `examples/esa.yaml`.
- Initial JSON Schema validator and CLI reference implementation.

### Changed

- Renamed the manifest from `echelon.yaml` to `esa.yaml` to keep the specification vendor-neutral.
- Reframed Echelon as one optional implementation rather than a required gateway or registry.
- Split authentication from payment; x402 is now represented as settlement, not identity.
- Replaced the service-level `mcp: true|false` placeholder with capability-level MCP mappings.
- Moved brand-specific pilots out of the normative specification and into non-normative examples.
- Expanded "composable" from a design principle into a schema rule using stable JSON Schema `$id` URIs.
- Reconciled governance requirements with concrete manifest fields.

### Removed

- Any requirement that services route through Echelon.
- Echelon-specific naming from the open specification itself.
- The implication that a YAML file alone establishes compliance.

## [0.1.0] — 2026-07

### Added

- Initial architectural thesis: capabilities are more durable than interfaces.
- Product autonomy and "wrap, do not rewrite" adoption model.
- Decentralized discovery.
- Optional pricing and x402 support.
- Early Echelon directory/control-plane framing.
- Initial MusicDNA and Mom Walk examples.
