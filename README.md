# Fireflies.ai backend test


This project looks awful, somebody really messed it up. Can you help us fixing it?


## Instructions

### Project Setup:

* Clone the provided repository and set up the project.
* Organize the project structure to improve maintainability (if you think it's necessary).
* Add basic error handling and input validation to all endpoints.
* It seems there is a very critical bug here. Can you spot it?
* Also, it doesn't look very performant as the meeting count gets bigger.
* (Bonus) Implement basic unit tests for at least one endpoint.

### API

By the end of the projects, we should have the following endpoints implemented and working:

* `GET /api/meetings`
Retrieves all the meetings.

* `POST /api/meetings`
Create a new meeting with title, date, and participants.

* `GET /api/meetings/:id`
Retrieve a specific meeting by ID. Include it's tasks.

* `PUT /api/meetings/:id/transcript`
Update a meeting with its transcript.

* `POST /api/meetings/:id/summarize`
Generate a summary and action items for a meeting (you can use a mock AI service for this).
Once the AI service returns the action items, you should automatically create the tasks for this meeting.

* `GET /api/tasks`
Returns all the tasks assigned to the user

* `GET /api/meetings/stats`
Return statistics about meetings, such as the total number of meetings, average number of participants, and most frequent participants.
Please follow the data structure defined in the router file.

* (Bonus) `GET /api/dashboard`
Return a summary of the user's meetings and tasks


## Evaluation Criteria:

We want to be impressed by your attention to details, but some points that will be evaluated are:

* Code quality and organization - we can only scale if we have high quality, maintainable code 
* Ability to identify and fix the existing bug - some bugs would be a disaster for the company
* Correct implementation of CRUD operations with MongoDB
* Implementation of the stats (and the bonus, dashboard) endpoints using performant, aggregation queries
* Error handling and input validation
* Bonus points for unit tests or any additional features related to the AI bot concept
