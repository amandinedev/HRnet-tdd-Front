import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeFailed,
} from "../../reduxFeatures/employeeSlice";

import InputText from "../InputText/InputText";
import InputDate from "../InputDate/InputDate";
import InputSelect from "../InputSelect/InputSelect";
import { departments, states } from "../../constants";
import styles from "./EmployeeForm.module.scss";

const EmployeeForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    startDate: null,
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChangeInputText = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeInputSelect = (label, selectedValue) => {
    setFormData({
      ...formData,
      [label]: selectedValue,
    });
  };

  const handleChangeInputDate = (dateField, date) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : null;
    setFormData({
      ...formData,
      [dateField]: formattedDate,
    });
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "street",
      "city",
      "state",
      "zipCode",
      "department",
    ];
    const dateFields = ["dateOfBirth", "startDate"];

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        return false;
      }
    }

    for (let dateField of dateFields) {
      if (!formData[dateField]) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = validateForm();

    if (!isValid) {
      setSubmitted(true);
      console.log("Form validation failed", formData);
      return;
    }

    try {
      dispatch(addEmployeeStart());

      // Add employee to the store
      const newEmployee = {
        ...formData,
        id: Date.now(),
      };

      console.log("Dispatching employee:", newEmployee);
      dispatch(addEmployeeSuccess(newEmployee));

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        startDate: null,
        street: "",
        city: "",
        state: "",
        zipCode: "",
        department: "",
      });
      setSubmitted(false);
    } catch (err) {
      console.error("Error adding employee:", err);
      dispatch(addEmployeeFailed(err.message));
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <InputText
        label="First Name"
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChangeInputText}
        submitted={submitted}
      />
      <InputText
        label="Last Name"
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChangeInputText}
        submitted={submitted}
      />
      <InputDate
        label="Date of Birth"
        dateValue={formData.dateOfBirth}
        handleChange={(date) => handleChangeInputDate("dateOfBirth", date)}
        submitted={submitted}
      />
      <InputDate
        label="Start Date"
        dateValue={formData.startDate}
        handleChange={(date) => handleChangeInputDate("startDate", date)}
        submitted={submitted}
      />
      <fieldset className="address">
        <legend>Address</legend>
        <InputText
          label="Street"
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChangeInputText}
          submitted={submitted}
        />
        <InputText
          label="City"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChangeInputText}
          submitted={submitted}
        />
        <InputSelect
          label="State"
          data={states}
          selectedValue={formData.state}
          handleChange={(selected) =>
            handleChangeInputSelect("state", selected)
          }
          submitted={submitted}
        />
        <InputText
          label="Zip Code"
          id="zipCode"
          name="zipCode"
          type="number"
          value={formData.zipCode}
          onChange={handleChangeInputText}
          submitted={submitted}
        />
      </fieldset>
      <InputSelect
        label="Department"
        data={departments}
        selectedValue={formData.department}
        handleChange={(selected) =>
          handleChangeInputSelect("department", selected)
        }
        submitted={submitted}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default EmployeeForm;
