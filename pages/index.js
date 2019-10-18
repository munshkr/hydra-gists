import Link from "next/link";
import Router from "next/router";
import React from "react";
import Layout from "../components/Layout";

class Home extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: "",
      currentHref: null
    };
  }

  componentDidMount() {
    const { query } = this.props;

    const user = query.u;
    if (user) this.redirectToUser(user);

    this.setState({ currentHref: window.location.href });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { user } = this.state;
    if (user) this.redirectToUser(user);
  };

  redirectToUser(user) {
    Router.push(`/u/${user}`);
  }

  render() {
    const { user, currentHref } = this.state;

    let signUpUrl = "https://github.com/join";
    if (currentHref) {
      signUpUrl = `${signUpUrl}?return_to=${encodeURIComponent(currentHref)}`;
    }

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <h1 className="title is-1">Hydra gists</h1>
            <h2 className="subtitle is-3">
              Build your gallery of Hydra sketches using GitHub Gists
            </h2>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="content is-medium">
              <p>
                If you want to create a new Hydra sketch and start building your
                own gallery, follow these steps:
              </p>
              <ol>
                <li>
                  <a href={signUpUrl}>Sign up to GitHub</a>, if you haven't done
                  so yet
                </li>
                <li>
                  Create a{" "}
                  <a
                    href="https://gist.github.com/"
                    className="button is-link is-medium"
                    target="_blank"
                    style={{ verticalAlign: "middle" }}
                  >
                    New Gist
                  </a>
                </li>
                <li>Copy and paste your Hydra code in a new file</li>
                <li>
                  Name your file with a <code>.js</code> extension, like{" "}
                  <code>mySketch.js</code>
                </li>
                <li>
                  Make sure to{" "}
                  <strong>
                    add <code>#hydra</code> in your description
                  </strong>
                  .
                </li>
                <li>Publish!</li>
              </ol>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="content is-medium">
              <p>
                Enter yours or someone else's username to see their gallery:
              </p>
              <form
                style={{ marginBottom: "1em" }}
                onSubmit={this.handleSubmit}
              >
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <input
                      className="input is-large"
                      name="user"
                      type="text"
                      placeholder="Enter your GitHub username"
                      value={user}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="control">
                    <a className="button is-info is-large">Explore</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Hydra Gists</strong> by{" "}
              <a href="https://github.com/munshkr">munshkr</a>.<br />
              The source code is available at{" "}
              <a href="https://github.com/munshkr/hydra-gists">GitHub</a> and is
              licensed{" "}
              <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPL 3</a>
              .<br />
              The website content, except for user Gists, is licensed{" "}
              <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                CC BY NC SA 4.0
              </a>
              .
            </p>
          </div>
        </footer>
      </Layout>
    );
  }
}

export default Home;
