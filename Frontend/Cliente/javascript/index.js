document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const userType = document.getElementById('user-type').value;
  const email = document.getElementById('username').value;
  const senha = document.getElementById('password').value;

  if (email === '' || senha === '') {
    alert('Por favor, preencha todos os campos.');
  } else {
    const loginData = {
      email: email,
      senha: senha
    };

    fetch('http://localhost:8080/salaosenac/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 401) {
        throw new Error('Credenciais inválidas.');
      } else {
        throw new Error('Ocorreu um erro ao realizar o login.');
      }
    })
    .then(data => {
      console.log('Success:', data);
      alert('Login realizado com sucesso!');
      window.location.href = "html/servicos.html"; 
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(error.message);
    });
  }
});