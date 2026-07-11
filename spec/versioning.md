# ESA Versioning and Compatibility

Version 0.2 — Draft

## Three distinct versions

ESA separates:

1. `spec_version` — version of the ESA manifest format.
2. `service.version` — version of the published service contract.
3. `capability.version` — version of a specific capability contract.

## Compatibility rules

A change is breaking when an existing conforming caller may fail or receive materially different semantics without changing its request.

Breaking changes include:

- removing or renaming required inputs or outputs
- narrowing accepted enum values
- changing field meaning or units
- changing authentication requirements
- changing synchronous execution to asynchronous without preserving compatibility
- removing an interface version
- changing stable error-code semantics

Non-breaking changes generally include:

- adding optional fields
- adding a new interface
- adding a new authentication method
- adding a new capability
- adding new optional error metadata

## Major versions

Breaking capability changes MUST increment the major version. Multiple major versions MAY remain live under the same stable capability ID.

Example:

```yaml
id: musicdna.profile.generate
version: "2.0.0"
interfaces:
  http:
    path: /api/v2/profiles
```

## Deprecation

Deprecated capabilities MUST declare `deprecated_on`. They SHOULD declare:

- `sunset_on`
- `successor_capability_id`
- `successor_version`
- migration documentation

A registry SHOULD continue showing deprecated capabilities until sunset while clearly warning new consumers.

## Recommended notice

The specification does not mandate a universal notice period. Publishers SHOULD choose a period appropriate to impact and binding agreements. Ninety days is a reasonable default for non-emergency public APIs.

## Emergency changes

Security, fraud, legal, or safety risks MAY require immediate restriction or suspension. The service SHOULD publish the reason and remediation path where legally and operationally appropriate.
