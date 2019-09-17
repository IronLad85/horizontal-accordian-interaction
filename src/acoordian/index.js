import React from "react";
import { style } from "glamor";

export default class Accordian extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeBlockIndex: null };
  }
  componentDidMount() {}

  roundUpNumber(n) {
    n = n + 1;
    return n > 9 ? "" + n : "0" + n;
  }

  getBlockStyle(index) {
    let { activeBlockIndex } = this.state;
    let paneStateClass = activeBlockIndex == index ? "active-block" : "inactive-block";
    let normalFlexValue = 1;
    let hoverStyle = {};
    let lgDevicesHover = { flex: 1 };
    if (activeBlockIndex) {
      normalFlexValue = activeBlockIndex === index ? 1 : 0.1;
      hoverStyle.flex = activeBlockIndex !== index ? 0.15 : 1;
      lgDevicesHover.flex = activeBlockIndex !== index ? 0.25 : 1;
    } else {
      hoverStyle.flex = 1.3;
      lgDevicesHover.flex = 1.3;
    }

    hoverStyle.transition = "flex 0.5s ease-in-out";
    return (
      style({
        flex: normalFlexValue,
        "@media(min-width: 1600px)": {
          flex: normalFlexValue === 0.1 ? 0.2 : 1,
          ":hover": lgDevicesHover
        },
        ":hover": hoverStyle
      }) + ` ${paneStateClass}`
    );
  }

  getImageStyle(movieData, index) {
    let { activeBlockIndex } = this.state;
    let hoverStyle = null;
    let backgroundPosition = "25%";
    if (activeBlockIndex) {
      if (activeBlockIndex === index) {
        hoverStyle = { transition: "all 0.5s ease-in-out" };
      } else {
        hoverStyle = { boxShadow: `0px 0px 0px 400px #ffffff00 inset` };
        backgroundPosition = "30%";
      }
    } else {
      hoverStyle = {
        boxShadow: `0px 0px 0px 400px #ffffff00 inset`,
        transition: "box-shadow 0.5s ease-in-out"
      };
    }
    return style({
      backgroundImage: `url(${movieData.img})`,
      backgroundPosition,
      boxShadow: activeBlockIndex === index ? "0px 0px 0px 10px #00000000 inset" : "0px 0px 0px 400px #001d4bbf inset",
      transition: "box-shadow 0.5s ease-in-out background-position .5s",
      ":hover": hoverStyle
    });
  }

  onActiveBlockCancel = event => {
    event.stopPropagation();
    this.setState({ activeBlockIndex: null });
  };

  renderRating(rating) {
    let ratingStars = [];
    for (let i = 1; i <= 5; i++) {
      ratingStars.push(
        <i
          className="material-icons"
          key={i}
          style={{ color: i > rating ? "silver" : "yellow", padding: "3px", fontSize: 16 }}
        >
          star
        </i>
      );
    }
    return <div style={{ padding: "10px 0", animation: "fadeInUp 1s" }}>{ratingStars}</div>;
  }

  renderCloseButton() {
    return (
      <div style={styles.closeButton}>
        <i className="material-icons" style={styles.closeButtonText} onClick={this.onActiveBlockCancel}>
          close
        </i>
      </div>
    );
  }

  renderBottomLine(movieData) {
    return (
      <div style={styles.bottomLine}>
        <div style={styles.bottomLineBlock}>
          <i className="material-icons" style={styles.buttomLineIcon}>
            access_time
          </i>
          {movieData.duration}
        </div>
        <div style={styles.bottomLineBlock}>
          <i className="material-icons" style={styles.buttomLineIcon}>
            camera_roll
          </i>
          {movieData.genre}
        </div>
      </div>
    );
  }

  renderVerticleBlock(movieData, index) {
    return (
      <div style={styles.verticleBlock}>
        <i className="material-icons" style={styles.plusIcon}>
          add
        </i>
        <div style={{ paddingBottom: 15 }}>{movieData.title}</div>
        <div style={styles.verticleLine} className="verticle-line" />
        {this.state.activeBlockIndex === index + 1 ? (
          <div
            className={styles.playButtonBlock + " disable-select"}
            onClick={() => {
              this.props.onTrailerOpen(movieData.trailerId);
            }}
          >
            <i className="material-icons" style={styles.playButton}>
              play_arrow
            </i>
          </div>
        ) : null}
        <div style={styles.verticleLine} className="verticle-line" />
      </div>
    );
  }

  renderCastCrewInfo(movieData) {
    return (
      <div style={styles.infoList}>
        <div style={styles.infoListBlock}>
          <div style={styles.infoTitle}>Director</div> <div>{movieData.director}</div>
        </div>
        <div style={styles.infoListBlock}>
          <div style={styles.infoTitle}>Actors</div> <div>{movieData.actors}</div>
        </div>
        <div style={styles.infoListBlock}>
          <div style={styles.infoTitle}>In Theatres</div> <div>{movieData.releaseDate}</div>
        </div>
        <div style={styles.infoListBlock}>
          <div style={styles.infoTitle}>Studio</div> <div>{movieData.studio}</div>
        </div>
      </div>
    );
  }

  render() {
    let { activeBlockIndex } = this.state;
    return (
      <div style={styles.accordianContainer}>
        {this.props.data.map((movieData, index) => (
          <div
            style={styles.accordianUnit}
            className={this.getBlockStyle(index + 1)}
            key={index}
            onClick={() => {
              this.setState({ activeBlockIndex: index + 1 });
            }}
          >
            <div className={this.getImageStyle(movieData, index + 1)} style={styles.imageBlock}>
              {this.state.activeBlockIndex === index + 1 ? (
                <div style={styles.infocontent}>
                  <div style={styles.title}> {movieData.title}</div>
                  <div style={styles.subtitle}> {movieData.subtitle}</div>
                  {this.renderRating(movieData.rating)}
                  <div style={styles.synopsis}> {movieData.synopsis} </div>
                  {this.renderCastCrewInfo(movieData)}
                  {this.renderBottomLine(movieData)}
                </div>
              ) : null}
            </div>
            {this.renderVerticleBlock(movieData, index)}
            {activeBlockIndex === index + 1 ? this.renderCloseButton() : null};
            <div style={{ ...styles.serialNo, display: !activeBlockIndex ? "unset" : "none" }}>
              {this.roundUpNumber(index)}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const styles = {
  accordianUnit: {
    display: "flex",
    position: "relative",
    transition: "flex 0.4s"
  },
  accordianContainer: {
    flex: 1,
    flexDirection: "row",
    display: "flex"
  },
  verticleBlock: {
    position: "absolute",
    bottom: 20,
    right: 10,
    writingMode: "tb-rl",
    transform: "rotate(180deg)",
    zIndex: 40,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    display: "flex",
    height: "calc(100% - 30px)",
    alignItems: "center"
  },
  imageBlock: {
    backgroundRepeat: "no-repeat",
    position: "absolute",
    width: "100%",
    // backgroundAttachment: "fixed",
    transition: "all 0.5s",
    backgroundSize: "cover",
    height: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "flex-end"
  },
  plusIcon: {
    color: "#E4F22F",
    fontWeight: "bold",
    paddingBottom: 5
  },
  verticleLine: {
    display: "flex",
    flex: 1,
    borderRight: "1px solid rgba(255,255,255,0.2)",
    paddingTop: 10
  },
  serialNo: {
    zIndex: 10,
    position: "absolute",
    bottom: 20,
    left: 15,
    color: "white",
    fontSize: 30
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 40,
    color: "white !important"
  },
  closeButtonText: {
    fontSize: 35,
    color: "white",
    fontWeight: 200,
    animation: "spin-from-left 0.5s",
    cursor: "pointer",
    zIndex: 20
  },
  infocontent: {
    display: "flex",
    flex: 0.52,
    marginRight: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column"
  },
  title: {
    fontSize: 60,
    color: "white",
    fontWeight: 800,
    fontFamily: "'Raleway', sans-serif",
    animation: "fadeInUp 0.8s",
    textShadow: "1px 1px 5px #777"
  },
  subtitle: {
    color: "white",
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 800,
    fontSize: 22,
    animation: "fadeInUp 0.9s",
    textShadow: "1px 1px 4px #777"
  },
  synopsis: {
    color: "white",
    lineHeight: "26px",
    marginTop: 5,
    marginBottom: 15,
    fontSize: 18,
    width: "90%",
    textAlign: "justify",
    animation: "fadeInUp 1s"
  },
  infoList: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
    paddingBottom: 10,
    borderBottom: "1px solid rgba(255,255,255,0.6)",
    animation: "fadeInUp 1.1s"
  },
  infoTitle: {
    fontWeight: "bold",
    width: "130px",
    display: "block"
  },
  infoListBlock: {
    flex: 1,
    display: "flex",
    padding: "4px",
    fontSize: 18
  },
  bottomLine: {
    animation: "fadeInUp 1.2s",
    display: "flex",
    width: "100%",
    flexDirection: "row",
    paddingTop: 10
  },
  bottomLineBlock: {
    color: "white",
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  buttomLineIcon: {
    color: "white",
    padding: "5px 10px 5px 0"
  },
  playButton: {
    transform: "rotate(90deg)",
    cursor: "pointer"
  },
  playButtonBlock: style({
    ":hover": {
      transform: "scale(1.2)",
      transition: "transform 0.3s"
    },
    border: "2px solid rgba(255,255,255,0.75)",
    borderRadius: "50%",
    padding: 6,
    top: "auto",
    alignItems: "center",
    justifyContent: "center",
    bottom: "auto",
    marginBottom: 10,
    transition: "transform 0.3s",
    marginTop: 10,
    animation: "scaleUp 0.8s"
  })
};
