import {Popup} from '../Popup/Popup';
import github from './github.svg';
import {TabsButton} from "../TabsButton/TabsButton";

export const Wrap = () => {

    return (
          <div className="wrap">
              <TabsButton />
              <Popup />
              <a href="https://github.com/zolir18" className="link_github">
                  <img src={github} alt="" />
              </a>
          </div>
    );
};
