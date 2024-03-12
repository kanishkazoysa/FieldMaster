export type Value = (number | FormDataEntryValue)[] | number | boolean | null | FormDataEntryValue;
export type Values = Partial<Record<string, Value>>;
export type Fields = Partial<Record<string, boolean>>;
export type Rules = Partial<Record<string, RulesOption>>;

export interface RulesOption {
  /** Validate the form's values with function. */
  validate?(value?: Value, values?: Validator['values'], field?: string): string;
}

export type ValidatorOption = {
  messagesShown?: boolean;
  rules?: Rules;
  initValues?: Values;
  form?: HTMLFormElement | null;
  validate?: RulesOption['validate'];
}

export default class Validator {
  constructor(options: ValidatorOption = {}) {
    const { form, rules, initValues, messagesShown, validate } = options;
    this.messagesShown = !!messagesShown;
    this.rules = rules || {};
    this.validate = validate;
    if (initValues) {
      this.values = { ...initValues };
      this.initValues = { ...initValues };
    }
    if (form) {
      this.setForm(form);
    }
  }
  validate?: RulesOption['validate'];
  form?: HTMLFormElement | null;
  fields: Fields = {};
  rules: Rules = {};
  values: Values = {};
  initValues?: Values;
  set resetInitValue(val: Values) {
    this.initValues = val;
    if (this.form) {
      this.setForm(this.form);
    }
  }
  messagesShown: boolean = false;
  errorMessages: Partial<Record<string, string>> = {};
  showMessages = () => this.messagesShown = true;
  hideMessages = () => this.messagesShown = false;
  getForm = () => this.form;
  setForm = (form: HTMLFormElement) => {
    this.form = form;
    this.values = {};
    const formData = new FormData(this.form);
    formData.forEach((value, key) => {
      const valArr = formData.getAll(key);
      const elm: HTMLInputElement = this.form![key];
      if (elm) {
        if (elm.type === 'checkbox') {
          this.values[key] = elm.checked;
        } else if (elm.multiple) {
          this.values[key] = valArr;
        } else if (elm.type) {
          this.values[key] = formData.get(key);
        } else if (valArr.length > 0 && !elm.value) {
          this.values[key] = valArr;
        } else {
          this.values[key] = elm.value;
        }
      }
      this.message(key, this.values[key], this.rules[key]);
    });
    if (!this.initValues) {
      this.initValues = this.values;
    }
  };
  /** How you define validation rules and add messages into the form. */
  message = (field: string, inputValue?: Value, options?: RulesOption) => {
    this.fields[field] = true;
    this.values[field] = inputValue;
    if (options) {
      this.rules[field] = options;
    }
    const { validate } = this.rules[field] || {};
    let msg: string = '';
    if (this.validate) {
      msg = this.validate(this.values[field], this.values, field);
    }
    if (validate) {
      msg = validate(this.values[field], this.values, field);
    }
    if (!msg) {
      delete this.errorMessages[field];
    } else {
      this.fields[field] = false;
      this.errorMessages[field] = msg;
    }
    if (this.messagesShown) {
      return this.errorMessages[field];
    }
    return;
  };
  setValues = (values: Values = {}) => {
    if (!this.form) {
      for (let val in values) {
        this.message(val, values[val]);
      }
    }
  }
  getValues = (): Values => {
    if (this.form) {
      this.setForm(this.form);
    }
    return this.values;
  }
  reset = (): Values => {
    this.values = { ...this.initValues };
    this.errorMessages = {};
    this.messagesShown = false;
    this.fields = {};
    if (this.form) {
      this.form.reset();
    };
    return { ...this.values };
  }
  fieldValid = (field: string) => this.fields[field] === true;
  /**
   * Returns a boolean if all the fields pass validation or not.
   * @returns Boolean
   */
  allValid() {
    for (var key in this.values) {
      this.message(key, this.values[key], this.rules[key]);
    }
    for (let key in this.fields) {
      if (this.fieldValid(key) === false) {
        return false;
      }
    }
    return true;
  }
}
