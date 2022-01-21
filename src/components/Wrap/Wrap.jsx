import { createContext, useRef, useState } from 'react';
import Popup from '../Popup/Popup';
import github from './github.svg';

const Wrap = (props) => {

    return (
          <div className="wrap">
              {props.children}
              <Popup />
              <a href="https://github.com/zolir18" class="link_github">
                  <img src={github} alt="" />
              </a>
          </div>
    );
};
export default Wrap;
