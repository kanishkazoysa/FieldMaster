import { useEffect, useState, useRef } from 'react';
import Validator, { ValidatorOption, Values } from 'validator.tool';

export * from 'validator.tool';
export interface UseValidator extends ValidatorOption {}
export function useValidator(props: UseValidator = {}) {
  const validator = useRef<Validator>(new Validator({ ...props }));
  const [upState, forceUpdate] = useState(0);

  useEffect(() => {
    if (validator.current && props.form) {
      validator.current.setForm(props.form);
    }
  }, [props.form, validator.current]);

  const handleForceUpdate = () => forceUpdate(upState + 1);
  const handleSubmit = (handle?: (value: Values, valid: boolean) => void) => (evn: React.FormEvent<HTMLFormElement>) => {
    evn && evn.preventDefault();
    validator.current.showMessages();
    forceUpdate(upState + 1);
    if (handle) {
      const valid = validator.current.allValid();
      handle({ ...validator.current.values }, valid);
    }
  }
  const handleReset = (handle?: (value: Values) => void) => (evn: React.FormEvent<HTMLFormElement>) => {
    validator.current.hideMessages();
    const val = validator.current.reset();
    handle && handle(val);
  }
  return {
    validator: validator.current,
    forceUpdate: handleForceUpdate,
    /** Only `Form` Support */
    handleSubmit,
    /** Only `Form` Support */
    handleReset,
  }
}