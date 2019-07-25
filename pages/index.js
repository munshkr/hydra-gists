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
      user: ""
    };
  }

  componentDidMount() {
    const { query } = this.props;

    const user = query.u;
    if (user) this.redirectToUser(user);
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
    const { user } = this.state;

    return (
      <Layout>
        <section>
          <form onSubmit={this.handleSubmit}>
            <input
              name="user"
              type="text"
              placeholder="Enter your GitHub username"
              value={user}
              onChange={this.handleChange}
            />
          </form>
        </section>
      </Layout>
    );
  }
}

export default Home;
