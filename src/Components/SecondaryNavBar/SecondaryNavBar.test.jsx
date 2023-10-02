import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-utils";
import SecondaryNavBar from "./SecondaryNavBar";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

const mockRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<SecondaryNavBar />}/>
    )
)

const MockSecondaryNavBar = () => {
    return (
        <RouterProvider router={mockRouter} />
    )
}

beforeEach(() => {
  renderWithProviders(<MockSecondaryNavBar/>);
})

describe('SecondaryNavBar', () => {
  describe('Renders a navbar with four links named', () => {
    test('Renders three links', () => {
      const links = screen.getAllByRole('link');
      expect(links.length).toStrictEqual(3);
    })
    test('Top', () => {
      const topLink = screen.getByText('Top');
      expect(topLink).toBeInTheDocument();    
    })
    test('Best', () => {
      const bestLink = screen.getByText('Best');
      expect(bestLink).toBeInTheDocument();
    })
    test('New', () => {
      const newLink = screen.getByText('New');
      expect(newLink).toBeInTheDocument();
    })
  })
})