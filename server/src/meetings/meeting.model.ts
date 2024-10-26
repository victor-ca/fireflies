import { body } from "express-validator";
import { validate } from "../utils/validation.js";
export interface IMeeting {
  userId: string;
  title: string;
  date: Date;
  participants: string[];
  transcript: string;
  summary: string;
  actionItems: string[];
}
export interface IMeetingWithId extends IMeeting {
  id: string;
}

const meetingCreationFields = [
  "title",
  "date",
  "participants",
] as const satisfies (keyof IMeeting)[];

type MeetingCreationFields = (typeof meetingCreationFields)[number];
export type IMeetingCreateRequest = Pick<IMeeting, MeetingCreationFields>;

type KeyGuard = MeetingCreationFields | `${MeetingCreationFields}.*`;
export const validateMeetingCreation = validate([
  body("title" satisfies KeyGuard)
    .isString()
    .notEmpty()
    .withMessage("Title is required"),

  body("date" satisfies KeyGuard)
    .isISO8601()
    .toDate()
    .withMessage("Valid date is required"),

  body("participants" satisfies KeyGuard)
    .isArray()
    .withMessage("Participants should be an array"),

  body("participants.*" satisfies KeyGuard)
    .isString()
    .withMessage("Each participant should be a string"),

  body()
    .custom((value, { req }) => {
      const extraFields = Object.keys(req.body).filter(
        (field) =>
          !meetingCreationFields.includes(field as MeetingCreationFields)
      );
      if (extraFields.length > 0) {
        throw new Error(`Unexpected fields: ${extraFields.join(", ")}`);
      }
      return true;
    })
    .withMessage("Extra properties are not allowed"),
]);
