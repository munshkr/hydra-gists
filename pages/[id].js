import axios from "axios";
import React from "react";
import dynamic from "next/dynamic";
import HydraCanvas from "../components/HydraCanvas";
import Layout from "../components/Layout";

const HydraEditor = dynamic(() => import("../components/HydraEditor"), {
  ssr: false
});

class View extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);

    this.state = {
      initialCode: "",
      code: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { query } = this.props;
    this.fetchGist(query.id);
  }

  async fetchGist(id) {
    console.log(`Fetch gist by id ${id}`);

    let gist;

    try {
      const response = await axios.get(`https://api.github.com/gists/${id}`);
      gist = response.data;
    } catch (error) {
      console.error("Failed to fetch Gist");
      console.error(error);
      return;
    }

    const jsFile = Object.values(gist.files).find(
      file => file["language"] === "JavaScript"
    );
    const jsFileUrl = jsFile.raw_url;

    axios.get(jsFileUrl).then(code => {
      const { data } = code;
      this.setState({ code: data, initialCode: data });
    });
  }

  handleChange(_editor, _data, code) {
    this.setState({ code });
  }

  render() {
    const { initialCode, code } = this.state;

    return (
      <Layout>
        <section>
          <HydraEditor code={initialCode} onChange={this.handleChange} />
          <HydraCanvas code={code} width={960} height={540} fullscreen />
        </section>
        <style jsx global>
          {`
            body {
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </Layout>
    );
  }
}

export default View;
