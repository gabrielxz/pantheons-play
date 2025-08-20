# Development Setup

## Git Hooks (Husky)

This project uses Husky to prevent broken code from being committed or pushed.

### Pre-commit Hook
Runs automatically before each commit:
- **ESLint**: Fixes and checks all JavaScript/TypeScript files
- **TypeScript**: Type-checks all TypeScript files
- Only the changed files are checked (via lint-staged)

### Pre-push Hook
Runs before pushing to remote:
- Full TypeScript type-check
- Full ESLint check
- Full build verification

### Manual Commands

```bash
# Run all checks manually
npm run check-all

# Individual checks
npm run type-check  # TypeScript type checking
npm run lint        # ESLint check
npm run lint:fix    # ESLint auto-fix
npm run build       # Production build
```

### If a Hook Fails

1. **Pre-commit fails**: Fix the errors in your files and try committing again
2. **Pre-push fails**: The build or tests failed. Run `npm run check-all` to see all errors

### Bypassing Hooks (Emergency Only!)

```bash
# Skip pre-commit hook
git commit --no-verify -m "message"

# Skip pre-push hook  
git push --no-verify
```

⚠️ Only bypass hooks in emergencies. The hooks prevent deployment failures!

## Common Issues

### "Unexpected any" errors
- Replace `any` with proper types
- Use `unknown` if type is truly unknown
- Use `Record<string, unknown>` for objects

### ESLint errors
- Run `npm run lint:fix` to auto-fix
- Check remaining issues with `npm run lint`

### TypeScript errors
- Run `npm run type-check` to see all errors
- Fix type issues before committing