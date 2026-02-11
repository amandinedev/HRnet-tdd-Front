import { render, screen, fireEvent } from "@testing-library/react";
import InputSelect from "../components/InputSelect/InputSelect";

// Helper to match component's toCamelCase function
const toCamelCase = (str) => {
  return str
    .split(' ')
    .map((word, index) => 
      index === 0 
        ? word.toLowerCase() 
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');
};

describe("InputSelect Component", () => {
  const mockStates = [
    { name: "Alabama", abbreviation: "AL" },
    { name: "California", abbreviation: "CA" },
  ];

  it("renders trigger with label correctly", () => {
    render(
      <InputSelect
        data={mockStates}
        label="State"
        placeholder="Select an option"
        selectedValue=""
      />,
    );

    expect(screen.getByText("State")).toBeInTheDocument();

    // Use the dynamic test ID
    const testId = `input-select-trigger-${toCamelCase("State")}`;
    const trigger = screen.getByTestId(testId);
    expect(trigger).toBeInTheDocument();

    const buttonText = trigger.textContent || "";
    expect(buttonText).toContain("Select an option");
  });

  it("opens dropdown when clicked and displays options", () => {
    render(<InputSelect data={mockStates} label="State" placeholder="Select an option" />);

    // Get trigger with dynamic test ID
    const triggerTestId = `input-select-trigger-${toCamelCase("State")}`;
    const trigger = screen.getByTestId(triggerTestId);
    
    // Click the trigger button
    fireEvent.click(trigger);

    // Get the dropdown container with dynamic test ID
    const optionsTestId = `input-select-options-${toCamelCase("State")}`;
    const dropdown = screen.getByTestId(optionsTestId);
    expect(dropdown).toBeInTheDocument();
    
    // Get all option buttons
    const optionButtons = dropdown.querySelectorAll('button[role="option"]');
    expect(optionButtons).toHaveLength(3);
    
    // Convert to array and check text
    const options = Array.from(optionButtons).map(button => button.textContent);
    expect(options).toEqual(["Select an option", "Alabama", "California"]);
  });

  it("displays error if no option is selected when required and submitted", () => {
    const handleChange = vi.fn();
    render(
      <InputSelect
        data={mockStates}
        label="State"
        selectedValue=""
        handleChange={handleChange}
        required={true}
        submitted={true}
      />,
    );

    expect(screen.getByText(/Please select an option/i)).toBeInTheDocument();
    
    const triggerTestId = `input-select-trigger-${toCamelCase("State")}`;
    const trigger = screen.getByTestId(triggerTestId);
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    
    // Also check error test ID
    const errorTestId = `error-select-${toCamelCase("State")}`;
    expect(screen.getByTestId(errorTestId)).toBeInTheDocument();
  });

  it("does not display error if an option is selected when submitted", () => {
    const handleChange = vi.fn();
    render(
      <InputSelect
        data={mockStates}
        label="State"
        selectedValue="Alabama"
        handleChange={handleChange}
        submitted={true}
      />,
    );

    expect(
      screen.queryByText(/Please select an option/i),
    ).not.toBeInTheDocument();
    
    const errorTestId = `error-select-${toCamelCase("State")}`;
    expect(screen.queryByTestId(errorTestId)).not.toBeInTheDocument();
  });

  it("calls handleChange when option is selected", () => {
    const handleChange = vi.fn();
    render(
      <InputSelect
        data={mockStates}
        label="State"
        selectedValue=""
        handleChange={handleChange}
      />,
    );

    // Open dropdown
    const triggerTestId = `input-select-trigger-${toCamelCase("State")}`;
    const trigger = screen.getByTestId(triggerTestId);
    fireEvent.click(trigger);

    // Get options container
    const optionsTestId = `input-select-options-${toCamelCase("State")}`;
    expect(screen.getByTestId(optionsTestId)).toBeInTheDocument();

    // Select an option
    const option = screen.getByText("Alabama");
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith("Alabama");
  });

  it("closes dropdown when option is selected", () => {
    const handleChange = vi.fn();
    render(
      <InputSelect
        data={mockStates}
        label="State"
        selectedValue=""
        handleChange={handleChange}
      />,
    );

    // Open dropdown
    const triggerTestId = `input-select-trigger-${toCamelCase("State")}`;
    const trigger = screen.getByTestId(triggerTestId);
    fireEvent.click(trigger);
    
    const optionsTestId = `input-select-options-${toCamelCase("State")}`;
    expect(screen.getByTestId(optionsTestId)).toBeInTheDocument();

    // Select an option
    const option = screen.getByText("Alabama");
    fireEvent.click(option);

    // Dropdown should be closed
    expect(screen.queryByTestId(optionsTestId)).not.toBeInTheDocument();
  });

  it("handles keyboard navigation", () => {
    const handleChange = vi.fn();
    render(
      <InputSelect
        data={mockStates}
        label="State"
        selectedValue=""
        handleChange={handleChange}
      />,
    );

    const triggerTestId = `input-select-trigger-${toCamelCase("State")}`;
    const trigger = screen.getByTestId(triggerTestId);
    const optionsTestId = `input-select-options-${toCamelCase("State")}`;

    // Test Enter key opens dropdown
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(screen.getByTestId(optionsTestId)).toBeInTheDocument();

    // Test Escape key closes dropdown
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(screen.queryByTestId(optionsTestId)).not.toBeInTheDocument();

    // Test Space key opens dropdown
    fireEvent.keyDown(trigger, { key: " " });
    expect(screen.getByTestId(optionsTestId)).toBeInTheDocument();
  });

  it("displays selected value correctly", () => {
    render(
      <InputSelect
        data={mockStates}
        label="State"
        selectedValue="California"
      />,
    );

    expect(screen.getByText("California")).toBeInTheDocument();
    
    const triggerTestId = `input-select-trigger-${toCamelCase("State")}`;
    const trigger = screen.getByTestId(triggerTestId);
    expect(trigger).toHaveTextContent("California");
  });

  it("applies placeholder styling when no value is selected", () => {
    render(<InputSelect data={mockStates} label="State" selectedValue="" />);

    const triggerTestId = `input-select-trigger-${toCamelCase("State")}`;
    const trigger = screen.getByTestId(triggerTestId);
    expect(trigger).toHaveTextContent("Select an option");
  });

  it("handles disabled state", () => {
    render(<InputSelect data={mockStates} label="State" disabled={true} />);

    const triggerTestId = `input-select-trigger-${toCamelCase("State")}`;
    const trigger = screen.getByTestId(triggerTestId);
    expect(trigger).toBeDisabled();

    // Click should not open dropdown
    fireEvent.click(trigger);
    const optionsTestId = `input-select-options-${toCamelCase("State")}`;
    expect(screen.queryByTestId(optionsTestId)).not.toBeInTheDocument();
  });

  it("works with different labels and generates correct test IDs", () => {
    render(<InputSelect data={mockStates} label="Department" selectedValue="" />);

    // Should generate test ID based on label
    const triggerTestId = `input-select-trigger-${toCamelCase("Department")}`;
    expect(screen.getByTestId(triggerTestId)).toBeInTheDocument();
    
    // Click to open
    fireEvent.click(screen.getByTestId(triggerTestId));
    
    // Options should have corresponding test ID
    const optionsTestId = `input-select-options-${toCamelCase("Department")}`;
    expect(screen.getByTestId(optionsTestId)).toBeInTheDocument();
  });

  it("closes dropdown when clicking outside", () => {
    const handleChange = vi.fn();
    render(
      <div>
        <InputSelect
          data={mockStates}
          label="State"
          selectedValue=""
          handleChange={handleChange}
        />
        <button data-testid="outside-button">Outside</button>
      </div>
    );

    // Open dropdown
    const triggerTestId = `input-select-trigger-${toCamelCase("State")}`;
    const trigger = screen.getByTestId(triggerTestId);
    fireEvent.click(trigger);
    
    const optionsTestId = `input-select-options-${toCamelCase("State")}`;
    expect(screen.getByTestId(optionsTestId)).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(screen.getByTestId("outside-button"));

    // Dropdown should be closed
    expect(screen.queryByTestId(optionsTestId)).not.toBeInTheDocument();
  });
});