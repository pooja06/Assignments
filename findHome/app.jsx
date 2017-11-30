import React from 'react';

class FindHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []      
    };
  }
  
  _getHouseInfo(){
    const main = this;    
    main.setState({
        infoStatus: 'loading'
    });
    
    fetch(`https://api.mcmakler.de/v1/advertisements`).then( function(response) {            
      return response;      
    })
    .then( function(response) {
      setTimeout( function() {
        main.setState({
          infoStatus: 'loaded'
        });
      }, 300);            
      return response.json();
    }).then(function(resp) {
      let data = resp.data.splice(0,10);      
      main.setState({
        list: data
      });
      
    }).catch(function() {            
      main.setState({
        infoStatus: 'error'
      });      
    })
  }
  componentWillMount() {
    this._getHouseInfo();
  }
  
  render() {
    const { 
      list,
      infoStatus
    } = this.state;        
    let data = [];    
    if (infoStatus == 'loaded') {
      for(var j=0; j<list.length; j++) {        
          data.push(<SingleAd key={j} listItem={list[j]} />);
      } 
    } else if (infoStatus == 'loading') {
      data = <div className="loading"><div className="loadingText">Loading..</div></div>
    } else if (infoStatus == 'error') {
      data = <div className="loading"><div className="loadingText">Error while loading data. Try again later.</div></div>
    }
    return (  
        <div className="container-fluid">        
          <div className="row">          
            {data}          
          </div>
        </div>
    );
  }
}
      
const SingleAd = ({
  listItem
}) => {
  return(
    
      <div className="col-md-4 center">
      <div className="row">        
        <img src={listItem.advertisementAssets["0"].advertisementThumbnails.inventory_m.url} 
            className="imageSize"/>
        <div className="type">{listItem.purpose ? "Kaufen" : "Mieten"}</div>
      </div>
      <div className="row details">
            <div className="title">{listItem.title}</div>
          <div className="address">
              <span>{listItem.realestateSummary.address.postalCode}</span>
              <span> {listItem.realestateSummary.address.city}</span> / 
              <span> {listItem.realestateSummary.address.street}</span>
            </div>
            <div className="area">
              <span className="price">{listItem.advertisementPrice.sellPrice} &#8364;</span>
                <span className="size">
                    <span>{listItem.realestateSummary.numberOfRooms} zimmer</span> | 
                  <span> ab {listItem.realestateSummary.space} m<sup>2</sup></span>
                </span>
            </div>
        </div>
    </div>


      
  )
}

export default FindHome;