# OpenCOOS — website

Website for **OpenCOOS**, the open initiative maintaining **COOS** (Common Ownership Operating Schema): an open, vendor-neutral data model for shared-ownership communities, starting with BC strata corporations. OpenCOOS was founded by ManageStrata.

Status: early development. Specification version `0.1.0-draft` (unreleased).

## Structure

```
spec/                     Specification source (git submodule: opencoos/spec)
  spec.json               Name, version, status, domains
  changelog.json          Releases and open proposals
  domains/*.json          Domain purpose, scope, planned entities, open issues
  schemas/**.schema.json  JSON Schema 2020-12 definitions (common.schema.json = shared types)
  examples/*.json         One illustrative example per entity
scripts/
  validate-spec.mjs       Compiles schemas, validates examples, checks relationships
  publish-schemas.mjs     Copies spec files to public/spec/<version>/ (stable URLs)
lib/spec/                 Loader that turns the spec source into page data
app/                      Next.js App Router pages; docs are MDX under app/docs
components/               Site UI (shadcn/ui in components/ui)
```

The website renders everything about entities from `spec/`. To add or change an entity, edit its schema and example, then run `npm run spec:validate`.

## Getting the code

The specification lives in its own repository, [opencoos/spec](https://github.com/opencoos/spec), included here as a git submodule at `spec/`:

```bash
git clone --recurse-submodules https://github.com/opencoos/website.git
# or, in an existing clone:
git submodule update --init
```

## Commands

```bash
npm install
npm run dev            # publish spec files and start dev server
npm run build          # validate spec, publish spec files, build site
npm run spec:validate  # validate the specification only
npm run typecheck
npm run lint
```

## Configuration

Copy `.env.example` to `.env.local`. External links (repository, issues, discussions, contribution guide, contact email) are unset by default and shown as "Pending configuration" until set. `SPEC_DIR` points the site at a separately checked-out specification repository.

## Licence

Licensed under the [Apache License, Version 2.0](LICENSE), as is the specification in [opencoos/spec](https://github.com/opencoos/spec). Copyright The OpenCOOS Authors. The names "COOS" and "OpenCOOS" and the logo are not covered by the licence (see [NOTICE](NOTICE)).
