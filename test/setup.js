import "whatwg-fetch";
import { configure } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
import { rawItems } from "./mockData";

configure({ adapter: new Adapter() });
global.fetch = jest.fn().mockImplementation(() => Promise.resolve(rawItems));
