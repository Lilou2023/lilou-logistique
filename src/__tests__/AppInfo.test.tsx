import React from 'react';
import { render, screen } from '@testing-library/react';
import AppInfo from '../components/AppInfo';

describe('AppInfo', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('renders name and version', () => {
    process.env.NEXT_PUBLIC_APP_NAME = 'Test App';
    process.env.NEXT_PUBLIC_APP_VERSION = '0.1.0';
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';

    render(<AppInfo />);

    expect(screen.getByText('Test App')).toBeInTheDocument();
    expect(screen.getByText('v0.1.0')).toBeInTheDocument();
  });

  it('hides version when showVersion is false', () => {
    process.env.NEXT_PUBLIC_APP_NAME = 'Test App';
    process.env.NEXT_PUBLIC_APP_VERSION = '0.1.0';

    render(<AppInfo showVersion={false} />);

    expect(screen.queryByText('v0.1.0')).toBeNull();
  });

  it('renders url when showUrl is true', () => {
    process.env.NEXT_PUBLIC_APP_NAME = 'Test App';
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';

    render(<AppInfo showUrl />);

    expect(screen.getByText('https://example.com')).toBeInTheDocument();
  });
});
