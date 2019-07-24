import React from "react";

const GLOBAL_VARS_RE = /(o0|o1|o2|o3|s0|s1|s2|s3)/g;
const GLOBAL_FUNCS_RE = /(osc|shape)\(/g;

class HydraCanvas extends React.PureComponent {
  componentDidMount() {
    const { code } = this.props;

    const Hydra = require("hydra-synth");

    this.hydra = new Hydra({
      canvas: this.canvas,
      makeGlobal: false
    });
  }

  componentWillUnmount() {
    delete this.hydra;
  }

  componentDidUpdate(prevProps) {
    const { code } = this.props;

    if (!code) return;

    if (code !== prevProps.code) {
      const localCode = this.localizeHydraCode(code);
      console.log(localCode);
      try {
        eval(localCode);
      } catch (err) {
        console.error(`Failed to execute Hydra code: ${err}`);
      }
    }
  }

  localizeHydraCode(code) {
    const replaceFunc = func => `this.hydra.${func}`;
    return code
      .replace(GLOBAL_FUNCS_RE, replaceFunc)
      .replace(GLOBAL_VARS_RE, replaceFunc);
  }

  render() {
    return <canvas ref={e => (this.canvas = e)}></canvas>;
  }
}

export default HydraCanvas;
