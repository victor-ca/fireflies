Did:

- made routes simple - no logic inside, validation and error handling in middleware(s)
- disconnected the models from Mongoose - to allow for different databases
- split the logic in two - repo for persistence and service for business logic (and auth)
- services may force authorization checks even if superfluos - so when used later, one does not have to remember to check

Open questions:

- `GET /api/meetings/:id` - its not specified to retrieve own or all tasks - now only takes owned.
- `POST /api/meetings/:id/summarize` - not clear who's invoking it. assumed not the user - so not secured.

Did not do:

- pagination
- front optimizations (eg. useMemo on dashboard when grouping)
- touch the auth (which can barely be called auth), also saving it to the insecure local store.
- leverage .env for frontend and backend urls
- error and loading states on frontend
- proper styling (relied on id's for styling, no component library)
- serve the frontend as standalone (or as static files from backend) in the docker test
