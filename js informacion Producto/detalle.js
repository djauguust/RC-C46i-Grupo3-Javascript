/*  CODIGO QUE OBTIENE LA INFORMACION DE LOS PRODUCTOS MEDIANTE URL Y
 LAS MUESTRA EN DETALLE.HTML 
 */

 const params = new URLSearchParams(window.location.search);

 const productName = params.get('name');
 const productPrice = params.get('price')
 const producturl = params.get('url')
 const productDescription = params.get('description')
 const productCategory = params.get('categoria')
 const productID = params.get('id')
 
 
 const imagenHTML = document.getElementById('imagen')
 const tituloHTML = document.getElementById('titulo')
 const precioHTML = document.getElementById('precio')
 const descripcionHTML = document.getElementById('descripcion')
 const categoriaHTML = document.getElementById('categoria')
 const idHTML = document.getElementById('codigo')
 
 
 
 
 imagenHTML.src = producturl;
 tituloHTML.textContent = productName;
 precioHTML.innerHTML = `$${productPrice}<p class="fs-6">IVA incluido</p>`;
 descripcionHTML.innerHTML = productDescription;
 categoriaHTML.innerHTML = `Categoria: ${productCategory}`
 idHTML.innerHTML = `Codigo: ${productID}`
 
 