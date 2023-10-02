import { renderWithProviders } from "../../../utils/test-utils";
import { screen } from "@testing-library/react";
import Loading from "./Loading.jsx";

describe('Loading', () => {
  it('Renders 5 gray divs', () => {
    renderWithProviders(<Loading />)
    const loadingComponent = screen.getAllByTestId('loading-box');
    expect(loadingComponent.length).toStrictEqual(5);
  })    
})