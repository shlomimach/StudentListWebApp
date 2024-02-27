using Microsoft.EntityFrameworkCore;
using ServerSideEduAdminSystem.Models;
using System.Net.Http.Json;

namespace ServerSideEduAdminSystem.Data
{
    public class EASContext : DbContext
    {
        public EASContext(DbContextOptions<EASContext> options)
       : base(options)
        {

        }


        public DbSet<Student> Students { get; set; }
    }
}
