import Head from "next/head";

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
      <style jsx global>
        {`
          body {
            background: #111;
            color: #fff;
            font-family: "Roboto", sans-serif;
          }

          a {
            color: #e47464;
          }
        `}
      </style>
    </div>
  );
};
