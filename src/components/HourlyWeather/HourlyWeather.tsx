import { FC } from "react"

interface weather {
    main?: string;
    id?: number;
  }

interface Hourlyweather {
    temp?: Object;
    dt: number;
    wind_speed?: number;
    humidity?: number; 
    weather?: Array<weather>;
}

interface Props {
    hourlyWeather: Array<Hourlyweather>;
  }

const HourlyWeather: FC<Props> = (props) => {
    return (
        <div style={{paddingLeft:'50px',paddingRight:'50px',paddingBottom:'50px',display:'flex',flexDirection:'column'}}>
        <h1 style={{marginLeft:'10px',marginBottom:'30px'}}>Hourly Forecast</h1>
      <ul className='scroll' style={{display:'flex',overflow:'overlay',overflowY: 'hidden', justifyContent:'space-between',listStyle:'none',paddingLeft:'0px',whiteSpace:'nowrap',margin:0,height:'220px'}}>
        {props.hourlyWeather.map((data) =>{
            return  <li key={data.dt} style={{padding:'10px'}}>
           <div style={{height:'180px',width:'105px',display:'flex',flexDirection:'column',justifyContent:'space-between',borderRadius:'10px',background:'rgba(255, 255, 255, 0.28)',padding:'15px',textAlign:'center'}}>
                     <p style={{margin:'0px'}}>{new Date(data.dt*1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                     <div style={{fontSize:'18px',display:'flex',flexDirection:'column'}}><span>{data.temp}°C</span><span>{data.weather?.map(({main})=>( main) )}</span></div>
                <div  style={{fontSize:'14px',display:'flex',flexDirection:'column'}}><span>{data.wind_speed} km/h</span><span>{data.humidity}%</span></div>
                 </div>
          </li>;
})}
      </ul>
    </div>
    )
}

export default HourlyWeather