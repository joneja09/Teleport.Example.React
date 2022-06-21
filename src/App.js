import './App.css';
import React from "react";
import { LocationSelector, Option } from "./Components/LocationSelector"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      areas: [],
      dataIsLoaded: false,
      firstArea: "",
      firstAreaInfo: [],
      secondArea: "",
      secondAreaInfo: []
    };
  }

  fetchAreaInfo = async (infolink) => {
    // var result;
    return fetch(
      infolink
    ).then((res) => res.json())
    .then((json) => {
      return json;
    })
  }

  handleSelect = async (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    var areaState = e.target.name;
    var infoState = e.target.name + "Info";

    var info = await this.fetchAreaInfo(e.target.selectedOptions[0].attributes["data-infolink"].value);
    this.setState({[areaState]: e.target.value, [infoState]: info });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.firstArea);
  }

  componentDidMount = () => {
    fetch(
      "https://api.teleport.org/api/urban_areas/"
    ).then((res) => res.json())
    .then((json) => {
      this.setState({
        areas: json,
        dataIsLoaded: true
      })
    })
  }
  

  render() {
    const { dataIsLoaded, areas } = this.state;
    if (!dataIsLoaded) return <div><h1>Loading...</h1></div>;
    
    function AreaInfo(props) {
      if (props.Info == "" || props.Name == "Click to see options")
        return;
  
      return (
        <div class="infoPanel">
          <p class="bold">{props.Name} Info: </p>
          <p><span class="bold">Full Name:</span> {props.Info.full_name}</p>
          <p><span class="bold">Continent:</span> {props.Info.continent}</p>
          <p><span class="bold">Lat/Lon:</span> {JSON.stringify(props.Info.bounding_box.latlon)}</p>
          <p><span class="bold">City URL:</span> {props.Info.teleport_city_url}</p>
          <p><span class="bold">Is Govt Partner:</span> {JSON.stringify(props.Info.is_government_partner)}</p>
        </div>
      )
    }

    function UrbanAreaPanel(props) {
      var label = "Urban Area " + props.index;
      return (
        <div className="panelWrapper">
          <LocationSelector
            formLabel={label}
            name = {props.name}
            onChange={props.onchange}
            action="https://jsonplaceholder.typicode.com/posts"
            defaultValue="Click to see options">
              <Option value="Click to see options" />
              {                
                areas._links["ua:item"].map((l, index) => (
                  <Option key={index} infolink={l.href} value={l.name} />
                ))
              }
          </LocationSelector>
          <AreaInfo Name={props.area} Info={props.areainfo} />
        </div>
      )
    }
    
    return (
      <div className="App">
        <h1>Compare Urban Areas</h1>

          <UrbanAreaPanel index="1" name="firstArea" onchange={this.handleSelect} area={this.state.firstArea} areainfo={this.state.firstAreaInfo} />

          <UrbanAreaPanel index="2" name="secondArea" onchange={this.handleSelect} area={this.state.secondArea} areainfo={this.state.secondAreaInfo} />
          
      </div>
    );
  }
  
}

export default App;
