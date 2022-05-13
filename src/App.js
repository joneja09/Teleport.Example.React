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
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelect2 = this.handleSelect2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchAreaInfo = this.fetchAreaInfo.bind(this);
  }

  async fetchAreaInfo(areaName) {
    // var result;
    return fetch(
      "https://api.teleport.org/api/urban_areas/slug:" + areaName + "/"
    ).then((res) => res.json())
    .then((json) => {
      return json;
    })
  }

  async handleSelect(e) {
    console.log(e.target.value);
    this.setState({firstArea: e.target.value, firstAreaInfo: await this.fetchAreaInfo(e.target.value.toLowerCase()) });
  }

  async handleSelect2(e) {
    console.log(e.target.value);
    this.setState({secondArea: e.target.value, secondAreaInfo: await this.fetchAreaInfo(e.target.value.toLowerCase())  });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.firstArea);
  }

  componentDidMount() {
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
    
    return (
      <div className="App">
        <h1>Compare Urban Areas</h1>
          <div class="panelWrapper">
            <LocationSelector
              formLabel="Urban Area 1"
              onChange={this.handleSelect}
              action="https://jsonplaceholder.typicode.com/posts"
              defaultValue="Click to see options">
                <Option value="Click to see options" />
                {                
                  areas._links["ua:item"].map((l, index) => (
                    <Option key={index} infolink={l.href} value={l.name} />
                  ))
                }
                
            </LocationSelector>
            
            <AreaInfo Name={this.state.firstArea} Info={this.state.firstAreaInfo}></AreaInfo>
          </div>
          <div className="panelWrapper">
              <LocationSelector
                formLabel="Urban Area 2"
                onChange={this.handleSelect2}
                action="https://jsonplaceholder.typicode.com/posts"
                defaultValue="Click to see options">
                  <Option value="Click to see options" />
                  {                
                    areas._links["ua:item"].map((l, index) => (
                      <Option key={index} value={l.name} />
                    ))
                  }
              </LocationSelector>
              <AreaInfo Name={this.state.secondArea} Info={this.state.secondAreaInfo}></AreaInfo>
          </div>
      </div>
    );
  }
  
}

export default App;
