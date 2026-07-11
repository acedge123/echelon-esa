# Echelon Economic Service Architecture (ESA)

Version 0.1  
July 2026

## Definition

The Echelon Economic Service Architecture is a standard for building software whose capabilities can be discovered, priced, invoked, and composed by humans, applications, and autonomous AI agents.

ESA separates three concerns:

- **Products own capabilities and business logic.**
- **Clients choose how to consume those capabilities.**
- **Echelon optionally provides discovery, economics, governance, and orchestration.**

ESA is broader than x402, MCP, OpenAPI, crypto, or any single framework. Those are implementation choices within the architecture.

## Architectural thesis

A durable software asset is not only its interface. It is the underlying capability.

A web application is one client of that capability. A mobile app is another. An AI agent, partner application, internal workflow, or marketplace can be another.

Under ESA, products are designed as collections of reusable capabilities rather than as isolated interfaces.

## Core principles

### 1. Capabilities are first-class

Every valuable product function should be identifiable as a capability.

Examples:

- Generate a MusicDNA taste profile
- Produce a MusicDNA reveal
- Search the Mom Walk local business directory
- Return community-level statistics
- Match a sponsor to relevant communities
- Score a mortgage lead
- Retrieve a research benchmark

Not every internal function should become public. Only capabilities with clear utility, safe boundaries, and an intentional access policy should be exposed.

### 2. Products remain autonomous

Each product owns its:

- Business logic
- Database
- Security model
- Data quality
- Infrastructure
- Product-specific policies
- User experience

MusicDNA remains responsible for archetypes, pairings, inference, and reveal logic. The Mom Walk Brand Portal remains responsible for community, event, sponsor, and business-directory data.

Echelon must not duplicate or fork that logic.

### 3. Interfaces are clients

The website is one client of the service layer.

```text
Web app ─────────────┐
Mobile app ──────────┤
AI agent ────────────┼──> Versioned service endpoint ──> Product logic/data
Partner application ┤
Internal workflow ───┘
```

Business rules should not exist only inside UI components when they are intended to be reusable.

### 4. Existing systems are wrapped, not rewritten

ESA adoption should be incremental.

An existing Supabase Edge Function, Cloudflare Worker, Railway service, or server route can remain in place. A thin service boundary can add:

- Versioned routing
- Authentication or payment enforcement
- Input validation
- Rate limiting
- Logging
- Machine-readable documentation

```text
Caller
  │
  ▼
Access / payment middleware
  │
  ▼
Existing endpoint or edge function
  │
  ▼
Existing database and business logic
```

### 5. Discovery is decentralized

ESA services must not depend on Echelon for existence or discoverability.

A service may be discovered through:

- Direct documentation
- OpenAPI
- MCP
- Search
- AI marketplaces
- Partner registries
- Internal catalogs
- Echelon

Echelon is a preferred registry and control plane, not a mandatory monopoly gateway.

### 6. Economics are pluggable

A capability may use any intentional access model:

- Free
- Authenticated-only
- Metered usage
- API key
- Credits
- Subscription
- Enterprise contract
- Revenue share
- x402 payment
- Hybrid models

Example:

```yaml
payments:
  protocol: x402
  currency: USDC
  network: base
```

x402 is one implementation of agent-native payment. ESA should remain compatible with future protocols.

### 7. Human and agent access can coexist

The same underlying capability may support multiple access paths.

For example:

- A logged-in MusicDNA user accesses a profile through an application session.
- A partner uses an API key.
- An AI agent pays through x402.
- An internal service uses a signed service credential.

The product decides which methods are allowed.

### 8. Services are composable

Capabilities should return structured outputs that can be used by other services.

```text
MusicDNA profile
      │
      ▼
Recommendation service
      │
      ▼
Playlist or commerce service
      │
      ▼
Campaign-generation service
```

Composition should not require screen scraping or UI automation when a direct service contract can be provided.

### 9. Governance is explicit

Every exposed capability should define:

- Owner
- Version
- Access policy
- Data classification
- Pricing
- Rate limits
- Input and output schema
- Reliability expectations
- Logging and audit behavior
- Deprecation policy

