# Flexmonster Pivot table component integration with React framework
[![Flexmonster Pivot table component](https://s3.amazonaws.com/flexmonster/github/fm-github-cover.png)](http://flexmonster.com)
Website: www.flexmonster.com

## Example
Please find more examples in the repository. Also, [full tutorial is available at the www.flexmonster.com](http://www.flexmonster.com/doc/integration-with-react/).
```html
<!DOCTYPE html>
<html>
<head>
  <title>My React/Flexmonster Project</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.24/browser.min.js"></script>
  <script src="https://cdn.flexmonster.com/flexmonster.js"></script>
</head>
<body>
  <div id="fm-container"></div>
  <script type="text/babel">
    ReactDOM.render(
      <FlexmonsterReact.Pivot 
        componentFolder="https://cdn.flexmonster.com/"
        report="https://cdn.flexmonster.com/reports/report.json" 
        licenseKey="XXX"/>, 
      document.getElementById("fm-container")
    );
  </script>
</body>
</html>
```
## How to start ES6 project

```bash
> npm run setup
> npm run start
```

## ES6 integration approach
The flexmonster Pivot class is defined in flexmonster.react.js
It can be used in the other React classes such as:
```js
import * as FlexmonsterReact from './flexmonster.react';

export class ReactClass extends React.PureComponent {

render() {

    return (
      <FlexmonsterReact.Pivot toolbar="true" componentFolder="https://cdn.flexmonster.com/" width="800px" report="https://cdn.flexmonster.com/reports/report.json"/>
    );
  }
  
 }
```

## Properties
All available attributes for FlexmonsterReact.Pivot the same as for [$.flexmonster()](http://www.flexmonster.com/api/flexmonster/).
- `toolbar` – parameter to embed the toolbar or not. Default value is false – without the toolbar.
- `licenseKey` – the license key.
- `width` – width of the component on the page (pixels or percent). The default value for width is 100%.
- `height` – height of the component on the page (pixels or percent). The default value for height is 500.
- `componentFolder` – URL of the component’s folder which contains all necessary files. Also, it is used as a base URL for report files, localization files, styles and images. The default value for is `flexmonster/`.
- `report` – property to set a report. It can be inline report JSON, URL to report JSON or URL to report XML.
- `global` – object that allows you to preset options for all reports. These options can be overwritten for concrete reports. Object structure is the same as for report.

## Events:
- `ready`
- `reportcomplete`
- `reportchange`
- `update`
- `cellclick`
- `celldoubleclick`
- `filteropen`
- `fieldslistopen`
- `fieldslistclose`

Full list of events is [available in the documentation](http://www.flexmonster.com/api/events/).
