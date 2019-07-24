import React from "react";
import axios from "axios";

class Home extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  componentDidMount() {
    const { query } = this.props;
    const user = query.u || "munshkr";
    this.getGistsFrom(user);
  }

  async getGistsFrom(user) {
    console.log(`Fetch gists from ${user}`);

    try {
      const response = await axios.get(
        `https://api.github.com/users/${user}/gists`
      );
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch gists. Github API down?");
      console.error(error);
    }
  }

  render() {
    return <div>Welcome to Next.js!</div>;
  }
}

export default Home;
