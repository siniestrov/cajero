const loginform = document.querySelector("#login");
const sumaSaldo = document.querySelector('#btnRetirar');
const txtSaldo = document.querySelector('#textSaldo');
const alertLogin = document.querySelector('#alert-login');
const alertGeneral = document.querySelector('#alert-general');
var limite = 990;
var minimo = 10;
document.getElementById('card-atm').style.display = 'hidden';
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
            

            const saldoTotal = document.querySelector('#saldo');
            const btnIngreso = document.querySelector('#btn-suma');
            const btnResta = document.querySelector('#btn-resta');
            var saldoActual = cliente.saldoUser;
            saldoTotal.textContent = '$ ' + saldoActual;

            document.getElementById('card-atm').style.display = 'visible';
              
            function depositarDinero() {
                var deposito = parseInt(document.getElementsByName("deposito")[0].value);

                if (document.getElementsByName("deposito")[0].value.length == "") {
                    alertGeneral.textContent = 'Llena el campo para ingresar saldo.';

                } else if((saldoActual + deposito) >= limite ) {
                    alertGeneral.textContent = 'No se puede sobrepasar el saldo de $ ' + limite + '.';
                }
                else {

                    saldoActual = parseInt(saldoActual) + deposito;
                    saldoTotal.textContent = '$ '+ saldoActual;
                    alertGeneral.textContent = 'Has ingresado a tu saldo: ' + deposito;
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
                }
                else if ((saldoActual - retiro) <= minimo) {
                    alertGeneral.textContent = 'Debes tener un minimo de $ ' + minimo + ' en tu cuenta.';
                }
                else if (retiro >= parseInt(saldoActual)) {
                    alertGeneral.textContent = 'Su fondo disposible no es suficiente.';
                }
                else {
                    saldoActual = parseInt(saldoActual) - retiro;
                    saldoTotal.textContent = '$ ' + saldoActual;
                    alertGeneral.textContent = 'Has retirado de tu saldo: ' + retiro;

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
