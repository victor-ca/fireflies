Done

- the backend tasks and a simple frontend
- simple routes - logic in services, validation and error handling in middleware(s)
- restructured the project to what i hope is more readable and maintainable
- disconnected the models from Mongoose - to allow for different databases and avoid tainting the model with mongoose props
- some services may force authorization checks even if superfluous - so when used later, one does not have to remember or is forced to make the check
- added two very basic tests

Not addressed:

- pagination (would be required as the data grows)
- add meeting Start and End times (needed for the summary) - and respectively removed the props from summary
- front optimizations (eg. useMemo on dashboard when grouping)
- touch the auth (which can barely be called that), i'm also saving it to the insecure local store.
- leverage dotenv for neither frontend and backend urls
- use a 3rd project for model sharing between backend and frontend (copy-pasted the models)
- proper styling (relied on id's for styling and no component library used)
- serve the frontend as standalone (or as static files from backend) in the dokerized version of the project

Assumptions:

- `GET /api/meetings/:id` - it's not specified to retrieve own or all tasks - now only takes owned ones.
- `POST /api/meetings/:id/summarize` - not clear who's invoking it. assumed not the user - so not secured.
