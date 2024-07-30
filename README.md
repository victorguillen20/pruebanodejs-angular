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
En el inicio el `Gestor` tiene lo siguiente:
1. Marcador de los turnos generados
2. Una lista de los Usuarios que a creado y necesitan la aprobación de un `Administrador`.

![image](https://github.com/user-attachments/assets/fbdc70af-3631-4732-b5e8-6d5b2b3aeda9)



