const passInput = document.getElementById('pass');
const nameInput = document.getElementById('name');
const buttonInput = document.getElementById("loginButton");

buttonInput.addEventListener('click', () => {
  let name = nameInput.value;
  let password = passInput.value;

  nameInput.value = "";
  passInput.value = "";

  localStorage.setItem("musicShare_name",name);
  localStorage.setItem("musicShare_password",password);

  window.location.href = "Index.html";
});