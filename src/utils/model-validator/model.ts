
export type Model = {
  [key: string]: ModelProp;
};

export type ModelProp = DatabaseProp & ValidateProp & ValidateInfoProp

interface DatabaseProp {
  primaryKey?: boolean;
  column?: string;
}

export interface ValidateProp {
  type?: Type;
  length?: number;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  required?: boolean;
  expectedValues?: [];
  from?: Date;
  to?: Date;
}

export interface ValidateInfoProp {
  err?: string;
}

type Type =
  | "string"
  | "email"
  | "phone"
  | "integer"
  | "number"
  | "decimal"
  | "numeric"
  | "date"
  | "timestamp"
  | "enum";

export type ErrorMsgs = {
  [key: string]: ErrMsg;
};

type ErrMsg = {
  code?: number; // http status code
  field?: string; // field violate error
  param?: string; // value
  msg?: string; // error message detail
};

export type DefaultErrs = Record<keyof ValidateProp, string>;
