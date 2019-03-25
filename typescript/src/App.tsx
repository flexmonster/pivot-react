import * as React from 'react';
import * as FlexmonsterReact from 'react-flexmonster';


class App extends React.Component {

  private flexmonsterRef = React.createRef<FlexmonsterReact.Pivot>();

  public render() {
    return (
      <div className="App">
          <FlexmonsterReact.Pivot ref={this.flexmonsterRef} toolbar={true} ready={() => this.onReady()} width="100%" />
      </div>
    );
  }

  public onReady(): void {
    var pivotObject = this.flexmonsterRef.current as FlexmonsterReact.Pivot;
    pivotObject.flexmonster.load("https://cdn.flexmonster.com/reports/report.json");
  }

  public componentDidMount() {
  }
}

export default App;
