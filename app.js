

// Secciones 
    const divContenido = document.getElementById('contenido');
    const divPrincipal = document.getElementById('principal');
    const divInicioSesion = document.getElementById('inicioSesion');
    const divHomeOpciones = document.getElementById('home');

    // Acciones HOME
    const consultaHome = document.getElementById('consulta');
    const retiroHome = document.getElementById('retiroMonto');
    const ingresoHome = document.getElementById('ingresarMonto');
    const nombreHome = document.getElementById('nombreHome');


    //Consulta
    const consultaSaldoTotal = document.getElementById('consultaSaldoTotal');

    // Retiro

    const txtRetiro = document.getElementById('txtRetiro');
    const amountRetiro = document.getElementById('amountRetiro');
    const mensajeRetiro = document.getElementById('mensajeRetiro');

    // Ingreso

    const txtIngreso = document.getElementById('txtIngreso');
    const amountSet = document.getElementById('amountSet');
    const mensajeSuma = document.getElementById('mensajeSuma');

    // sesion

    const errorSesion = document.getElementById('errorSesion');
    const btnSesion = document.getElementById('cerrarSesion');
    const inputPassword = document.getElementById('password');
    const btnIniciar = document.getElementById('sesion');


    // Errores
    const errorCantidades = document.getElementById('errorCantidades');


    // Obj con usuario iniciado sesion
    const cuentaLoggeada = {
        nombre: '',
        saldo: '',

    }

    // Cuentas disponibles para iniciar sesion
    let cuentas = [
        {nombre: "Marco Medina", saldo: 500, password: 12345},
        {nombre: "Roberto Martinez", saldo: 900, password: 54321},
        {nombre: "Victor García", saldo: 300, password: 11133},
    ]

    // se valida si esta loggeado o no para redirigir a login o home
    const validarAcceso = () => {
        if (localStorage.getItem('usuario')){
            const usuarioInfo = JSON.parse(localStorage.getItem('usuario'));
            cuentaLoggeada.nombre = usuarioInfo.nombre;
            cuentaLoggeada.saldo = Number(usuarioInfo.saldo);
           return cargarPantalla('home')
        }
        
        cargarPantalla('principal');
    }

    // FUNCIONES LOGIN 
    const inicioSesion = (cuenta) => {
        const {password, saldo, nombre} = cuentas[cuenta];


        cargarPantalla('inicioSesion');
        btnIniciar.addEventListener('click', () => {
            if(inputPassword.value == password){
                cuentaLoggeada.nombre = nombre;
                cuentaLoggeada.saldo = Number(saldo);
                cargarPantalla('home');
                btnSesion.removeAttribute('hidden');
                
                localStorage.setItem('usuario', JSON.stringify(cuentaLoggeada));
                } else {
                    errorSesion.removeAttribute('hidden');

                    setTimeout(() => {
                        errorSesion.hidden = true;
                    }, 3000);
                }
            }) 
     }

     const cerrarSesion = () => {

        localStorage.removeItem('usuario');
        window.location.reload();

    }

    // Se carga pantalla con las cuentas disponibles
    const cargarPantalla = (tipoPantalla) => {
        switch(tipoPantalla){

            case 'principal':
                divPrincipal.removeAttribute('hidden');
                const divUsuarios = document.createElement('div');
                for(let i = 0; i < cuentas.length; i++){
                    divUsuarios.innerHTML += `<h3 class = 'm-5 text-center' onclick='inicioSesion(${i})'>${cuentas[i].nombre}</h3>`
                    
                }
                divPrincipal.appendChild(divUsuarios);
                btnSesion.hidden = true;

            break;

            case 'inicioSesion':
                divPrincipal.hidden = true;
                divInicioSesion.removeAttribute('hidden');

            break;

            case 'home':
                divPrincipal.hidden = true;
                divInicioSesion.hidden = true;
                divHomeOpciones.removeAttribute('hidden');
                nombreHome.innerText = cuentaLoggeada.nombre;
                btnSesion.removeAttribute('hidden');
            break;

        }
    }

    const regresar = () => {
        const homeOpc = document.getElementsByClassName('home');
        for(const opc of homeOpc){
            opc.hidden = true;
        }

        divHomeOpciones.removeAttribute('hidden');
    }


    // Acciones usuario logeado

    const consultarSaldo = () => {
        ocultarOpciones();
        consultaHome.removeAttribute('hidden');
        consultaSaldoTotal.innerText = cuentaLoggeada.saldo;


    }

    const retirarSaldo = () => {
        ocultarOpciones();
        retiroHome.removeAttribute('hidden');
        amountRetiro.textContent = cuentaLoggeada.saldo;
        console.log(cuentaLoggeada.saldo);
        console.log(amountRetiro);
        
    }

    const ingresarMonto = () => {
        ocultarOpciones();
        amountSet.textContent = cuentaLoggeada.saldo;
        ingresoHome.removeAttribute('hidden');
    }

    const ocultarOpciones = () => {
        divHomeOpciones.hidden = true;
    }

  
    

    const retirar = () => {

        if (txtRetiro.value.trim().length === 0) return;

        const txtCantidadRetirar = Number(txtRetiro.value);
        if (cuentaLoggeada.saldo - txtCantidadRetirar > 990 || cuentaLoggeada.saldo - txtCantidadRetirar < 10){
            errorCantidades.removeAttribute('hidden');
            txtRetiro.value = "";
            setTimeout(() => {
                errorCantidades.hidden = true;
            }, 3000)
        } else {
            cuentaLoggeada.saldo -= txtCantidadRetirar;
            localStorage.setItem('usuario', JSON.stringify(cuentaLoggeada));
            txtRetiro.value = "";
            mensajeRetiro.innerText = `Su nuevo saldo es: ${cuentaLoggeada.saldo}`;
            mensajeRetiro.removeAttribute('hidden');
            amountRetiro.innerText = cuentaLoggeada.saldo;


            setTimeout(() => {
                mensajeRetiro.innerText = '';
                mensajeRetiro.hidden = true;
            },3000)
        }
    }


    const ingresar = () => {
        if (txtIngreso.value.trim().length === 0) return;

        const txtCantidadSumar = Number(txtIngreso.value);
        if (cuentaLoggeada.saldo + txtCantidadSumar > 990 || cuentaLoggeada.saldo + txtCantidadSumar < 10){
            errorCantidades.removeAttribute('hidden');
            txtIngreso.value = "";
            setTimeout(() => {
                errorCantidades.hidden = true;
            }, 3000)
        } else {
            cuentaLoggeada.saldo += txtCantidadSumar;
            localStorage.setItem('usuario', JSON.stringify(cuentaLoggeada));
            txtIngreso.value = "";
            mensajeSuma.innerText = `Su nuevo saldo es: ${cuentaLoggeada.saldo}`;
            mensajeSuma.removeAttribute('hidden');
            amountSet.innerText = cuentaLoggeada.saldo;

            setTimeout(() => {
                mensajeSuma.innerText = '';
                mensajeSuma.hidden = true;
            },3000)
        }

    }

  

    validarAcceso();

