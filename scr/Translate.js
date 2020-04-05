export const memory = {
  'duplicate username or email': 'Username หรือ Email นี้มีอยู่แล้ว',
  'signup success': 'สร้างบัญชีสำเร็จ',
};

const translate = (word) => {
  return memory[word] || word;
};

export default translate;
