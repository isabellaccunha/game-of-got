import React from "react";
import "./App.css";
import Card from "./components/Card.js";
import Button from "./components/Button";
import axios from "axios";
import CardLoading from "./components/CardLoading";

const IS_LOADING = "IS_LOADING";
const IS_ENTERING = "IS_ENTERING";
const IS_LEAVING = "IS_LEAVING";
const IS_VISIBLE = "IS_VISIBLE";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      cardStatus: IS_LOADING,
      actualCharacter: 0
    };
  }

  componentDidMount() {
    axios({
      method: "GET",
      url: "https://www.anapioficeandfire.com/api/characters?page=2&pageSize=20"
    }).then(response => {
      this.setState(state => {
        return {
          characters: response.data,
          cardStatus: IS_ENTERING
        };
      });
      console.log(response.data);
    });
  }

  renderCard = () => {
    const character = this.state.characters[this.state.actualCharacter];
    switch (this.state.cardStatus) {
      default:
      case IS_LOADING:
        return <CardLoading />;
      case IS_ENTERING:
        return (
          <Card
            additionalClass="--cardIn"
            characterName={character.name}
            characterCulture={character.culture}
            characterGender={character.gender}
            characterSeasonsAppearence={character.tvSeries.length}
            isCharacterAlive={Boolean(character.died)}
            animationEndHandler={() => {
              this.setState({
                cardStatus: IS_VISIBLE
              });
            }}
          />
        );
      case IS_VISIBLE:
        return (
          <Card
            additionalClass=""
            characterName={character.name}
            characterCulture={character.culture}
            characterGender={character.gender}
            characterSeasonsAppearence={character.tvSeries.length}
            isCharacterAlive={Boolean(character.died)}
          />
        );
      case IS_LEAVING:
        return (
          <Card
            additionalClass="--cardOut"
            characterName={character.name}
            characterCulture={character.culture}
            characterGender={character.gender}
            characterSeasonsAppearence={character.tvSeries.length}
            isCharacterAlive={Boolean(character.died)}
            animationEndHandler={() => {
              this.setState(state => ({
                cardStatus: IS_ENTERING,
                actualCharacter: Math.floor(
                  Math.random() * state.characters.length
                )
              }));
            }}
          />
        );
    }
  };

  render() {
    return (
      <main className="appRoot__wrapper">
        {this.renderCard()}
        <Button
          clickHandler={click => {
            this.setState({
              cardStatus: IS_LEAVING
            });
          }}
        />
      </main>
    );
  }
}

export default App;
