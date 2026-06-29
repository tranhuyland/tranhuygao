const ADMIN_USER = {
  username: "admin",
  password: "123456"
};

export function validateAdminLogin(username: string, password: string) {
  return (
    username === ADMIN_USER.username &&
    password === ADMIN_USER.password
  );
}
