import React from 'react';
import { ContentProps } from '../type'
import Part from './Part'


const Content = (props: ContentProps) => {
    return (<div>
      {props.content.map(c =>
        <Part key={c.name} part={c}/>)}
    </div>);
};

export default Content;