export default function Management () {
  const usersData = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan@perez.com',
      role: 'Fotógrafo',
    },
    {
      id: 2,
      name: 'Jorge Peralta',
      email: 'jorge@peralta.com',
      role: 'Editor',
    },
  ];

  return (
    <>
      <h3 className="users__content-title">Lista de usuarios</h3>
      <div className="table__container">
        <table className="table">
          <thead>
            <tr>
              <th className="table__cell">Nombre</th>
              <th className="table__cell">Correo electrónico</th>
              <th className="table__cell">Rol</th>
              <th className="table__cell">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((user) => (
              <tr key={user.id}>
                <td className="table__cell">{user.name}</td>
                <td className="table__cell">{user.email}</td>
                <td className="table__cell">{user.role}</td>
                <td className="table__cell">
                  <button className="table__button table__button_edit">Editar</button>
                  <button className="table__button table__button_search">Consultar</button>
                  <button className="table__button table__button_cancel">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}