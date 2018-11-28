import React from 'react';
import _ from 'lodash';
import RGL, { WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(RGL);

export default class BasicLayout extends React.PureComponent {
  static defaultProps = {
    className: 'layout',
    items: 1,
    rowHeight: 30,
    onLayoutChange: function() {},
    cols: 12,
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  generateDOM() {
    // return _.map(_.range(this.props.items), function(i) {
    //   return (
    //     <div key={i}>
    //       <span className="text">{i}</span>
    //     </div>
    //   );
    // });
    return (
      
      <div key={0}>
        <iframe
          src="https://iot.research.hamk.fi/visu/d-solo/000000023/solar-production-olk?orgId=4&panelId=1&from=1543183200000&to=1543221023117&var-calcPeriod=1h&theme=light"
          width="auto"
          height="auto"
          frameBorder="0"
        />
      </div>
      
    );
  }

  generateLayout() {
    const p = this.props;
    return _.map(new Array(p.items), function(item, i) {
      const y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 3,
        h: 2,
        i: i.toString(),
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}
