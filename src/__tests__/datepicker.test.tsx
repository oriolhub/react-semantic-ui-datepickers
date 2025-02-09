import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { SemanticDatepickerProps } from '../types';
import localeEn from '../locales/en-US.json';
import localePt from '../locales/pt-BR.json';
import DatePicker from '../';

const setup = (props?: Partial<SemanticDatepickerProps>) => {
  const options = render(<DatePicker onDateChange={jest.fn()} {...props} />);

  return {
    ...options,
    openDatePicker: () => {
      const icon = options.getByTestId('datepicker-icon');

      fireEvent.click(icon);
    },
    rerender: (newProps?: Partial<SemanticDatepickerProps>) =>
      options.rerender(
        <DatePicker onDateChange={jest.fn()} {...props} {...newProps} />
      ),
  };
};

describe('Basic datepicker', () => {
  it('renders', () => {
    expect(setup()).toBeTruthy();
  });

  it('updates the locale if the prop changes', async () => {
    const { getByTestId, openDatePicker, rerender } = setup();

    openDatePicker();

    const todayButton = getByTestId('datepicker-today-button');

    expect(todayButton.textContent).toBe(localeEn.todayButton);

    rerender({ locale: 'pt-BR' });

    expect(todayButton.textContent).toBe(localePt.todayButton);
  });

  it('fallbacks the locale to `en-US` when it has invalid value', async () => {
    const { getByTestId, openDatePicker, rerender } = setup();

    openDatePicker();

    const todayButton = getByTestId('datepicker-today-button');

    expect(todayButton.textContent).toBe(localeEn.todayButton);

    // @ts-ignore
    rerender({ locale: 'invalid' });

    expect(todayButton.textContent).toBe(localeEn.todayButton);
  });
});

describe('Range datepicker', () => {
  it('renders', () => {
    expect(setup({ type: 'range' })).toBeTruthy();
  });

  it('updates the locale if the prop changes', async () => {
    const { getByTestId, openDatePicker, rerender } = setup({ type: 'range' });

    openDatePicker();

    const todayButton = getByTestId('datepicker-today-button');

    expect(todayButton.textContent).toBe(localeEn.todayButton);

    rerender({ locale: 'pt-BR' });

    expect(todayButton.textContent).toBe(localePt.todayButton);
  });

  it('fallbacks the locale to `en-US` when it has invalid value', async () => {
    const { getByTestId, openDatePicker, rerender } = setup({ type: 'range' });

    openDatePicker();

    const todayButton = getByTestId('datepicker-today-button');

    expect(todayButton.textContent).toBe(localeEn.todayButton);

    // @ts-ignore
    rerender({ locale: 'invalid language' });

    expect(todayButton.textContent).toBe(localeEn.todayButton);
  });
});
