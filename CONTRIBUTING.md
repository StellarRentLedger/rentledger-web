# Contributing

## Development Flow

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run lint` and `npm run build` before opening a pull request.
4. Keep wallet, transaction, and view logic separated under `src/lib` and `src/components`.

## UI Guidelines

- Prioritize mobile screens and low-bandwidth contexts.
- Keep lease status visible before secondary content.
- Use icons for repeated actions and buttons.
- Do not hide fees, timing, or dispute state.
