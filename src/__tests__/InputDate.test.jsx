import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DatePicker from 'react-datepicker';
import InputDate from '../components/InputDate/InputDate'; // Adjust the import path accordingly
import 'react-datepicker/dist/react-datepicker.css';

describe('InputDate', () => {
  it('renders label and date picker correctly', () => {
    render(<InputDate id="date-of-birth" />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('shows error message for field submitted without value', async () => {
    const handleChange = vi.fn();

    render(
      <div>
        <label htmlFor="date-of-birth">Date of Birth</label>
        <InputDate id="date-of-birth" dateValue={null} handleChange={handleChange} submitted={true} />
      </div>
    );

    // Simulate blur event
    screen.getByRole('textbox').blur();
    userEvent.click(document.body); // Trigger blur event

    expect(screen.getByText('Please select a date')).toBeInTheDocument();
  });

  it('does not show error message when date is selected', () => {
    const handleChange = vi.fn();

    render(
      <div>
        <label htmlFor="date-of-birth">Date of Birth</label>
        <InputDate id="date-of-birth" dateValue={new Date()} handleChange={handleChange} submitted={true} />
      </div>
    );

    expect(screen.queryByText('Please select a date')).not.toBeInTheDocument();
  });
});