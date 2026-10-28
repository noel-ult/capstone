# capstone: verification and operations

Reviewed against [default-branch commit bb2c96c06970](https://github.com/noel-ult/capstone/commit/bb2c96c06970cdb960eeab7b7eb780b9c47e1b97) on 2026-10-28. Start with the [developer guide](PROJECT_GUIDE.md) for installation and architecture, and the [source reference](REFERENCE.md) for exact scripts, configuration readers, routes, and source locations.

## Skill ownership

With two disposable accounts, verify signup/login, skill creation, owned updates/deletes, listing/search, and rejection of unauthenticated protected requests.

These are acceptance scenarios for a maintainer to run in the documented environment. Their inclusion is not a claim that live integrations or production credentials were tested during this documentation update.

## Deployment and failure diagnosis

MongoDB must connect before the API listens. Production serves frontend/build; build that directory and align the client API destination.

## Maintaining the contract

When behavior changes, update the guide and examples in the same PR. Check the entry point and working directory before copying commands. Use the linked source readers to distinguish build-time configuration from process environment. For failures, capture the first application error, runtime version, selected mode, and redacted configuration names before later proxy or port errors.

Keep changes tied to evidence: a declared command is not proof it passes, a process health response is not a successful end-to-end workflow, and a historical report describes its own revision. Record actual check results and any unavailable external services in the PR.
