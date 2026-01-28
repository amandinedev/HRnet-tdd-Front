import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputText from '../components/InputText/InputText';

describe('InputText', () => {
  it('renders label and input correctly', () => {
    const handleChange = vi.fn(); // Use Vitest's mock function
    render(<InputText label="First Name" id="first-name" name="firstName" onChange={handleChange} />);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders error message when value is empty and field is submitted', () => {
    const handleChange = vi.fn(); 
    render(
        <InputText  label="First Name" id="firstName" name="firstName"  value="" handleChange={handleChange} submitted={true} />
    );
    // Simulate form submission without entering a value
    screen.getByLabelText(/First Name/i).blur();

    userEvent.click(document.body); // Trigger blur event

    expect(screen.getByText('Please fill in this field')).toBeInTheDocument();
  });

  it('does not render error message when field is filled', () => {
    const handleChange = vi.fn(); 
    render(<InputText label="First Name" id="firstName" name="firstName" value="John" onChange={handleChange} />);

    // Simulate form submission with a value
    screen.getByLabelText(/First Name/i).blur();

    expect(screen.queryByText('Please fill in this field')).not.toBeInTheDocument();
  });
});