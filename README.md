# Echelon Economic Service Architecture (ESA)

**A standard for building software whose capabilities can be discovered, priced, invoked, and composed by humans, applications, and autonomous AI agents.**

ESA is an architectural standard, not a single product or payment protocol. It defines how independent projects expose valuable capabilities while retaining ownership of their own business logic, data, infrastructure, and user experience.

## Core idea

Applications own capabilities. Echelon provides an optional economic and operational layer around them.

A MusicDNA analysis, Mom Walk business search, community insight, mortgage lead score, or future service can remain inside its existing project while being exposed through a stable HTTP interface. The website remains one client; agents and other applications become additional clients.

## Repository map

- [`docs/architecture/economic-service-architecture.md`](docs/architecture/economic-service-architecture.md) — canonical ESA vision and principles
- [`docs/service-manifest-spec.md`](docs/service-manifest-spec.md) — proposed `echelon.yaml` contract
- [`examples/musicdna-service.yaml`](examples/musicdna-service.yaml) — MusicDNA example
- [`examples/momwalk-service.yaml`](examples/momwalk-service.yaml) — Mom Walk Brand Portal example

## Status

Version 0.1 — working architectural standard for Lovable and related projects.

## Adoption rule

Each participating project should:

1. Keep product-specific business logic inside its own codebase.
2. Expose selected valuable capabilities through versioned HTTP endpoints.
3. Publish machine-readable documentation and a service manifest.
4. Support one or more access models, such as authenticated sessions, API keys, OAuth, subscriptions, or x402.
5. Remain independently callable and discoverable outside Echelon.

Echelon may index, document, price, monitor, govern, and orchestrate these services, but it is not required in the execution path unless a project explicitly chooses Echelon as its gateway.
