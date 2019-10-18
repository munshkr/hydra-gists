import { UnControlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/material.css";

class HydraEditor extends React.Component {
  render() {
    const { code, className } = this.props;

    return (
      <React.Fragment>
        <CodeMirror
          value={code}
          className={className}
          options={{
            mode: "javascript",
            theme: "material"
          }}
        />
        <style jsx global>
          {`
            .CodeMirror {
              position: absolute;
              top: 0;
              left: 0;
              background-color: rgba(0, 0, 0, 0) !important;
            }
            .CodeMirror .CodeMirror-line span {
              background-color: rgba(0, 0, 0, 0.6);
              padding: 2px 0;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default HydraEditor;
