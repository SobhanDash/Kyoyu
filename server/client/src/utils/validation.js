export default function validation(values) {
  let errors = {};

  // Email
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid Email";
  }

  // Password
  if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(values.password)) {
    errors.password = "Invalid Password";
  }

  // Confirm Password
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password must match";
  }

  return errors;
}
