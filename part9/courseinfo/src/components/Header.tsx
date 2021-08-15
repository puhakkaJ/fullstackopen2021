import React from 'react';
import { HeaderProps } from '../type'

const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
};

export default Header;