const fs = require("fs").promises;

class ExistenceCheckService {
  async folder(path) {
    try {
      await fs.access(path);
      return { error: false };
    } catch (error) {
      return { error: true };
    }
  }
}

module.exports = new ExistenceCheckService();
