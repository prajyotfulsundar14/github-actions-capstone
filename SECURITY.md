# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| latest (main) | ✅ |
| tagged releases (last 2) | ✅ |
| older releases | ❌ |

## Reporting a Vulnerability

If you discover a security vulnerability in this project:

1. **Do not** open a public GitHub issue.
2. Email the maintainer directly or use GitHub's private
   [Security Advisories](../../security/advisories/new) feature.
3. Include steps to reproduce, potential impact, and any suggested fix.

You should expect an initial response within 5 business days.

## Automated Security Tooling in This Repo

This repository ships with several automated layers of security scanning:

- **Trivy** — container image vulnerability scanning on every push to `main`
  and on every release tag. The pipeline fails on any **CRITICAL** severity
  CVE.
- **CodeQL** — static application security testing (SAST) on every push, PR,
  and a weekly scheduled scan, with results published to the repository's
  Security tab.
- **Dependabot** — automated weekly dependency update PRs for npm packages,
  GitHub Actions, and the base Docker image.
