import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";
import { click } from "@testing-library/user-event";

describe("Greeting component", () => {
    test('renders "Hello World" as a text', () => {
        // Arrange
        render(<Greeting />);

        // Act
        // ... nothing (for example simulate a click)

        // Assert
        const helloWorldElement = screen.getByText("Hello World", {
            exact: false,
        });
        expect(helloWorldElement).toBeInTheDocument();
    });

    test('renders "good to see you" if the button was NOT clicked', () => {
        render(<Greeting />);
        expect(
            screen.getByText("good to see you", { exact: false })
        ).toBeInTheDocument();
    });

    test('renders "Changed!" if the button was clicked', async () => {
        // Arrange
        render(<Greeting />);

        // Act
        const buttonEl = screen.getByRole("button");
        await click(buttonEl);

        // Assert
        expect(
            screen.getByText("Changed!", { exact: false })
        ).toBeInTheDocument();
    });

    test('don\'t render "good to see you" if the button was clicked', async () => {
        render(<Greeting />);
        const buttonEl = screen.getByRole("button");
        await click(buttonEl);
        expect(
            screen.queryByText("good to see you", { exact: false })
        ).toBeNull();
    });
});
