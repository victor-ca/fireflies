# Fireflies.ai backend test

This project looks awful, somebody really messed it up. Can you help us fix it?

## Instructions

Create a fork of this repository, and set up the project locally.
Ensure that you have MongoDB running locally, and node v22.

```
npm i
npm run seed
npm start
```

### Project Setup:

- Organize the project structure to improve maintainability (if you think it's necessary).
- Add basic error handling and input validation to all endpoints.
- It seems there is a very critical bug here. Can you spot it?
- Also, it doesn't look very performant as the meeting count increases. Would it scale?
- (Bonus) Implement basic unit tests for at least one endpoint.

It should not take you more than **2-3 hours** to implement this.

### API

By the end of the project, we should have the following endpoints implemented:

- `GET /api/meetings` - Retrieves all the meetings for the user.

- `POST /api/meetings` - Create a new meeting with title, date, and participants.

- `GET /api/meetings/:id` - Retrieve a specific meeting by ID. Include its tasks.

- `PUT /api/meetings/:id/transcript` - Update a meeting with its transcript.

- `POST /api/meetings/:id/summarize` - Generate a summary and action items for a meeting (you can use a mock AI service for this).
  Once the AI service returns the action items, you should automatically create the tasks for this meeting.

- `GET /api/tasks` - Returns all the tasks assigned to the user

- `GET /api/meetings/stats` - Return statistics about meetings, such as the total number of meetings, average number of participants, and most frequent participants.
  Please follow the data structure defined in the router file.

- (Bonus) `GET /api/dashboard`

Return a summary of the user's meetings, including count and upcoming meetings, task counts by status, and past due tasks. The data structure is also defined in the endpoint file.

### Containerize it!

You should add a Dockerfile and include clear instructions about how to run this on our local environment. The easier, the better.
In order to evaluate it, we'll run it on our local hosts, seeding with known data and will compare the output of the requested endpoints.

## Evaluation Criteria:

We want you to impress us with your attention to detail, but some points that will be evaluated are:

- Documentation - clear instructions on a README file are the other developer's best friend.
- Code quality and organization - we can only scale if we have high-quality, maintainable code
- Ability to identify and fix the existing bug - security bugs would be a disaster for the company
- Implementation of the stats (and the bonus, dashboard) endpoints using performant, aggregation queries
- Error handling and input validation
- Bonus points for unit tests or any additional features related to the AI bot concept
