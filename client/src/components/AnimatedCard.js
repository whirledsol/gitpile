import React,{useState} from 'react';
import {Card  } from '@material-ui/core';

const AnimatedCard = (props)=>{
	const [hover,setHover] = useState(false);
	return (<Card onMouseOver={_=>{setHover(!hover)}}  onMouseOut={_=>{setHover(!hover)}} {...props} rasied={hover}/>)
};

export default AnimatedCard;