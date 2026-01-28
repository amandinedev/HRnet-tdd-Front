import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EmployeeForm from '../components/EmployeeForm/EmployeeForm';

const mockStore = configureStore([]);

describe('EmployeeForm', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      employees: {
        list: [],
        status: 'idle',
        error: null,
      },
    });
  });

  it('renders form fields correctly', () => {
    render(
      <Provider store={store}>
        <EmployeeForm />
      </Provider>
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zip Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
  });

  it('shows error messages for required fields when submitting an empty form', () => {
    render(
      <Provider store={store}>
        <EmployeeForm />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    expect(screen.getAllByText(/This field is required/i)).toHaveLength(9); // Adjust according to the number of required fields
  });

  it('submits form successfully with valid data', async () => {
    render(
      <Provider store={store}>
        <EmployeeForm />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1980-01-01' } });
    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: '2023-06-01' } });
    fireEvent.change(screen.getByLabelText(/Street/i), { target: { value: '123 Street' } });
    fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Some City' } });
    fireEvent.change(screen.getByLabelText(/State/i), { target: { value: 'California' } }); // Adjust according to your state options
    fireEvent.change(screen.getByLabelText(/Zip Code/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/Department/i), { target: { value: 'Engineering' } });

    fireEvent.click(screen.getByRole('button', { name: /Save/i }));

    expect(store.getActions()).toContainEqual({ type: 'employees/addEmployeeStart' });
    // Adjust according to your success action
  });
});