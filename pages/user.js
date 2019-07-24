import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import React from "react";
import HydraCanvas from "../components/HydraCanvas";
import Layout from "../components/Layout";

class Item extends React.Component {
  handleClick = () => {
    const { gist } = this.props;
    Router.push(`/view?id=${gist.id}`);
  };

  render() {
    const { gist, code } = this.props;

    return (
      <div>
        <HydraCanvas code={code} onClick={this.handleClick} />
        <p>{gist.description}</p>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        <a href={gist.html_url} target="_blank">
          {gist.id}
        </a>
      </div>
    );
  }
}

class User extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      gists: [],
      code: {}
    };
  }

  componentDidMount() {
    const { query } = this.props;
    const user = query.u;
    this.setState({ user });
    this.getGistsFrom(user);
  }

  async getGistsFrom(user) {
    console.log(`Fetch gists from ${user}`);

    let data;

    try {
      const response = await axios.get(
        `https://api.github.com/users/${user}/gists`
      );
      data = response.data;
      //console.log(data);
    } catch (error) {
      console.error("Failed to fetch gists. Github API down?");
      console.error(error);
      return;
    }

    // Filter only #hydra gists
    const hydraGists = data.filter(
      gist => gist.description.indexOf("#hydra") >= 0
    );

    console.log(hydraGists);
    this.setState({ gists: hydraGists });

    // Fetch code from each gist
    for (let i = 0; i < hydraGists.length; i++) {
      const gist = hydraGists[i];
      const jsFile = Object.values(gist.files).find(
        file => file["language"] === "JavaScript"
      );
      const jsFileUrl = jsFile.raw_url;

      axios.get(jsFileUrl).then(code => {
        this.setState({ code: { [gist.id]: code.data } });
      });
    }
  }

  render() {
    const { user, gists, code } = this.state;

    return (
      <Layout>
        <Head>
          <title>{`${user}`} ~ Hydra Gists</title>
        </Head>
        <section className="section">
          {gists.map(gist => (
            <Item key={gist.id} gist={gist} code={code[gist.id]} />
          ))}
        </section>
      </Layout>
    );
  }
}

export default User;
