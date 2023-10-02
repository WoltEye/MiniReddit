import { renderWithProviders } from "../../utils/test-utils";
import { screen, act } from "@testing-library/react";
import CurrentPage from "./CurrentPage";
import { createBrowserRouter, 
         Route, 
         createRoutesFromElements, 
         RouterProvider } from "react-router-dom";
import { loadData } from "../Api/redditApiSlice";


const mockRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<CurrentPage />} />
    )
)

const MockCurrentPage = () => {
    return (
        <RouterProvider router={mockRouter}/>
    )
}

describe('CurrentPage', () => {
  it('Renders the loading component when the data is not fetched', async () => {
    renderWithProviders(<MockCurrentPage />);
    const loadingComponent = screen.getAllByTestId('loading-box');
    expect(loadingComponent.length).toStrictEqual(5);
  })
  it('Renders a error text when fetch failed', async () => {
    global.fetch = vi.fn();
    await act( async () => renderWithProviders(<MockCurrentPage />));
    const error = await screen.findByText('TypeError');
    expect(error).toBeInTheDocument();
  })
})