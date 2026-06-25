function checkAdmin() {
  const pass = document.getElementById("pass");

  if (!pass) {
    alert("Şifre input bulunamadı");
    return;
  }

  if (pass.value === "1234") {
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Hatalı şifre");
  }
}
