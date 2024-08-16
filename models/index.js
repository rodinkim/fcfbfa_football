const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Sequelize 인스턴스 생성
const sequelize = new Sequelize({
  host: 'my-express-app-db.cvyiy8448ho1.ap-northeast-2.rds.amazonaws.com',
  database: 'foodnamoo',
  username: 'postgres',
  password: 'vnemskan0720',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(path.join(__dirname, '../ap-northeast-2-bundle.pem')) // SSL 인증서 파일 경로
    }
  }
});

// 모델 정의
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

// 데이터베이스 동기화
sequelize.sync().then(() => {
  console.log('Database & tables created!');
});

module.exports = { sequelize, User };
