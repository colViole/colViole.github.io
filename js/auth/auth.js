import { signUp, signIn, loginWithGoogle, logout } from "./auth.js";

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Select buttons
  const signUpBtn = document.getElementById("signup-btn");
  const signInBtn = document.getElementById("signin-btn");
  const googleBtn = document.getElementById("google-btn");
  const logoutBtn = document.getElementById("logout-btn");

  // Attach event listeners
  signUpBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signUp(email, password);
  });

  signInBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signIn(email, password);
  });

  googleBtn.addEventListener("click", loginWithGoogle);
  logoutBtn.addEventListener("click", logout);
});
