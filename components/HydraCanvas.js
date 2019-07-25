import React from "react";

const GLOBAL_VARS_RE = /(o0|o1|o2|o3|s0|s1|s2|s3)/g;
const GLOBAL_FUNCS_RE = /(osc|shape|src)\(/g;

class HydraCanvas extends React.PureComponent {
  componentDidMount() {
    const { isLocal } = this.props;
    const makeGlobal = !isLocal;

    const Hydra = require("hydra-synth");

    this.hydra = new Hydra({ canvas: this.canvas, makeGlobal });

    if (isLocal) {
      // Define functions for outputs and sources
      for (let i = 0; i < 4; i++) {
        this.hydra[`o${i}`] = this.hydra.o[i];
        this.hydra[`s${i}`] = this.hydra.s[i];
      }

      // Workaround: This function expects a window.src() function to be defined. See
      // https://github.com/ojack/hydra-synth/blob/7eb0dde5175e2a6ce417e9f16d7e88fe1d750133/src/GeneratorFactory.js#L92
      window.src = this.hydra.src;
    }
  }

  componentWillUnmount() {
    delete this.hydra;
  }

  componentDidUpdate(prevProps) {
    const { code, isLocal } = this.props;

    if (!code) return;

    if (code !== prevProps.code) {
      let evalCode = code;
      if (isLocal) {
        evalCode = this.localizeHydraCode(code);
      }

      console.log(evalCode);
      try {
        eval(evalCode);
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
    const { fullscreen, code, isLocal, ...props } = this.props;
    const className = fullscreen ? "fullscreen" : "";

    return (
      <React.Fragment>
        <canvas ref={e => (this.canvas = e)} className={className} {...props} />
        <style jsx>
          {`
            .fullscreen {
              height: 100vh;
              width: 100vw;
              display: block;
            }
          `}
        </style>
      </React.Fragment>
    );
  }
}

export default HydraCanvas;
