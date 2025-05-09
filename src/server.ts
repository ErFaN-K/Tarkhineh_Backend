import { config } from 'dotenv';

import app from './app';

// Config Env Variables
config();

// Start Server
app.listen(process.env.PORT || 3000, (): void =>
  console.log(`Server Running On Port ${process.env.PORT || 3000}`)
);
