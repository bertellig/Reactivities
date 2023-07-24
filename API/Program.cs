using Application.Activities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
////////// PART 1
// Add services to the container.
/*
Think of services as things that we use inside our application logic.
We can add services to give us more functionality to our logic that we create.
So think of services as just things we can use inside our code, and we'll be looking at dependency
injection to inject these services into other classes inside our application.
*/

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt => 
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(opt => {
    opt.AddPolicy("CorsPolicy", policy => {
        policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
    });
});

builder.Services.AddMediatR(typeof(List.Handler));

var app = builder.Build();


////////// PART 2
// Configure the HTTP request pipeline.
/*
This is often referred to as middleware.
And think of middleware for the time being as things that can do something with the HTTP request on
its way in or on its way out.
And the word pipeline is often used for this to say that an HTTP request will go through a kind of pipeline.
And at each stage of its journey through that pipeline on its way in and on its way out, then we can
do things with that request.
And any middleware that we add is going to go inside this section.
*/
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using var scope = app.Services.CreateScope(); //when the HTTP request is finished, then it's going to dispose of  data context.
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

app.Run();

// make sure you installed EF 
// install package Microsoft.EntityFrameworkCore.Design
// dotnet tool install --global dotnet-ef --version 7.0.0
// dotnet ef migrations add InitialCreate -s API -p Persistence

//dotnet watch --no-hot-reload
