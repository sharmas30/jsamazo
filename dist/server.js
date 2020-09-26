"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter.js"));

var _orderRouter = _interopRequireDefault(require("./routers/orderRouter.js"));

var _productRouter = _interopRequireDefault(require("./routers/productRouter.js"));

var _uploadRouter = _interopRequireDefault(require("./routers/uploadRouter.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect(_config.default.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to mongodb');
}).catch(error => {
  console.log(error.reason);
});

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json()); // app.use('/api/uploads', uploadRouter)

app.use('/api/users', _userRouter.default);
app.use('/api/orders', _orderRouter.default);
app.use('/api/products', _productRouter.default);
app.use('/uploads', _express.default.static(_path.default.join(__dirname, '/../uploads')));
app.use(_express.default.static(_path.default.join(__dirname, '/../frontend')));
app.get('*', (req, res) => {
  res.sendFile(_path.default.join(__dirname, '/../frontend/index.html'));
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({
    message: err.message
  });
});
app.listen(_config.default.PORT, () => {
  console.log("serve at http://localhost:5000");
});