This governance layer is a natural role for Echelon.

## Echelon's role

Echelon may provide:

- Service directory and discovery
- Capability documentation
- Pricing metadata
- Identity and credential management
- x402 and other payment support
- Usage metering
- Spend controls
- Rate limits
- Health monitoring
- Audit trails
- Reputation and trust signals
- Policy enforcement
- Workflow composition
- Agent orchestration

Echelon should not automatically become:

- The source of truth for product data
- The owner of product-specific algorithms
- A required proxy for all requests
- A duplicate application backend

A project may choose to route traffic through Echelon, but this is optional.

## Recommended endpoint model

Use stable, versioned HTTP interfaces.

Examples:

```text
POST /api/v1/musicdna/profile
POST /api/v1/musicdna/reveal
GET  /api/v1/momwalk/businesses/search
GET  /api/v1/momwalk/communities/{community_id}/stats
POST /api/v1/momwalk/sponsor-match
```

Each endpoint should define:

- Purpose
- Request schema
- Response schema
- Error model
- Access methods
- Price or billing rule
- Data freshness
- Usage limits

## Service manifest

Each ESA-compliant project should publish an `echelon.yaml` or equivalent machine-readable manifest.

The manifest describes the service without moving the service into Echelon.

Minimum recommended fields:

```yaml
spec_version: "0.1"

service:
  id: musicdna
  name: MusicDNA
  version: "1.0.0"
  base_url: https://example.com/api/v1

capabilities:
  - id: generate-profile
    method: POST
    path: /musicdna/profile
    description: Generate a structured taste profile.
    access:
      - session
      - x402
    pricing:
      model: per_request
      amount: "0.05"
      currency: USDC
      network: base

discovery:
  openapi_url: https://example.com/openapi.json
  mcp: false
  echelon_registry: true
```

See [`../service-manifest-spec.md`](../service-manifest-spec.md).

## Initial adoption pattern

For each Lovable project:

1. Inventory valuable existing capabilities.
2. Select one low-risk capability for an initial pilot.
3. Confirm that product logic already exists behind a server-side boundary.
4. Add a versioned endpoint if necessary.
5. Define schemas, access policy, and pricing.
6. Add OpenAPI or equivalent machine-readable documentation.
7. Add `echelon.yaml`.
8. Register the service with Echelon when useful.
9. Test direct discovery and invocation outside Echelon.
10. Add monitoring and usage reporting.

## Candidate pilots

### MusicDNA

Potential first capability:

```text
POST /api/v1/musicdna/profile
```

Possible consumers:

- MusicDNA web app
- External AI agent
- Music recommendation partner
- Echelon workflow

### Mom Walk Brand Portal

Potential first capability:

```text
GET /api/v1/momwalk/businesses/search
```

Potential value:

- Search aggregated local businesses by location and category
- Identify businesses near a Mom Walk community
- Return sponsorship-relevant metadata
- Support brand-planning or local activation agents

Before exposure, the project must validate source rights, permitted uses, privacy, freshness, and whether redistribution of scraped or aggregated fields is allowed.

## Security and data rights

ESA does not make data safe or licensable merely by exposing an endpoint.

Every project must review:

- Ownership and license rights
- Scraping terms and source restrictions
- Personal information and privacy obligations
- Confidential or client-owned data
- Data minimization
- Abuse and enumeration risks
- Output filtering
- Retention and audit requirements

Public discovery does not require unrestricted access. A service can be discoverable while remaining paid, permissioned, rate-limited, or contract-restricted.

## Long-term vision

The future internet will include networks of services that agents can understand and invoke without bespoke onboarding.

Under ESA:

- Products build durable capabilities.
- Interfaces become interchangeable clients.
- Services remain independently operable.
- Economics become machine-readable.
- Echelon provides an optional trust, governance, and orchestration layer.

The objective is not to force every product into Echelon.

The objective is to make every approved capability understandable, accessible, governable, and economically usable by the next generation of software and agents.
