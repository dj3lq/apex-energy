# Security

## Known accepted vulnerabilities

### js-cookie <=3.0.5 (via @clerk/nextjs)
- **Advisory**: GHSA-qjx8-664m-686j
- **Severity**: High (theoretical)
- **Status**: Accepted — no safe fix available without breaking @clerk/nextjs
- **Exploitability**: Requires prior XSS/JS execution on page — not independently exploitable
- **Resolution**: Monitor @clerk/nextjs releases for upstream patch
- **Last reviewed**: May 2026