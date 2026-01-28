import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      dateOfBirth: "1990-01-01",
      startDate: "2023-01-01",
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zipCode: "12345",
      department: "Engineering",
    },
  ],
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployeeStart(state) {},

    addEmployeeSuccess(employeeState, action) {
      const {
        id,
        firstName,
        lastName,
        dateOfBirth,
        startDate,
        street,
        city,
        state,
        zipCode,
        department,
      } = action.payload;

      employeeState.list.push({
        id,
        firstName,
        lastName,
        dateOfBirth,
        startDate,
        street,
        city,
        state,
        zipCode: String(zipCode),
        department,
      });
    },

    addEmployeeFailed(state, action) {
      console.error("Failed to add employee:", action.payload);
    },
  },
});

export const { addEmployeeStart, addEmployeeSuccess, addEmployeeFailed } =
  employeeSlice.actions;
export default employeeSlice.reducer;
