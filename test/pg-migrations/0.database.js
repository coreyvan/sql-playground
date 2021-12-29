module.exports = {
  up: ({ context: queryInterface }) => {
    return queryInterface.sequelize.query(`
    begin;        
    
    CREATE TABLE IF NOT EXISTS test
    (
      id                  SERIAL NOT NULL,
      email               VARCHAR(255) NOT NULL,
    );
    `);
  },
};
