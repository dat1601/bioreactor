import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../../../src/features/layout/Layout';

describe('layout/Layout', () => {
  it('renders node with correct class name', () => {
    const props = {
      layout: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Layout {...props} />
    );

    expect(
      renderedComponent.find('.layout-layout').length
    ).toBe(1);
  });
});
