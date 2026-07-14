# Contributing

Thanks for considering a contribution to this project!

## Local Development

```bash
git clone https://github.com/<your-username>/github-actions-capstone.git
cd github-actions-capstone
cp .env.example .env
npm install
npm run dev
```

The app will be available at `http://localhost:3000`, with a health check at
`http://localhost:3000/health`.

## Running with Docker

```bash
docker compose up --build
```

## Running Tests

```bash
npm test        # runs Jest with coverage
npm run lint     # runs ESLint
```

## Branching & PRs

1. Create a feature branch off `main`: `git checkout -b feat/my-change`
2. Make your changes, keeping commits focused and descriptive.
3. Run `npm test` and `npm run lint` locally before pushing.
4. Open a PR against `main`. This triggers `pr-pipeline.yml`, which runs
   build & test only (no image is built or pushed for PRs).
5. Once merged, `main-pipeline.yml` runs the full build → test → Docker
   build & push → Trivy scan → deploy sequence.

## Commit Style

This repo doesn't enforce a strict commit convention, but
`type(scope): message` (e.g. `fix(app): handle empty body on /health`) is
preferred for readability and to keep Dependabot/Release notes clean.

## Required GitHub Secrets

To run the full pipeline in your own fork, configure these repository
secrets under **Settings → Secrets and variables → Actions**:

| Secret | Description |
| --- | --- |
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_TOKEN` | A Docker Hub access token (not your password) |

And set up a `production` environment under **Settings → Environments**
with required reviewers if you want manual approval before deploy.
