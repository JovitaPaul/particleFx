# Contributing to particleFx

First off, thanks for your interest in contributing to **particleFx**! ✨

This guide will help you get started and ensure consistency across all contributions made to this repository.

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Commit Guidelines](#commit-guidelines)
- [Pull Requests](#pull-requests)
- [Reporting Issues](#reporting-issues)
- [Code Style & Testing](#code-style--testing)
- [General Guidelines](#general-guidelines)
- [Communication](#communication)

## How to Contribute

1. **Fork the repository**  
   Click the **Fork** button at the top of the repository page.

2. **Clone your fork locally**
   ```bash
   git clone https://github.com/YOUR_USERNAME/particlefx.git
   cd particlefx
   ```

3. **Create a new branch**  
   Follow our [branch naming conventions](#branch-naming-conventions).

4. **Make your changes**  
   Ensure they follow the [code style and testing guidelines](#code-style--testing).

5. **Commit your changes**  
   Use our [commit message format](#commit-guidelines).

6. **Push your branch**
   ```bash
   git push origin your-branch-name
   ```

7. **Open a Pull Request (PR)**  
   Add a clear description of your changes. If applicable, include a short demo (GIF/video/screenshot) showing your feature or bug fix in action.

## Branch Naming Conventions

Use descriptive branch names for clarity:

- `feature/<feature-name>` → new features
- `fix/<bug-name>` → bug fixes
- `docs/<documentation-update>` → documentation changes
- `chore/<task>` → configs, builds, misc

**Example:**
```
feature/particle-vortex
fix/mouseleave-event
```

## Commit Guidelines

Use **imperative tense** and keep commits small & focused:

✅ **Examples:**
```
feat: add galaxy preset
fix: correct particle gravity config
docs: update quick start guide
```

**Optional:** include issue reference if applicable:
```
fix: handle resize bug #42
```

## Pull Requests

- Ensure your branch is up to date with `main`.
- Use a descriptive title and provide context in the PR description.
- Include a working demo (screenshot, GIF, or short video) for features/bug fixes.
- Label your PR appropriately (`feature`, `bug`, `docs`, etc.).

## Reporting Issues

- Check existing issues to avoid duplicates.
- Provide a **clear description** of the problem.
- Include **steps to reproduce**, expected vs actual behavior, and screenshots/logs when relevant.

## Code Style & Testing

- **Language:** JavaScript/TypeScript
- **Linting:** ESLint + Prettier
- **UI Components:** Follow **shadcn/ui** conventions if contributing to demos.

**Run before committing:**
```bash
pnpm lint
pnpm format
```

- Add/update tests when contributing new features or fixes.
- Run tests with:
  ```bash
  pnpm test
  ```

## General Guidelines

- Keep functions and modules small, focused, and framework-agnostic.
- Write descriptive comments for complex logic.
- Update documentation (`README.md` or JSDoc) for new features.
- Optimize for performance (particle count, canvas size, etc.).

## Communication

- Use GitHub Issues for discussions before starting major changes.
- Be respectful and constructive when giving feedback.
- Remember: contributors may have different experience levels.

---

💡 **Thank You!**  
Whether it's fixing bugs, improving docs, or adding new effects, your contributions help make **particleFx** better for everyone! 🚀