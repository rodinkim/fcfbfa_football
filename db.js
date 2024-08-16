const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

// PostgreSQL 연결 설정 (RDS 정보로 수정)
const pool = new Pool({
  user: 'postgres',
  host: 'my-express-app-db.cvyiy8448ho1.ap-northeast-2.rds.amazonaws.com',
  database: 'foodnamoo',
  password: 'vnemskan0720',
  port: 5432,
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, 'ap-northeast-2-bundle.pem')), // RDS SSL 인증서 파일
    rejectUnauthorized: true // 인증서 검증
  }
});

module.exports = pool;
