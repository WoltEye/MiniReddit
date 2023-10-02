import { renderWithProviders } from "../../../utils/test-utils";
import { screen } from "@testing-library/react";
import Post from "./Post.jsx";

let mockApiData = {
  score: 1000,
  subreddit_name_prefixed: 'r/james',
  author: 'jones',
  title: 'Yo Man',
  post_hint: 'image',
  is_video: false,
  num_comments: 12,
  created_utc: 5100,
  // Will still render the img element if the image src isnt valid
  url: 'https://google.com',
  secure_media: {
    reddit_video: {
      hls_url: 'https://google.com' 
    }
  }
}

describe('Post', () => {
  describe('Renders and formats a post using a prop', () => {
    beforeEach(() => {
        renderWithProviders(<Post data={mockApiData}/>);
        })
    test('Score', () => {
    const score = screen.getByText('1K');
    expect(score).toBeInTheDocument();
    })
    test('Subreddit name', () => {
      const subreddit = screen.getByText('r/james');
      expect(subreddit).toBeInTheDocument();
    })
    test('Author', () => {
      const author = screen.getByText('Posted by jones');
      expect(author).toBeInTheDocument();
    })
    test('Title', () => {
      const title = screen.getByText('Yo Man');
      expect(title).toBeInTheDocument();
    })
    test('Number of comments', () => {
      const numOfComments = screen.getByText('12 Comments');
      expect(numOfComments).toBeInTheDocument();
    })
    })
    it('Renders a image if the thumbnail is a image', () => {
        renderWithProviders(<Post data={mockApiData}/>);
        const image = screen.getByRole('img');
        expect(image).toBeInTheDocument();
    })
    it('Renders a video if the thumbnail is a video', () => {
        mockApiData.is_video = true;
        mockApiData.post_hint = 'video:hosted';
        renderWithProviders(<Post data={mockApiData}/>);
        const videoElem = screen.getByTestId('video');
        expect(videoElem).toBeInTheDocument();
        mockApiData.is_video = false;
        mockApiData.post_hint = 'image';
      })
    it('Renders a br if the post doesnt have a thumbnail', () => {
      mockApiData.post_hint = 'what';
      renderWithProviders(<Post data={mockApiData} />);
      const br = screen.getByTestId('br');
      expect(br).toBeInTheDocument();
      mockApiData.post_hint = 'image';
    })
  })
 