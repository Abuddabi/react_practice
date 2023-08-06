import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
    test("renders posts if request succeeds", async () => {
        window.fetch = vi.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [
                {
                    id: "p1",
                    title: "Test post",
                },
            ],
        });
        render(<Async />);

        expect(await screen.findAllByRole("listitem", {}, {})).not.toHaveLength(
            0
        );
    });
});
