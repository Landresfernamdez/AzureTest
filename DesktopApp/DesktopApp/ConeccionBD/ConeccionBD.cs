using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesktopApp.ConeccionBD
{
    static class ConeccionBD
    {
        //permite conectar a la base de datos
        private static string cadenaConexion = "Server=tcp:soserver2018.database.windows.net,1433;Initial Catalog=SistemasOperativosDB2018;Persist Security Info=False;User ID=ServerAdmin;Password=Server123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30";
        private static SqlConnection connection = new SqlConnection(cadenaConexion);//permite establecer la conexion con la Base de Datos
        private static string sqlQuery;//almacena la consulta SQL, se utiliza en la mayoria de los metodos
        private static SqlCommand command;//permite realizar la consulta mediante la cadena conexion y la consulta

        public static bool InsertDB(Model objeto)
        {
            try
            {
                connection.Open();
                sqlQuery = "insert into MessagesAzure values(@ID,@Message)";
                command = new SqlCommand(sqlQuery, connection);
                command.Parameters.AddWithValue("@ID", objeto.ID);
                command.Parameters.AddWithValue("@Message", objeto.Message);

                int resp = command.ExecuteNonQuery();

                connection.Close();

                return true; //se hizo la inserccion
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                throw new InvalidOperationException(e.Message);
            }
        }
    }
}
