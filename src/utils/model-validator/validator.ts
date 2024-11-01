import { DefaultErrs, ErrorMsgs, Model, ModelProp } from "./model";

const defaultErrMsgs: DefaultErrs = {
  length: "length must be equal {0}",
  minLength: "length must be greater than or equal {0}",
  maxLength: "length must be less than or equal {0}",
  required: "field is required",
  type: "invalid type",
  expectedValues: "wrong value",
  min: "value must be greater than or equal {0}",
  max: "value must be less than or equal {0}",
  from: "",
  to: ""};

export function validate(model: Model, obj: Record<string, any>, notValidateRequired: boolean = false): ErrorMsgs | null {
  const errs: ErrorMsgs = {};
  const keys = Object.keys(model);
  keys.forEach((element) => {
    const p = model[element];
    if(p.required && notValidateRequired){
      //continue
    } else if (
      p.required &&
      (obj[element] == undefined ||
        (p.type === "string" &&
          String(obj[element]).length == 0))
    ) {
      errs[element] = {
        code: 422,
        field: element,
        msg: p.err ?? defaultErrMsgs.required,
      };
    } else {
      switch (p.type) {
        case "string":
          const pv = String(obj[element]);
          if (p.length && pv.length != p.length) {
            errs[element] = {
              code: 422,
              field: element,
              param: pv,
              msg: p.err ?? defaultErrMsgs.length,
            };
          } else if (p.minLength && pv.length < p.minLength) {
            errs[element] = {
              code: 422,
              field: element,
              param: pv,
              msg: p.err ?? defaultErrMsgs.minLength,
            };
          } else if (p.maxLength && pv.length > p.maxLength) {
            errs[element] = {
              code: 422,
              field: element,
              param: pv,
              msg: p.err ?? defaultErrMsgs.maxLength,
            };
          }

          break;
        case "integer":
          const v = Number(obj[element]);
          if (!Number.isInteger(v)) {
            errs[element] = {
              code: 422,
              field: element,
              param: `${v}`,
              msg: p.err ?? defaultErrMsgs.type,
            };
          } else if (p.min && v < p.min) {
            errs[element] = {
              code: 422,
              field: element,
              param: `${v}`,
              msg: p.err ?? defaultErrMsgs.min,
            };
          } else if (p.max && v > p.max) {
            errs[element] = {
              code: 422,
              field: element,
              param: `${v}`,
              msg: p.err ?? defaultErrMsgs.max,
            };
          }

          break;
        case "number":
          const vf = Number(obj[element as keyof object]);
          if (p.min && vf < p.min) {
            errs[element] = {
              code: 422,
              field: element,
              param: `${vf}`,
              msg: p.err ?? defaultErrMsgs.min,
            };
          } else if (p.max && vf > p.max) {
            errs[element] = {
              code: 422,
              field: element,
              param: `${vf}`,
              msg: p.err ?? defaultErrMsgs.max,
            };
          }
        
        case "date":
          const d = new Date(obj[element] as (number | string | Date));
          if (isNaN(d.getTime())) {
            errs[element] = {
              code: 422,
              field: element,
              param: `${obj[element]}`,
              msg: p.err ?? defaultErrMsgs.type,
            };
          } else {
          }

          break;

        case "phone":
          const phone = String(obj[element]);
          if (validatePhone(phone)) {
            errs[element] = {
              code: 422,
              field: element,
              param: `${obj[element]}`,
              msg: p.err ?? defaultErrMsgs.type,
            };
          }
          break;
        case "decimal":
          const decimal = String(obj[element]);
          if (validateDecimalNumber(decimal)) {
            errs[element] = {
              code: 422,
              field: element,
              param: `${obj[element]}`,
              msg: p.err ?? defaultErrMsgs.type,
            };
          }
        case "email":
          const e = String(obj[element]);
          if (validateEmail(e)) {
            errs[element] = {
              code: 422,
              field: element,
              param: `${obj[element]}`,
              msg: p.err ?? defaultErrMsgs.type,
            };
          }
          break;
        default:
          break;
      }
    }
  });

  return errs;
}

const validateEmail = (email: string) => {
  return email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// 10 digit
const validatePhone = (phone: string) => {
  return (phone.match(/\d/g) || []).length !== 10;
};

function validateDecimalNumber(input: string) {
  const isDecimal = input.match(/^-?\d*\.?\d+$/);
  return isDecimal !== null;
}
