const loginform = document.querySelector("#login");
const sumaSaldo = document.querySelector('#btnRetirar');
const txtSaldo = document.querySelector('#textSaldo');
const alertLogin = document.querySelector('#alert-login');
const alertGeneral = document.querySelector('#alert-general');
var limite = 990;
var minimo = 10;



document.getElementById('card-atm').style.display = 'none';

loginform.addEventListener('submit', function (event) {
    event.preventDefault();
    const user = event.target.userLogin.value;
    const pass = event.target.passLogin.value;

    clientes.forEach(cliente => {
        if (cliente.nomUser == user && cliente.PassUser == pass) {
           /*  console.log('Accediste');
            console.log(cliente.nomUser);
            console.log(cliente.saldoUser); */

            var objetivoCliente = document.getElementById('textCliente');
            objetivoCliente.innerHTML = cliente.nomUser;

            var saldoTurno = document.getElementById('saldo');
            saldoTurno.textContent = cliente.saldoUser;
            
            document.getElementById('card-login').style.display = 'none';
            document.getElementById('card-atm').style.display = 'block';

            const saldoTotal = document.querySelector('#saldo');
            const btnIngreso = document.querySelector('#btn-suma');
            const btnResta = document.querySelector('#btn-resta');
            var saldoActual = cliente.saldoUser;
            saldoTotal.textContent = '$ ' + saldoActual;

            
              
            function depositarDinero() {
                var deposito = parseInt(document.getElementsByName("deposito")[0].value);

                if (document.getElementsByName("deposito")[0].value.length == "") {
                    alertGeneral.textContent = 'Llena el campo para ingresar saldo.';
                    document.querySelector('#alert-general').className = 'card-subtitle mb-3 fw-bold text-danger';
                  
                } else if((saldoActual + deposito) >= limite ) {
                    alertGeneral.textContent = 'No se puede sobrepasar el saldo de $ ' + limite + '.';
                    document.querySelector('#alert-general').className = 'card-subtitle mb-3 fw-bold text-danger';
                }
                else {

                    saldoActual = parseInt(saldoActual) + deposito;
                    saldoTotal.textContent = '$ '+ saldoActual;
                    alertGeneral.textContent = 'Has ingresado a tu saldo: ' + deposito;
                    document.querySelector('#alert-general').className = 'card-subtitle mb-3 fw-bold text-success';
                   
  
                }

            }

            btnIngreso.addEventListener('click', depositarDinero);
            
            btnIngreso.addEventListener('click', function () {
                document.getElementById("dato-ingreso").value = "";
            });


            function retirarDinero() {

                var retiro = parseInt(document.getElementsByName("retirar")[0].value);
                if (document.getElementsByName("retirar")[0].value.length == "") {
                    alertGeneral.textContent = 'Llena el campo para retirar saldo.';
                    document.querySelector('#alert-general').className = 'card-subtitle mb-3 fw-bold text-danger';
                }
                else if ((saldoActual - retiro) <= minimo) {
                    alertGeneral.textContent = 'Debes tener un minimo de $ ' + minimo + ' en tu cuenta.';
                    document.querySelector('#alert-general').className = 'card-subtitle mb-3 fw-bold text-danger';
                }
                else if (retiro >= parseInt(saldoActual)) {
                    alertGeneral.textContent = 'Su fondo disposible no es suficiente.';
                    document.querySelector('#alert-general').className = 'card-subtitle mb-3 fw-bold text-danger';
                }
                else {
                    saldoActual = parseInt(saldoActual) - retiro;
                    saldoTotal.textContent = '$ ' + saldoActual;
                    alertGeneral.textContent = 'Has retirado de tu saldo: ' + retiro;
                    document.querySelector('#alert-general').className = 'card-subtitle mb-3 fw-bold text-success';

                }
            }
            btnResta.addEventListener('click', retirarDinero);

            btnResta.addEventListener('click', function () {
                document.getElementById("dato-resta").value = "";
            });


        } else if (user === '' || pass === '') {
            alertLogin.textContent = 'Llena todos los campos.';
        }
        else {
            alertLogin.textContent = 'Datos incorrectos, vuelve a intentarlo.';
        }

    });

});
