const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const acountsRoutes = require('./routes/acountRoutes');
const DeleveryDetalisRoutes = require('./routes/DeleveryDetalisRouts');
const Money = require('./routes/MoneyRoutes');

app.use('/acounts', acountsRoutes);

app.use('/DeleveryDetalis', DeleveryDetalisRoutes);
app.use('/Money', Money);

app.get('/test',(req,res,next) =>{
res.status(200).json({
  seccess:true,
  data:{message:'hello api'}
})
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

