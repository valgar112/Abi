firebase.initializeApp({
  apiKey: 'AIzaSyBjSxIsY4wKr833tfZrvbtY9U8RmGj26cw',
  authDomain: 'usuario-f1ca5.firebaseapp.com',
  projectId: 'usuario-f1ca5'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();


function guardarUsuario(){

	var nombre = document.getElementById('nombre').value;
	var apellido = document.getElementById('apellido').value;
	var fecha = document.getElementById('fecha').value;

	db.collection("users").add({
	    first: nombre,
	    last: apellido,
	    born: fecha
	})
	.then(function(docRef) {
	    console.log("Document written with ID: ", docRef.id);
	    limpiarUsuario();			

	})
	.catch(function(error) {
	    console.error("Error adding document: ", error);
	});	
}

function limpiarUsuario(){
	document.getElementById('nombre').value = '';
	document.getElementById('apellido').value = '';
	document.getElementById('fecha').value = '';
}

// Leer datos
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
	tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        tabla.innerHTML += `
        	<tr>
              <th scope="row">${doc.id}</th>
              <td>${doc.data().first}</td>
              <td>${doc.data().last}</td>
              <td>${doc.data().born}</td>
              <td><button type="button" class="btn btn-danger" onclick="eliminarUsuario('${doc.id}')">Eliminar</button></td>
              <td><button type="button" class="btn btn-warning" onclick="actualizarUsuario('${doc.id}', '${doc.data().first}', '${doc.data().last}', '${doc.data().born}')">Actualizar</button></td>
            </tr>
        `;
    });
});

function eliminarUsuario(id){
	db.collection("users").doc(id).delete().then(function() {
	    console.log("Document successfully deleted!");
	}).catch(function(error) {
	    console.error("Error removing document: ", error);
	});
}



// Actualizar

function actualizarUsuario(id, nombre, apellido, fecha){
	document.getElementById('nombre').value = nombre;
	document.getElementById('apellido').value = apellido;
	document.getElementById('fecha').value = fecha;

	var boton = document.getElementById('boton');
	boton.innerHTML = 'Editar';

	boton.onclick = function(){
	
		var washingtonRef = db.collection('users').doc(id);
		var nombre = document.getElementById('nombre').value;
		var apellido = document.getElementById('apellido').value;
		var fecha = document.getElementById('fecha').value;
		
		return washingtonRef.update({
		    first: nombre,
		    last: apellido,
		    born: fecha
		})
		.then(function() {
		    console.log("Document successfully updated!");
		    boton.innerHTML = 'Guardar';
		    limpiarUsuario();
		})
		.catch(function(error) {
		    // The document probably doesn't exist.
		    console.error("Error updating document: ", error);
		});	
	}

	
}




