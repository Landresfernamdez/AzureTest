using System;
using Microsoft.Azure; // Namespace for CloudConfigurationManager
using Microsoft.WindowsAzure.Storage; // Namespace for CloudStorageAccount
using Microsoft.WindowsAzure.Storage.Queue; // Namespace for Queue storage types
using System.Threading;

namespace DesktopApp
{
    class Program
    {
        static void Main(string[] args)
        {
            // Retrieve storage account from connection string.
            CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
                CloudConfigurationManager.GetSetting("StorageConnectionString"));

            // Create the queue client.
            CloudQueueClient queueClient = storageAccount.CreateCloudQueueClient();

            // Retrieve a reference to a queue.
            CloudQueue queue = queueClient.GetQueueReference("myqueue");

            // Create the queue if it doesn't already exist.
            //queue.CreateIfNotExists();

            //CloudQueueMessage message1 = new CloudQueueMessage("Test");
            //queue.AddMessage(message1);
            ConeccionBD.Model m;
            while (true)
            {
                var message = queue.GetMessage();
                if(message != null)
                {
                    m = new ConeccionBD.Model();
                    m.ID = message.Id;
                    m.Message = "Mensaje de Prueba!!";
                    if(ConeccionBD.ConeccionBD.InsertDB(m))
                    {
                        queue.DeleteMessage(message);
                        Console.WriteLine("Registro guardado de manera exitosa!");
                        Console.WriteLine("ID:" + message.Id + "   push to azure storage queue!");
                    }
                }            
                Thread.Sleep(800);   
            }
        }
    }
}
