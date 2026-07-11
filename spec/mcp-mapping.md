# ESA MCP Mapping

Version 0.2 — Draft

MCP is an optional ESA interface. ESA defines the capability; MCP defines one way an agent discovers and invokes it.

## Mapping

An ESA capability MAY declare:

```yaml
interfaces:
  mcp:
    tool_name: musicdna_generate_profile
    server_url: https://example.com/mcp
    description_from: description
    input_schema_from: input_schema
```

## Requirements

- `tool_name` MUST be unique within the MCP server.
- The MCP input schema MUST be compatible with the capability's declared input schema.
- The tool description SHOULD preserve the capability's intent, constraints, and economic requirements.
- Authentication and payment requirements MUST remain discoverable before invocation.
- Stable ESA capability identity MUST NOT depend on the MCP tool name.

## Generated bridges

A conforming bridge MAY read `esa.yaml` and generate MCP tools from HTTP or other interfaces. Generated tools SHOULD preserve:

- capability ID and version
- input validation
- output and error semantics
- authentication scopes
- pricing disclosures
- idempotency and async behavior

## Runtime behavior

When payment or authorization is required, an MCP bridge MAY return a structured challenge, invoke an approved payment flow, or delegate to a gateway. The bridge MUST NOT silently alter the service's declared economics or permissions.
