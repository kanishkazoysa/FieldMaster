export declare type Value = (number | FormDataEntryValue)[] | number | boolean | null | FormDataEntryValue;
export declare type Values = Partial<Record<string, Value>>;
export declare type Fields = Partial<Record<string, boolean>>;
export declare type Rules = Partial<Record<string, RulesOption>>;
export interface RulesOption {
    /** Validate the form's values with function. */
    validate?(value?: Value, values?: Validator['values'], field?: string): string;
}
export declare type ValidatorOption = {
    messagesShown?: boolean;
    rules?: Rules;
    initValues?: Values;
    form?: HTMLFormElement | null;
    validate?: RulesOption['validate'];
};
export default class Validator {
    constructor(options?: ValidatorOption);
    validate?: RulesOption['validate'];
    form?: HTMLFormElement | null;
    fields: Fields;
    rules: Rules;
    values: Values;
    initValues?: Values;
    set resetInitValue(val: Values);
    messagesShown: boolean;
    errorMessages: Partial<Record<string, string>>;
    showMessages: () => boolean;
    hideMessages: () => boolean;
    getForm: () => HTMLFormElement | null | undefined;
    setForm: (form: HTMLFormElement) => void;
    /** How you define validation rules and add messages into the form. */
    message: (field: string, inputValue?: Value | undefined, options?: RulesOption | undefined) => string | undefined;
    setValues: (values?: Values) => void;
    getValues: () => Values;
    reset: () => Values;
    fieldValid: (field: string) => boolean;
    /**
     * Returns a boolean if all the fields pass validation or not.
     * @returns Boolean
     */
    allValid(): boolean;
}
