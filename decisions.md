## Decisions & Improvements

- I started by reviewing the overall structure of the project and decided to restructure it by separating folders in a format I consider ideal for React: `pages`, `components`, `api`, etc.
- I reviewed the `api.users.ts` code and noticed it was performing a single unfiltered query to the database, which can lead to performance issues on large datasets. I refactored the API to support pagination, ordering, and limiting using `limit`, `offset`, and `orderBy` parameters. I also split the logic into smaller functions based on responsibility to improve readability.
- I created TypeScript types and interfaces to enforce better contracts in the API, and enums for standardized error messages.
- On the frontend, I split the main component and declared it in `routes.ts`. I then created smaller components based on responsibility: `Pagination`, `SearchBar`, and `UserCard`. I chose to display user data as cards instead of a table for aesthetic reasons and to avoid relying on external table libraries, which would have better usability but add complexity. Pagination was implemented manually.
- I redesigned the page to follow modern UI patterns, removing harsh colors and non-intuitive error messages, resulting in a clean and easy-to-use interface.
- I used Tailwind CSS utility classes throughout the project and ensured the layout was responsive across screen sizes.

## Future Improvements

- For a more robust architecture, separate the backend and frontend and introduce a BFF (Backend-for-Frontend) layer instead of directly accessing Prisma modules from the frontend.
- Add unit tests for the API.
- Integrate Swagger for well-documented API routes.
- Implement JWT-based authentication.
- Define a consistent design system with primary, secondary, and semantic color tokens.
- Create pattern to routing API'S calls in frontend components.