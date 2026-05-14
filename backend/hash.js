const bcrypt = require('bcryptjs');

const generateHash = async () => {
  const hash = await bcrypt.hash('superadmin', 10);
  console.log(hash);
};

generateHash();