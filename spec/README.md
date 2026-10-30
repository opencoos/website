# COOS — Common Ownership Operating Schema

The machine-readable specification for **COOS**, an open, vendor-neutral data model for strata and condominium communities across Canada. COOS is maintained by [OpenCOOS](https://github.com/opencoos), an open initiative founded by ManageStrata.

> **Status: early development.** Version `0.1.0-draft` is an unreleased working draft. Every entity is *proposed* or *experimental* and may change. The first draft is modelled on BC strata; Ontario and Alberta condominiums are the next priority. Nothing here is legal advice.

## Layout

```
spec.json              Name, version, status, domains, schema ID prefix
changelog.json         Releases and open proposals
domains/*.json         Purpose, scope, planned entities and open issues per domain
schemas/
  common.schema.json   Shared definitions (Identifier, Money, Address, …)
  <domain>/<Entity>.schema.json   JSON Schema (draft 2020-12), one per entity
examples/<Entity>.example.json    Illustrative example per entity (fictional data)
```

Schemas use `$id`s of the form `urn:coos:schema:<Entity>` and a few annotation keywords (`x-status`, `x-domain`, `x-relationships`, …) that validators ignore.

## Validation

Every schema is compiled and every example is validated against its schema by `scripts/validate-spec.mjs` in the [website repository](https://github.com/opencoos/website), which includes this repository as a git submodule and runs the check on every build.

## Contributing

Open an issue to report a problem, a missing concept, or terminology that doesn't match practice in your province. You don't need to be a developer. Please never include real personal or confidential strata or condo information.

## Licence

A licence has not been chosen yet. It will be added before the first release.
