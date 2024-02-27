using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using ServerSideEduAdminSystem.Data;

var builder = WebApplication.CreateBuilder(args);


Console.WriteLine("Here 1");


// Get configuration from appsettings.json
var configuration = builder.Configuration;
Console.WriteLine("Here 2");


// ConfigureServices equivalent
builder.Services.AddControllers();
Console.WriteLine("Here 3");

builder.Services.AddEndpointsApiExplorer();
Console.WriteLine("Here 4");

builder.Services.AddSwaggerGen();
Console.WriteLine("Here 5");

// Add DbContext
builder.Services.AddDbContext<EASContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("MyDbConnection")));
Console.WriteLine("Here 6");

builder.Services.AddMemoryCache();
Console.WriteLine("Here **MemoryCache");

var app = builder.Build();
Console.WriteLine("Here 7");



// Configure equivalent
if (app.Environment.IsDevelopment())
{
    Console.WriteLine("Here 8");

    app.UseDeveloperExceptionPage();
    Console.WriteLine("Here 9");

    app.UseSwagger();
    app.UseSwaggerUI();
    Console.WriteLine("Here 10");

}

app.UseCors(builder =>
{
    Console.WriteLine("Here 11");

    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
    Console.WriteLine("Here 12");

});

//app.UseHttpsRedirection();
//Console.WriteLine("Here 13");



app.UseRouting();
Console.WriteLine("Here 14");

app.UseAuthorization();
Console.WriteLine("Here 15");

app.MapControllers();
Console.WriteLine("Here 16");


app.Run();
Console.WriteLine("Here 17");

