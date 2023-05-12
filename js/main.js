$(document).ready(function () {

    $("#btnenviar").click(function (e) {
        if (validar() != "") {
            swal("Error de envio", validar(), "error");
        } else {
            swal("Datos enviados", "En brevedad nos contactaremos con usted", "success");
        }
        e.preventDefault();
    });

});

function validar() {

    var html = "";
    var nombre = $("#txtnombre").val();
    var correo = $("#txtemail").val();
    var ciudad = $("#cbxCiudad").val();
    var Comentario = $("#txtaComentario").val();

    if (($("#rbtnRUT")).is(":not(:checked)") && ($("#rbtnPasaporte")).is(":not(:checked)")) {
        html += "- Debe Seleccionar a lo menos un tipo de identificación \n";
    } else {
        if ($("#txtidentificador").val() == "") {
            html += "- Debe Ingresar numero de identificación \n";
        } else {
            if ($("#rbtnRUT").is(":checked")) {
                if (validarRut($("#txtidentificador").val()) == false) {
                    html += "- Debe Ingresar un RUT Valido \n";
                }
            }
        }
    }
    if (nombre == "") {
        html += "- Debe Ingresar un Nombre \n";
    }
    if (correo == "") {
        html += "- Debe Ingresar un Correo \n";
    }

    if (ciudad == "0") {
        html += "- Debe Seleccionar una Ciudad \n";
    }

    if (Comentario.trim().length < 50) {
        html += "- Debe ingresar un comentario a lo menos de 50 caracteres \n";
    }

    return html;
}

function validarRut(rutCompleto) {
    rutCompleto = rutCompleto.replace("‐", "-");

    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;
   
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    
    return (dv(rut) == digv);
}

function dv(T) {
    var M = 0,
        S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}