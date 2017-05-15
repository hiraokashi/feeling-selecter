import React from 'react';
import {BarChart} from 'react-d3-components';

export class MyFeelingBarChart extends React.Component {
  constructor(props) {
    super(props);
  }
  shapeData() {
    return this.props.feelings.map((feeling, i) => {
      let count = this.props.my_feelings.filter((my_feeling) => {
        return my_feeling.feeling_id == feeling.id
      }).length
      //console.log(JSON.stringify({ x: feeling.name, y: count }))

      return { x: feeling.name, y: count }
    })
  }
  getData() {
    return {
      label: this.props.label,
      values: this.shapeData()
    }
  }
  render () {
    return (
     <div className="App">
       <BarChart
         data={this.getData()}
         width={480}
         height={320}
         margin={{top: 50, bottom: 40, left: 65, right: 10}} />
        </div>
    )
  }
}
