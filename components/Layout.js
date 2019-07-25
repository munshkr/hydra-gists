import Head from "next/head";

import "../node_modules/bulma/bulma.sass";
import "../styles/styles.scss";

export default ({ children }) => {
  return (
    <div>
      <Head>
        <title>Hydra Gists</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      {children}
    </div>
  );
};
