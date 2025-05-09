import { config } from 'dotenv';
// Config Env Variables
config();

import app from './app';

// Start Server
app.listen(process.env.PORT || 3000, (): void =>
  console.log(`Server Running On Port ${process.env.PORT || 3000}`)
);
