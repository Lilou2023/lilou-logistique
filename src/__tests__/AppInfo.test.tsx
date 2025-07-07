import React from 'react';
import { render, screen } from '@testing-library/react';
import AppInfo from '../components/AppInfo';

describe('AppInfo', () => {
  it('renders name and version', () => {
    process.env.NEXT_PUBLIC_APP_NAME = 'Test App';
    process.env.NEXT_PUBLIC_APP_VERSION = '0.1.0';

    render(<AppInfo />);

    expect(screen.getByText('Test App')).toBeInTheDocument();
    expect(screen.getByText('v0.1.0')).toBeInTheDocument();
  });
});
