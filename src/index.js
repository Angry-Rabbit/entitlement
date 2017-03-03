import dva from 'dva';
import './index.css';
import {message} from 'antd';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva({
  onError(e, dispatch) {
    //dispatch({type: 'app/logout'});
    const uncheckedErrCode = [404, 200];
    if (uncheckedErrCode.indexOf(e.response.status) == -1) {
      e.response.json().then(data => {
        message.error(data.message, 5)
      })
    } else {
      message.error(e.message, 5)
    }

  }
});

app.model(require("./models/app"));

app.model(require("./models/user"));

app.model(require("./models/apps"));

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
