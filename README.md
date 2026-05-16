# RentLedger Web

Mobile-first React app for tenants, landlords, and arbitrators using RentLedger escrow contracts on Stellar.

## Features

- Freighter wallet connection.
- Lease initiation form for tenant-funded escrow.
- Stellar testnet configuration.
- Contract call builder for `create_lease`.
- Responsive operations-oriented UI for low-bandwidth mobile users.

## Local Setup

```bash
npm install
npm run dev
```

Create `.env.local` when needed:

```text
VITE_STELLAR_NETWORK=testnet
VITE_RENT_ESCROW_CONTRACT_ID=
VITE_STELLAR_MAINNET_RPC_URL=
```

## Vercel Deployment

This repo is configured as a single-page app for Vercel. Vercel should build the project with `npm run build` and serve `dist/`.

For deep links to work on refresh, the repository includes a `vercel.json` rewrite that routes all paths to `index.html`.

Suggested environment variables on Vercel:

```text
VITE_STELLAR_NETWORK=testnet
VITE_RENT_ESCROW_CONTRACT_ID=
VITE_STELLAR_MAINNET_RPC_URL=
```

## Contributor Tasks

- Generate TypeScript bindings from deployed WASM.
- Submit signed XDR through RPC after Freighter signing.
- Add release, refund, dispute, and arbitrator views.
- Add Playwright mobile tests for critical lease flows.

## Related Repositories

- `rentledger-contracts`: Soroban escrow contracts.
- `rentledger-arbitrator-service`: off-chain pool coordination API.
- `rentledger-docs`: product, protocol, and community governance docs.
