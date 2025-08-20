# Contributing to Karni Interiors

We love your input! We want to make contributing to Karni Interiors as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to sync code to and from GitHub. All changes happen through pull requests.

### Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

### Development Setup

1. Clone your fork of the repository
2. Install dependencies: `npm install`
3. Copy environment variables: `cp .env.example .env.local`
4. Set up your database and update `DATABASE_URL` in `.env.local`
5. Run migrations: `npx prisma migrate dev`
6. Seed the database: `npx prisma db seed`
7. Start the development server: `npm run dev`

### Code Style

We use ESLint and Prettier to maintain code quality and consistency.

- Run `npm run lint` to check for linting errors
- Run `npm run lint:fix` to automatically fix linting issues
- Code is automatically formatted with Prettier on commit

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools

### Testing

- Write tests for new features and bug fixes
- Run the full test suite with `npm test`
- Run specific tests with `npm test -- --testNamePattern="YourTestName"`

## Any contributions you make will be under the MIT Software License

When you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project.

## Report bugs using GitHub Issues

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourname/karni-interiors/issues).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We welcome feature requests! Please provide:

- A clear and detailed explanation of the feature
- Why you think it would be useful
- How it should work
- Any examples or mockups if applicable

## Questions?

Feel free to contact the maintainers if you have any questions. We're here to help!

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
