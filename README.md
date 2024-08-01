# Nodejs y Angular 18
### Sequelize ORM / TailwindCSS / Angular Material
> [!NOTE]
> Es un vistazo general de la funcionalidad de la app.

La aplicacion tiene tres tipos de `roles de usuarios`:
* Administrador
* Gestor
* Cajero
### Login
Cuenta con 2 funcionalidades específicas, `Loguearse` y `Recuperar la contraseña`.
![Es la primera página que aparece al ingresar a la dirección de la App](https://github.com/user-attachments/assets/30d419b2-18dd-43bb-971c-98529af33238)

Cuando un usuario `Administrador` se loguea, le aparece la siguiente pantalla de inicio, el primer marcador muestra la cantidad de turnos que se han generado en el día y los datos del usuario que se a `logueado`, esto último se repite con todos los usuarios.
![Página de Bienvenida](https://github.com/user-attachments/assets/73014a35-4735-4b3b-983c-f4c94e577c25)

### Administrador
En el **Dashboard** se obserban 4 marcadores diferentes:
1. Total de Usuarios
2. Total de Usuarios activos
3. Total de Usuarios Inactivos
4. Total de Usuarios Bloqueados
> [!IMPORTANT]
> El `Administrador` puede cambiar los estados a cada uno de los usuarios.

Tambien se observa información acerca de los `Cajeros` que han sido asignados a una caja, el nombre de la caja, la fecha de asignación y el `Gestor` que hizo la asignación del `Cajero`. Existe un `input` que permite filtrar los datos que se desean buscar.
![image](https://github.com/user-attachments/assets/e5b7504a-8c2d-48ae-b7fa-717985aaa008)

**Administrador** 
En este apartado el `Administrador` puede cambiar el estado y actualizar el correo de los usuarios.

![image](https://github.com/user-attachments/assets/441a7229-b258-4f49-931b-abb4d256a7f6)

**Carga de Archivos** 
Aquí el usuario `Administrador` tiene la opción de crear Usuarios de forma masiva a través de un archivo formato Excel o CSV.
![image](https://github.com/user-attachments/assets/c5ddf70d-b70c-43f9-b2a0-c8b4f3c8ca22)

**Aprobar Usuarios**
Los Administradores, pueden aprobar a los Usuarios que los Gestores han registrado.

![image](https://github.com/user-attachments/assets/ff4feb35-d86f-46d8-9283-a4ff154e31bd)

### Gestor
**Home**
En el inicio el `Gestor` tiene lo siguiente:
1. Marcador de los turnos generados
2. Una lista de los Usuarios que a creado y necesitan la aprobación de un `Administrador`.

![image](https://github.com/user-attachments/assets/fbdc70af-3631-4732-b5e8-6d5b2b3aeda9)

**Asignación de Turnos**
El usuario `Gestor` genera los turnos y los asigna a una Caja, para que los clientes sean atendidos.

![image](https://github.com/user-attachments/assets/26c7a98d-3460-48dd-a852-af6276fdd272)

**Turnos Generados**
El usuario puede comprobar y por medio de un filtro, buscar los turnos que a generado.
![image](https://github.com/user-attachments/assets/e4a6aea1-a87e-4e00-9363-820fa7362aac)

**Crear Usuarios**
En este apartado el usuario `Gestor` tiene la facilidad de crear otros usuarios `Gestores` y `Cajeros`. Posteriormente esto se verá refeljado en la lista de los usuarios que necesitan aprobacion del administrador.
![image](https://github.com/user-attachments/assets/9426cd04-4f7f-4d3b-a5f4-c9ec8da0448d)

### Cajero 
**Mantenimiento**
En este apartado el `Cajero` puede visualizar los Clientes que a registrado.

![image](https://github.com/user-attachments/assets/89a30141-dd07-4cf4-8787-4ee9b9fbe841)

Al dar clic sobre la cedula de un cliente, permite al `Cajero` Actualizar los datos del cliente.

![image](https://github.com/user-attachments/assets/18937709-1b0f-460e-a738-e949cb554fa0)

**Carga de Archivos**
El `Cajero` tiene la funcionalidad de poder crear Clientes de forma masiva.

![image](https://github.com/user-attachments/assets/e82ba40a-6005-4b2f-9cfe-1cd17950ca71)

## Correcciones por parte del Encargado

El sistema estaba permitiendo el registro de usuarios repetidos, las validaciones ya estaban implementadas simplemente era un problema de lógica, a continuación el lugar en donde estaba el conflicto:

![image](https://github.com/user-attachments/assets/bb1a9b0e-ad75-4c13-9267-8509f9ae70d2)

La función que permite verificar si el usuario existe en la base de datos:

![image](https://github.com/user-attachments/assets/3bf1899f-8b63-4c81-9ae7-3c3e9f8dd90c)

Se agregaron las validaciones para poder impedir el acceso a los usuarios que aún no esten aprobados por el Administrador.

![image](https://github.com/user-attachments/assets/0a15f6c1-e948-41a7-87f5-5ce3d7e7c971)

Esta es la función que se implementó en el backend en el archivo de validaciones auth.utils.js

![image](https://github.com/user-attachments/assets/5c5d0c3d-8d0e-41a9-b1d3-3dbc22d1ecb4)

y de esta manera se utilizó la lógica para implementar la función en el método de autenticación:

![image](https://github.com/user-attachments/assets/93636861-cc5d-4aae-81b5-3b4209aa6144)

También se agregaron las funciones pertinentes para impedir el acceso de los usuarios con estado `Bloqueado`.

![image](https://github.com/user-attachments/assets/42f121ea-a6b6-4aad-94df-601f0c63ba08)

Se implementó esta función en el archivo de validaciones auth.utils.js

![image](https://github.com/user-attachments/assets/07bc54c3-d767-4671-a330-17c648811c62)

Se agregó también el apartado para recuperar una contraseña por los siguientes parámetros:
* Username
* Email

![image](https://github.com/user-attachments/assets/e9ef90f9-2624-4af3-9dbe-0687d4fbfbf4)

En el backend en el archivo de user.utils.js se implementaron las siguientes funciones:
**Chequea si el username y el email existe**

![image](https://github.com/user-attachments/assets/a08ea713-291b-4af1-8a8a-6dd7a1743a10)

**Realiza el update del password**

![image](https://github.com/user-attachments/assets/2c337bd0-3f34-4805-87b2-3f659ee771f4)

y la implementasmosen user.controller.js:

![image](https://github.com/user-attachments/assets/c77c065e-de00-4283-aaf7-44d886212045)

Cuando el `username` y el `password` son correctos y estan registrados en la base de datos:

![image](https://github.com/user-attachments/assets/8b148404-8fbe-47bd-ac0a-0c5276c6d24d)

Al darle a Recuperar nos abre un `dialog` para poder ingresar el nuevo password:
![image](https://github.com/user-attachments/assets/37cdea37-ea34-4033-a179-a08452f192f8)

recordemos que si ingresamos un password que no este dentro de los parametros, nos impedirá actualizar el password:
![image](https://github.com/user-attachments/assets/ddaad69e-83ec-46e2-8faf-8b88c725c485)

![image](https://github.com/user-attachments/assets/44bde4f0-e6a0-447c-b499-fae3ab002f54)

Y si cumple con los parámetros pues nos permite realizar el update:

![image](https://github.com/user-attachments/assets/59589256-7b9d-4bca-a464-9e32c22b1927)



![image](https://github.com/user-attachments/assets/c57cf708-2649-4699-84d8-d5d344305ac5)










