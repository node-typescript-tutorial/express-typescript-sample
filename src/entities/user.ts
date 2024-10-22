import { Model } from "../utils/model-validator/model";

export interface User {
  id: string;
  name: string;
}

export const userModel: Model = {
  id: {
    column: "id",
    primaryKey: true,
    type: "string",
    required: true,
  },
  name: {
    required: true,
    column: "name",
    type: "string",
  },
};
