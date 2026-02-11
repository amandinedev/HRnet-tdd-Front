import React from 'react';
import { render, screen } from '@testing-library/react';
import InputDate from '../components/InputDate/InputDate';

describe('InputDate', () => {
  // Test basic rendering
  it('renders with label and placeholder', () => {
    const handleChange = vi.fn();
    
    render(
      <InputDate 
        label="Date of Birth" 
        dateValue={null} 
        handleChange={handleChange}
        submitted={false}
        required={true}
      />
    );

    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Select a date')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  // Test error states
  it('shows error when submitted with null value and required', () => {
    const handleChange = vi.fn();

    const { rerender } = render(
      <InputDate 
        label="Date of Birth" 
        dateValue={null} 
        handleChange={handleChange}
        submitted={false}
        required={true}
      />
    );

    // No error initially
    expect(screen.queryByText('Please select a date')).not.toBeInTheDocument();

    // Rerender with submitted=true
    rerender(
      <InputDate 
        label="Date of Birth" 
        dateValue={null} 
        handleChange={handleChange}
        submitted={true}
        required={true}
      />
    );

    // Error shows after submission
    expect(screen.getByText('Please select a date')).toBeInTheDocument();
  });

  it('does not show error when date has value', () => {
    const handleChange = vi.fn();
    const testDate = new Date('2023-01-01');

    render(
      <InputDate 
        label="Date of Birth" 
        dateValue={testDate} 
        handleChange={handleChange}
        submitted={true}
        required={true}
      />
    );

    expect(screen.queryByText('Please select a date')).not.toBeInTheDocument();
  });

  it('does not show error when not required', () => {
    const handleChange = vi.fn();

    render(
      <InputDate 
        label="Date of Birth" 
        dateValue={null} 
        handleChange={handleChange}
        submitted={true}
        required={false}
      />
    );

    expect(screen.queryByText('Please select a date')).not.toBeInTheDocument();
  });

});