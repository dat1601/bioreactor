import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from '../../../src/features/dashboard/Dashboard';

describe('dashboard/Dashboard', () => {
  it('renders node with correct class name', () => {
    const props = {
      dashboard: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Dashboard {...props} />
    );

    expect(
      renderedComponent.find('.dashboard-dashboard').length
    ).toBe(1);
  });
});
