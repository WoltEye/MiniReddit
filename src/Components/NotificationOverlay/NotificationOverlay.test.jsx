import { renderWithProviders } from "../../utils/test-utils";
import { screen } from "@testing-library/react";
import NotificationOverlay from "./NotificationOverlay.jsx";

describe('NotificationOverlay', () => {
  it('Renders a notification', () => {
    renderWithProviders(<NotificationOverlay />)
    const paragraph = /This application doesn't support interactions like posting comments or liking posts. This functionality/i;
    const paragraphElem = screen.getByText(paragraph);
    expect(paragraphElem).toBeInTheDocument();
  })
})