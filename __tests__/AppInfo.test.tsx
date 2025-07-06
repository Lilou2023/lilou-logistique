import { render, screen } from '@testing-library/react';
import AppInfo from '../src/components/AppInfo';

describe('AppInfo', () => {
  it('renders app name and version by default', () => {
    render(<AppInfo />);
    expect(screen.getByText('Lilou Logistique DSP')).toBeInTheDocument();
    expect(screen.getByText(/v1.0.0/)).toBeInTheDocument();
  });
});
