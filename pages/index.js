import React from "react";
import axios from "axios";
import HydraCanvas from "../components/HydraCanvas";

const Item = ({ gist, code }) => (
  <div>
    <HydraCanvas code={code} />
    <p>{gist.description}</p>
    <p>
      <a href={gist.html_url} target="_blank">
        {gist.id}
      </a>
    </p>
  </div>
);

class Home extends React.Component {
  static async getInitialProps({ query }) {
    return { query };
  }

  constructor(props) {
    super(props);
    this.state = {
      gists: [],
      code: {}
    };
  }

  componentDidMount() {
    const { query } = this.props;
    const user = query.u || "munshkr";
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
    const { gists, code } = this.state;

    return (
      <div>
        <ul>
          {gists.map(gist => (
            <li>
              <Item key={gist.id} gist={gist} code={code[gist.id]} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
