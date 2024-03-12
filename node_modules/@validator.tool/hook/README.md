@validator.tool/hook
===

[![Build & Deploy](https://github.com/jaywcjlove/validator.js/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/validator.js/actions/workflows/ci.yml)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@validator.tool/hook)](https://bundlephobia.com/package/@validator.tool/hook)
[![npm version](https://img.shields.io/npm/v/@validator.tool/hook.svg)](https://www.npmjs.com/package/@validator.tool/hook)
[![Coverage Status](https://jaywcjlove.github.io/validator.js/coverage/badges.svg)](https://jaywcjlove.github.io/validator.js/coverage/lcov-report)

Hooks for use with `validator.tool`.

## Install

```bash
$ npm install @validator.tool/hook --save
```

## Usage

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?logo=codesandbox)](https://codesandbox.io/embed/validator-js-support-hook-andras-dbzbz-dbzbz?fontsize=14&hidenavigation=1&theme=dark)

```jsx
import { useEffect, useState, Fragment } from 'react';
import { useValidator } from '@validator.tool/hook';

export default function Demo() {
  const [data, setData] = useState({
    email: 'kennyiseeyou@gmail.com'
  });
  const { validator, handleReset, handleSubmit } = useValidator({
    initValues: data,
  });

  const onSubmit = (value) => {
    console.log('value', value)
  }

  const onReset = (value) => {
    setData({ ...value });
  }

  function handleChange(env) {
    const target = env.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setData({ ...data, [name]: value });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={handleReset(onReset)}
      onChange={handleChange}
      onBlur={handleChange}
    >
      <div>
        <label htmlFor="email">EMail:</label>
        <input type="email" name="email" defaultValue={data.email} />
        <span>
          {validator.message('email', data.email, {
            validate: (val) => !/^[A-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val) ? `The ${val} must be a valid email address.` : ''
          })}
        </span>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <span>
          {validator.message('password', data.password, {
            validate: (val) => !val ? 'Please enter the password!' : ''
          })}
        </span>
      </div>
      <div style={{ width: '100%' }}>
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  );
}
```

## API

```ts
import Validator, { ValidatorOption, Values } from 'validator.tool';
export * from 'validator.tool';
export interface UseValidator extends ValidatorOption {}
export declare function useValidator(props?: UseValidator): {
  validator: Validator;
  forceUpdate: () => void;
  /** Only `Form` Support */
  handleSubmit: (handle?: ((value: Values, valid: boolean) => void) | undefined) => (evn: React.FormEvent<HTMLFormElement>) => void;
  /** Only `Form` Support */
  handleReset: (handle?: ((value: Values) => void) | undefined) => (evn: React.FormEvent<HTMLFormElement>) => void;
};
```

## Related

- [validator.tool](https://github.com/jaywcjlove/validator.js) Lightweight JavaScript form validation, that had minimal configuration and felt natural to use.

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
