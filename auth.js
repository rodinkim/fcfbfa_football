const bcrypt = require('bcrypt');
const { User } = require('./models');

// 회원가입 함수
async function createUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword
    });
    return user; // 생성된 사용자 반환
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
}

// 로그인 함수
async function authenticateUser(username, password) {
  try {
    const user = await User.findOne({ where: { username } });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        return user.id; // 로그인 성공
      }
    }
    return null; // 로그인 실패
  } catch (error) {
    throw new Error('Error authenticating user: ' + error.message);
  }
}

module.exports = { createUser, authenticateUser };
