import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addEmployeeStart,
  addEmployeeSuccess,
  addEmployeeFailed,
} from "../../reduxFeatures/employeeSlice";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import InputDate from "../InputDate/InputDate";
import InputSelect from "../InputSelect/InputSelect";
import Modal from "../Modal/Modal";
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
  const [showModal, setShowModal] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    street: "",  // ADDED THIS
    zipCode: "",
  });

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Please fill in this field";
    const nameRegex = /^[\p{Letter}\s\-.']+$/u;
    if (!nameRegex.test(name)) return "Only letters, hyphens, apostrophes, and spaces are allowed";
    return "";
  };

  const validateStreet = (street) => {
    if (!street.trim()) return "Please fill in this field";
    const streetRegex = /^[\p{Letter}\p{N}\s\-,.'#&()/_@%!?:;"+=]+$/u;
    if (!streetRegex.test(street))
      return "Invalid street address. Use only letters, numbers, spaces, and common punctuation (,.-'#&/)";
    return "";
  };

const validateCity = (city) => {
  if (!city.trim()) return "Please fill in this field";
  const cityRegex = /^[\p{Letter}\s\-.'()]+$/u;
  if (!cityRegex.test(city))
    return "Invalid city name. Use only letters, spaces, hyphens, apostrophes, and periods.";
  return "";
};

  const validateZipCode = (zipCode) => {
    if (!zipCode.trim()) return "Zip code is required";
    const zipRegex = /^(?:\d{5}|\d{5}-\d{4})$/;
    if (!zipRegex.test(zipCode)) return "Please enter a valid zip code (5 digits or 5+4 format)";
    return "";
  };

  // Event handlers
  const handleChangeInputText = (e) => {
    const { name, value } = e.target;

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeInputSelect = (label, selectedValue) => {
    setFormData((prev) => ({
      ...prev,
      [label]: selectedValue,
    }));
  };

  const handleChangeInputDate = (dateField, date) => {
    const formattedDate = date ? date.toISOString().split("T")[0] : null;
    setFormData((prev) => ({
      ...prev,
      [dateField]: formattedDate,
    }));
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const firstNameError = validateName(formData.firstName);
    const lastNameError = validateName(formData.lastName);
    const streetError = validateStreet(formData.street); 
    const cityError = validateCity(formData.city);
    const zipCodeError = validateZipCode(formData.zipCode);

    // Check other required fields
    const requiredFields = ["state", "department"]; 
    let hasRequiredFieldError = false;

    for (let field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        hasRequiredFieldError = true;
        break;
      }
    }

    // Check date fields
    if (!formData.dateOfBirth || !formData.startDate) {
      hasRequiredFieldError = true;
    }

    // Set errors if any
    if (firstNameError || lastNameError || streetError || zipCodeError || hasRequiredFieldError) {
      setFieldErrors({
        firstName: firstNameError,
        lastName: lastNameError,
        street: streetError,  
        city: cityError,
        zipCode: zipCodeError,
      });
      return;
    }

    try {
      dispatch(addEmployeeStart());

      const newEmployee = {
        ...formData,
        id: Date.now(),
      };

      dispatch(addEmployeeSuccess(newEmployee));

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
      setFieldErrors({
        firstName: "",
        lastName: "",
        street: "",  // ADDED THIS
        zipCode: "",
      });
      setShowModal(true);
    } catch (err) {
      dispatch(addEmployeeFailed(err.message));
    }
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <InputText
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChangeInputText}
          submitted={submitted}
          error={fieldErrors.firstName}
          required={true}
        />
        <InputText
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChangeInputText}
          submitted={submitted}
          error={fieldErrors.lastName}
          required={true}
        />
        <InputDate
          label="Date of Birth"
          dateValue={formData.dateOfBirth}
          handleChange={(date) => handleChangeInputDate("dateOfBirth", date)}
          submitted={submitted}
          required={true}
        />
        <InputDate
          label="Start Date"
          dateValue={formData.startDate}
          handleChange={(date) => handleChangeInputDate("startDate", date)}
          submitted={submitted}
          required={true}
        />
        <fieldset className="address">
          <legend>Address</legend>
          <InputText
            label="Street"
            name="street"
            value={formData.street}
            onChange={handleChangeInputText}
            submitted={submitted}
            error={fieldErrors.street}  // ADDED THIS
            required={true}
          />
          <InputText
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChangeInputText}
            submitted={submitted}
            required={true}
          />
          <InputSelect
            label="State"
            data={states}
            selectedValue={formData.state}
            handleChange={(selected) => handleChangeInputSelect("state", selected)}
            submitted={submitted}
            required={true}
          />
          <InputText
            label="Zip Code"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={handleChangeInputText}
            submitted={submitted}
            error={fieldErrors.zipCode}
            placeholder="12345 or 12345-6789"
            required={true}
          />
        </fieldset>
        <InputSelect
          label="Department"
          data={departments}
          selectedValue={formData.department}
          handleChange={(selected) => handleChangeInputSelect("department", selected)}
          submitted={submitted}
          required={true}
        />
        <Button type="submit">Save</Button>
      </form>
      <Modal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default EmployeeForm;