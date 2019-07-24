import React from "react";

const GLOBAL_VARS_RE = /(o0|o1|o2|o3|s0|s1|s2|s3)/g;
const GLOBAL_FUNCS_RE = /(osc|shape|src)\(/g;

class HydraCanvas extends React.PureComponent {
  componentDidMount() {
    const Hydra = require("hydra-synth");

    this.hydra = new Hydra({
      canvas: this.canvas,
      makeGlobal: false
    });

    // Define functions for outputs and sources
    for (let i = 0; i < 4; i++) {
      this.hydra[`o${i}`] = this.hydra.o[i];
      this.hydra[`s${i}`] = this.hydra.s[i];
    }

    // Workaround: This function expects a window.src() function to be defined. See
    // https://github.com/ojack/hydra-synth/blob/7eb0dde5175e2a6ce417e9f16d7e88fe1d750133/src/GeneratorFactory.js#L92
    window.src = this.hydra.src;
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
    return <canvas ref={e => (this.canvas = e)} {...this.props}></canvas>;
  }
}

export default HydraCanvas;
