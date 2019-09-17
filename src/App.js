import React from "react";
import Accordian from "./acoordian";
import "./App.css";
import ModalVideo from "react-modal-video";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: "Joker",
          img: require("./assets/joker1.jpg"),
          subtitle: `Chapter 3 "Parabellum"`,
          rating: 4,
          director: "Todd Phillips",
          actors: "Joaquin Phoenix, Zazie Beetz, Robert De Niro",
          studio: "Summit Entertainment",
          releaseDate: "4 October 2019",
          duration: "2h 3min",
          genre: "Crime, Drama, Thriller ",
          trailerId: "zAGVQLHvwOY",
          synopsis:
            "An original standalone origin story of the iconic villain not seen before on the big screen, it's a gritty character study of Arthur Fleck, a man disregarded by society, and a broader cautionary tale."
        },
        {
          title: "John Wick",
          img: require("./assets/wick1.jpg"),
          subtitle: `Chapter 3 "Parabellum"`,
          rating: 4,
          director: "Chad Stahelski",
          actors: "Keanu Reeves, Halle Berry, Ian McShane",
          studio: "Summit Entertainment",
          releaseDate: "17 May 2019 (Worldwide)",
          duration: "2h 11min",
          genre: "Action, Crime, Thriller",
          trailerId: "pU8-7BX9uxs",
          synopsis:
            "Super-assassin John Wick is on the run after killing a member of the international assassin's guild, and with a $14 million price tag on his head - he is the target of hit men and women everywhere."
        },
        {
          title: "HellBoy",
          img: require("./assets/hellboy1.jpg"),
          rating: 3,
          director: "Neil Marshall",
          actors: "David Harbour, Milla Jovovich, Ian McShane",
          studio: "Summit Entertainment",
          releaseDate: "12 April 2019 (Worldwide)",
          duration: "2h 1min",
          genre: "Action, Adventure, Fantasy",
          trailerId: "ZsBO4b3tyZg",
          synopsis:
            "Based on the graphic novels by Mike Mignola, Hellboy, caught between the worlds of the supernatural and human, battles an ancient sorceress bent on revenge."
        },
        {
          title: "Star Wars",
          img: require("./assets/starwars1.jpg"),
          subtitle: "The Rise of Skywalker",
          rating: 3,
          director: "J.J. Abrams",
          actors: "Billie Lourd, Adam Driver, Daisy Ridley",
          studio: "Bad Robot Productions",
          releaseDate: "20 December 2019 (Worldwide)",
          duration: "2h 12min",
          trailerId: "P94M4jlrytQ",
          genre: "Action, Adventure, Fantasy",
          synopsis:
            "The surviving Resistance faces the First Order once more as Rey, Finn and Poe Dameron's journey continues. With the power and knowledge of generations behind them, the final battle commences."
        }
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="content">
            <Accordian
              data={this.state.data}
              onTrailerOpen={trailerId => {
                this.setState({ trailerId, isOpen: true });
              }}
            />
            <ModalVideo
              channel="youtube"
              isOpen={this.state.isOpen}
              videoId={this.state.trailerId}
              onClose={() => this.setState({ isOpen: false })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
