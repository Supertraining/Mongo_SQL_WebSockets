const socket = io();

function addProduct() {
	const producto = {
		nombre: document.getElementById('nombre').value,
		precio: document.getElementById('precio').value,
		imagen: document.getElementById('imagen').value,
	};
	const checkFilledValues = Object.values(producto).every(value => value.length > 0);
	
	if (!checkFilledValues) alert('Todos los campos son obligatorios')
		socket.emit('new-product', producto);

}
function deleteProduct() {

	const id = document.getElementById('idDelete').value;

	socket.emit('deleteProduct', id);

}

function UpdateProduct() {

	const id = document.getElementById('idUpdate').value
	const nombre = document.getElementById('nombre').value
	const precio = document.getElementById('precio').value
	const imagen = document.getElementById('imagen').value


	const updatedProduct = {
		id: document.getElementById('idUpdate').value,
		...(nombre.length > 0 && { nombre }),
		...(precio.length > 0 && { precio }),
		...(imagen.length > 0 && { imagen }),
	};
	socket.emit('updatedProduct', updatedProduct);
}

function getProductById() {
	const id = document.getElementById('idGetById').value;
	socket.emit('selectedProduct', id);
	return false;
}

socket.on('productos', (data) => {

	if (data.length === 0) {
		document.getElementById('tabla').innerHTML = `
						<h3 class="m-2 text-white">no se encontraron datos</h3>
					`;
	} else if(Array.isArray(data)) {
		const html = data?.map((el) => {
				return `    <tr>
                            <td>${el.nombre}</td>
                            <td>${el.precio}</td>
                            <td><img style="height: 80px; width: 80px;" src=${el.imagen}></td>
                            <td>${el.id}</td>
                            </tr><br>
                        `;
			})
			.join(' ');

		document.getElementById('tabla').innerHTML = html;
	}
});


socket.on('selectedProd', (data) => {
	if (data.length === 0) {
		document.getElementById('tabla-2').innerHTML = `
						<h3 class="m-2 text-white">no se encontraron datos</h3>
					`;
	} else {
		const html = data
			.map((el) => {
				return `    <tr>
                            <td>${el.nombre}</td>
                            <td>${el.precio}</td>
                            <td><img src=${el.foto}></td>
                            <td>${el.id}</td>
                            </tr><br>
                        `;
			})
			.join(' ');

		document.getElementById('tabla-2').innerHTML = html;
	}
});

socket.on('fakersProductos', (data) => {
	if (data.length === 0) {
		document.getElementById('tabla-fake').innerHTML = `
						<h3 class="m-2 text-white">no se encontraron datos</h3>
					`;
	} else {
		const html = data
			.map((el) => {
				return `    <tr>
                            <td>${el.nombre}</td>
                            <td>${el.precio}</td>
                            <td><img src=${el.foto}></td>
                            </tr><br>
                        `;
			})
			.join(' ');

		document.getElementById('tabla-fake').innerHTML = html;
	}
});

function addMessage() {
	const message = {
		author: {
			id: document.getElementById('email').value,
			alias: document.getElementById('alias').value,
		},
		text: document.getElementById('text').value,
	};
	socket.emit('new-message', message);
	return false
}

socket.on('normalizedMessages', async (data) => {

	const authorSchema = await new normalizr.schema.Entity('author', {}, { idAttribute: 'id' });
	const messageSchema = await new normalizr.schema.Entity('message', {
		author: authorSchema,
	});
	const postSchema = await new normalizr.schema.Entity('post', {
		mensajes: [ messageSchema ],
	});
	const mensajesDenormalizados = await normalizr.denormalize(data.result, postSchema, data.entities);

	const compresion = (
		100 -
		(JSON.stringify(data).length * 100) / JSON.stringify(mensajesDenormalizados).length
	).toFixed(1);
	if (compresion > 0) {
		document.getElementById(
			'compresion'
		).innerHTML = `<h2 class="text-center">Compresión : ${compresion}%</h2>`;
	}
	const html = mensajesDenormalizados.mensajes.map((msj) => {
		return `<div class="m-1 shadow border border-light rounded p-2">
                    <strong style="color:blue;">${msj.author.id}</strong><i style="font-weight:bold"> alias</i><strong style="color:red;"> ${msj.author.alias}</>
                    <p style="color:brown;" class="m-0">${new Date().toLocaleString()}</p>
                    <i style="color:green;">${msj.text}</i>
                </div>`;
	})
		.join(' ');

	document.getElementById('messages').innerHTML = await html;
});
