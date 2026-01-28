import { render, screen, fireEvent } from "@testing-library/react";
import InputSelect from "../components/InputSelect/InputSelect";

describe("InputSelect Component", () => {
  it("renders options correctly with label and id", () => {
    const states = [
      { name: "Alabama", abbreviation: "AL" },
      { name: "California", abbreviation: "CA" },
    ];

    render(<InputSelect data={states} label="State" />);

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    states.forEach((state) => {
      expect(screen.getByText(state.name)).toBeInTheDocument();
    });
  });

  it("displays error if no option is selected", () => {
    const states = [
      { name: "Alabama", abbreviation: "AL" },
      { name: "California", abbreviation: "CA" },
    ];
    const handleChange = vi.fn();
    render(
      <InputSelect
        data={states}
        label="State"
        selectedValue=""
        onChange={handleChange}
        submitted={true}
      />
    );
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });

    expect(screen.getByText(/Please select an option/i)).toBeInTheDocument();
  });

  it("does not display error if an option is selected", () => {
    const states = [
      { name: "Alabama", abbreviation: "AL" },
      { name: "California", abbreviation: "CA" },
    ];
    const handleChange = vi.fn();
    render(<InputSelect data={states} label="Choose a state" />);
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Alabama" },
    });

    expect(
      screen.queryByText(/Please select an option/i)
    ).not.toBeInTheDocument();
  });
});
