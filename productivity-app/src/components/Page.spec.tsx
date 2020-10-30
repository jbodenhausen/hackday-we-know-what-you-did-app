import React from 'react';
import Page from './Page';
import { render } from '@testing-library/react';

describe('Page component', () => {
  it('Component text exists', () => {
    const mockType: any = {
      app: {
        sys:{
          id:0
        },
        name:"HI"
      }
    };
    const { getByText } = render(<Page sdk={mockType} />);

    expect(getByText('Hello Page Component')).toBeInTheDocument();
  });
});
